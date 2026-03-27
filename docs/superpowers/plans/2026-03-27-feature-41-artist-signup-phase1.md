# Feature #41 Phase 1: Artist Registration API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Artists can submit the existing form and data persists to Supabase. Spam protection, Discord notifications, no auth yet.

**Architecture:** Supabase free tier for Postgres database. Server-side API route validates input + inserts row. Existing ArtistSubmissionForm wired to hit API. Discord webhook for #content notifications.

**Tech Stack:** Next.js API routes, Supabase JS client, TypeScript

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/supabase.ts` | Create | Supabase client singleton (server + client) |
| `src/app/api/artists/register/route.ts` | Create | POST handler: validate, spam check, insert, notify Discord |
| `src/components/artists/ArtistSubmissionForm.tsx` | Modify | Wire to API, add honeypot + consent checkbox + error states |
| `.env.example` | Modify | Add Supabase env var placeholders |

---

### Task 1: Install Supabase + Create Client

**Files:**
- Create: `src/lib/supabase.ts`
- Modify: `.env.example`

- [ ] **Step 1: Install Supabase JS**

```bash
pnpm add @supabase/supabase-js
```

- [ ] **Step 2: Add env var placeholders**

In `.env.example`, add:

```
# Supabase (Feature #41)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

- [ ] **Step 3: Create Supabase server client**

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side client with service role (bypasses RLS for API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
```

- [ ] **Step 4: Verify build**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build. Client is created but not yet called.

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase.ts .env.example package.json pnpm-lock.yaml
git commit -m "feat(#41): add Supabase client + env var placeholders"
```

---

### Task 2: Create Artist Registration API Route

**Files:**
- Create: `src/app/api/artists/register/route.ts`

- [ ] **Step 1: Create the API route**

Create `src/app/api/artists/register/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Simple in-memory rate limiter (per IP, resets on deploy)
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3; // max submissions
const RATE_WINDOW = 60_000; // per minute

// Common disposable email domains
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "throwaway.email", "guerrillamail.com",
  "yopmail.com", "10minutemail.com", "trashmail.com", "fakeinbox.com",
]);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissions.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW);
  submissions.set(ip, recent);
  return recent.length >= RATE_LIMIT;
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.has(domain);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    // Rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot check — if "website" field is filled, it's a bot
    if (body.website) {
      // Silently accept (don't reveal honeypot to bots)
      return NextResponse.json({ success: true });
    }

    const { name, email, xHandle, instagramHandle, portfolioUrl, bio, consentPublicDisplay } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name is required (min 2 characters)." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if (isDisposableEmail(email)) {
      return NextResponse.json({ error: "Please use a permanent email address." }, { status: 400 });
    }
    if (bio && typeof bio === "string" && bio.trim().length > 0 && bio.trim().length < 20) {
      return NextResponse.json({ error: "Artist statement must be at least 20 characters." }, { status: 400 });
    }
    if (!consentPublicDisplay) {
      return NextResponse.json({ error: "You must consent to public profile display." }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from("artists")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        x_handle: xHandle?.trim() || null,
        instagram_handle: instagramHandle?.trim() || null,
        portfolio_url: portfolioUrl?.trim() || null,
        bio: bio?.trim() || null,
        consent_public_display: true,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      // Duplicate email
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already registered. We'll be in touch!" },
          { status: 409 }
        );
      }
      console.error("[Artist Register] Supabase error:", error);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }

    // Record rate limit hit
    const now = Date.now();
    const timestamps = submissions.get(ip) ?? [];
    timestamps.push(now);
    submissions.set(ip, timestamps);

    // Discord notification to #content
    const discordWebhook = process.env.DISCORD_CONTENT_WEBHOOK_URL;
    if (discordWebhook) {
      fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🎨 **New Artist Submission**\n**Name:** ${name.trim()}\n**Email:** ${email.trim()}\n**Portfolio:** ${portfolioUrl || "Not provided"}\n**X:** ${xHandle || "Not provided"}\n**Bio:** ${bio?.slice(0, 200) || "Not provided"}\n\nReview at /admin/artists (coming Phase 4)`,
        }),
      }).catch((err) => console.error("[Discord notify]", err));
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
```

- [ ] **Step 2: Add Discord webhook env var**

In `.env.example`, add:

```
DISCORD_CONTENT_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

- [ ] **Step 3: Verify build**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/artists/register/route.ts .env.example
git commit -m "feat(#41): add artist registration API with validation + spam protection"
```

---

### Task 3: Wire ArtistSubmissionForm to API

**Files:**
- Modify: `src/components/artists/ArtistSubmissionForm.tsx`

- [ ] **Step 1: Update FormData interface**

Add new fields to the interface (line 9-16):

```typescript
interface FormData {
  name: string;
  email: string;
  xHandle: string;
  instagramHandle: string;
  portfolioUrl: string;
  statement: string;
  consentPublicDisplay: boolean;
  website: string; // honeypot — hidden from real users
}
```

- [ ] **Step 2: Update initial state**

Update the useState (lines 43-50):

```typescript
const [form, setForm] = useState<FormData>({
  name: "",
  email: "",
  xHandle: "",
  instagramHandle: "",
  portfolioUrl: "",
  statement: "",
  consentPublicDisplay: false,
  website: "", // honeypot
});
```

- [ ] **Step 3: Add error state**

After the status useState (line 51), add:

```typescript
const [error, setError] = useState<string | null>(null);
```

- [ ] **Step 4: Replace handleSubmit with API call**

Replace the handleSubmit callback (lines 57-69):

```typescript
const handleSubmit = useCallback(
  async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/artists/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          xHandle: form.xHandle,
          instagramHandle: form.instagramHandle,
          portfolioUrl: form.portfolioUrl,
          bio: form.statement,
          consentPublicDisplay: form.consentPublicDisplay,
          website: form.website, // honeypot
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("idle");
    }
  },
  [form]
);
```

- [ ] **Step 5: Add honeypot field (hidden from users)**

After the submit button (before the closing `</form>` tag), add:

```tsx
{/* Honeypot — hidden from real users, bots fill it */}
<input
  type="text"
  name="website"
  value={form.website}
  onChange={(e) => update("website", e.target.value)}
  style={{ position: "absolute", left: "-9999px", tabIndex: -1 } as React.CSSProperties}
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
/>
```

- [ ] **Step 6: Add Instagram handle field**

After the X Handle input (around line 170), add an Instagram field in the same grid row. Update the grid to 3 columns for social links, or add a new row. Simplest approach — add it below the X/Portfolio row:

```tsx
{/* Instagram Handle */}
<div className="artist-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
  <div>
    <label style={labelStyle}>Instagram</label>
    <input
      type="text"
      value={form.instagramHandle}
      onChange={(e) => update("instagramHandle", e.target.value)}
      placeholder="@yourhandle"
      style={inputStyle}
    />
  </div>
  <div />
</div>
```

- [ ] **Step 7: Add consent checkbox**

Before the submit button, add:

```tsx
{/* Consent checkbox */}
<label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
  <input
    type="checkbox"
    checked={form.consentPublicDisplay}
    onChange={(e) => setForm((f) => ({ ...f, consentPublicDisplay: e.target.checked }))}
    required
    style={{ marginTop: 2, accentColor: "#4a9eff" }}
  />
  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
    I consent to my name, bio, and portfolio being displayed publicly on mauipremiumart.com if approved. I confirm I own the rights to all submitted artwork.
  </span>
</label>
```

- [ ] **Step 8: Add error display**

After the consent checkbox, before the submit button, add:

```tsx
{/* Error message */}
{error && (
  <div style={{
    padding: "10px 14px",
    background: "rgba(255,59,48,0.08)",
    border: "1px solid rgba(255,59,48,0.2)",
    borderRadius: 8,
    fontSize: 12,
    color: "rgba(255,59,48,0.8)",
    fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
  }}>
    {error}
  </div>
)}
```

- [ ] **Step 9: Update the file upload note**

Replace the "File uploads coming soon via Tally integration" text (lines 199-220) with:

```tsx
<div
  style={{
    padding: "12px 14px",
    background: "rgba(255,255,255,0.02)",
    border: "1px dashed rgba(255,255,255,0.1)",
    borderRadius: 8,
    textAlign: "center",
  }}
>
  <p
    style={{
      fontSize: 12,
      color: "rgba(255,255,255,0.3)",
      margin: 0,
      fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
    }}
  >
    Include your portfolio URL above — we&apos;ll review your work there.
    Art uploads coming in a future update.
  </p>
</div>
```

- [ ] **Step 10: Verify build**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build.

- [ ] **Step 11: Commit**

```bash
git add src/components/artists/ArtistSubmissionForm.tsx
git commit -m "feat(#41): wire artist form to API with honeypot, consent, error handling"
```

---

### Task 4: Supabase Setup Instructions + Integration Test

- [ ] **Step 1: Create Supabase setup doc**

Create `docs/SUPABASE_SETUP.md` with the SQL to run in Supabase dashboard:

```markdown
# Supabase Setup — Feature #41

## 1. Create Project
Go to https://supabase.com and create a new project.

## 2. Get Credentials
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- Service Role Key (Settings → API) → `SUPABASE_SERVICE_ROLE_KEY`
- Add both to `.env.local`

## 3. Run SQL (SQL Editor in Supabase Dashboard)

```sql
CREATE TABLE artists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  x_handle TEXT,
  instagram_handle TEXT,
  portfolio_url TEXT,
  bio TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  consent_public_display BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for email lookups
CREATE INDEX idx_artists_email ON artists(email);

-- Index for status filtering (admin queue)
CREATE INDEX idx_artists_status ON artists(status);

-- Row Level Security
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

-- Only service role can insert/read (API routes use service key)
-- Public users cannot query directly
CREATE POLICY "Service role full access" ON artists
  FOR ALL USING (auth.role() = 'service_role');
```

## 4. Discord Webhook (optional)
Create a webhook in #content channel → add URL to `DISCORD_CONTENT_WEBHOOK_URL` in `.env.local`
```

- [ ] **Step 2: Verify build**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build.

- [ ] **Step 3: Commit**

```bash
git add docs/SUPABASE_SETUP.md
git commit -m "docs(#41): add Supabase setup instructions for artist registration"
```

- [ ] **Step 4: Manual integration test**

With Supabase project created and env vars set:

1. Run `pnpm dev`
2. Navigate to /artists page
3. Fill form with test data, check consent, submit
4. Verify response is success
5. Check Supabase dashboard — row appears in artists table with status=pending
6. Submit same email again — verify "already registered" error
7. Submit 4 times rapidly — verify rate limit error on 4th
8. Check Discord #content — notification received
9. Submit with honeypot field filled (via curl) — verify silent accept, no DB row

```bash
# Test honeypot rejection
curl -X POST http://localhost:3000/api/artists/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Bot","email":"bot@test.com","website":"http://spam.com","consentPublicDisplay":true}'
# Should return {"success":true} but NOT insert into DB
```
