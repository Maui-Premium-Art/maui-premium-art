# Feature #41: Artist Sign-Up Portal

## Summary

Full artist onboarding system: artists sign up, upload art, get reviewed by Boss, and auto-populate the /artists page when approved. Replaces the planned Tally embed from Feature #21 with a native system.

## Current State

- **Exists:** ArtistSubmissionForm.tsx (form UI with name, email, X handle, portfolio URL, artist statement — logs to console, no backend)
- **Exists:** /artists page with FeaturedArtistCard and ArtistCard components
- **Missing:** Database, auth, API routes, file uploads, admin panel, email notifications
- **Missing:** All backend infrastructure — this is a ground-up build

## Scope Decomposition

This feature spans 4 independent subsystems. Each gets its own spec/plan cycle. Build order matters — later phases depend on earlier ones.

### Phase 1: Database + Artist Registration API (MVP)
**Goal:** Artists can submit the form and data persists. No auth, no uploads, no admin UI yet.

- Add Supabase free tier (auth + Postgres + storage in one)
- Database schema: `artists` table (name, email, social_links, bio, status, created_at)
- API route: `POST /api/artists/register` — validates input, inserts row with status=PENDING
- Wire existing ArtistSubmissionForm to hit the API (replace console.log)
- Spam protection: honeypot field, rate limiting (simple in-memory), block disposable emails
- Discord notification to #content on new submission
- Privacy: consent checkbox for public profile display

### Phase 2: Magic Link Auth + Artist Dashboard
**Goal:** Returning artists can log in and manage their profile.

- NextAuth with Supabase adapter + email provider (magic link)
- Artist dashboard at `/artist/dashboard` — edit profile, update bio/socials
- Auth middleware protecting `/artist/*` routes
- Session management

### Phase 3: Art Upload Flow
**Goal:** Authenticated artists can upload art with metadata.

- Supabase Storage bucket for art uploads
- Upload form: title, description, medium, pricing tier, image(s)
- Image validation: minimum resolution, max file size, allowed formats
- `art_submissions` table: artist_id, title, description, images, status=PENDING
- Uploaded art held in PENDING until Boss approves

### Phase 4: Admin Review Queue + Auto-Publish
**Goal:** Boss reviews and approves artists + art. Approved content goes live automatically.

- Private `/admin/artists` page (protected by admin role check)
- Review queue: new signups + new art uploads
- APPROVE / REJECT buttons with optional note
- On artist approval: profile auto-populates /artists grid
- On art approval: art appears in artist's public profile
- Discord notification to #content on approval (for Maui's X welcome post)

## Architecture Decisions

### Why Supabase (not JSON files)
Lono's description suggested "Supabase free tier or JSON files." Supabase is the right call because:
- Auth (magic links) built in — no separate email service setup
- Postgres for structured data — artists, submissions, statuses
- Storage for image uploads — no S3 configuration needed
- Row-level security for admin vs artist access
- Free tier covers MVP volume easily

### Why phased delivery
Each phase delivers working, testable software. Phase 1 alone gives Boss a working intake funnel. No need to wait for auth/uploads to start collecting artist interest.

### Schema (Phase 1)

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
```

## Constraints

- No new CSS framework (stay with Tailwind)
- Supabase free tier limits: 500MB database, 1GB storage, 50K monthly active users
- Magic link auth requires email service (Supabase includes built-in)
- Art ownership/rights checkbox required before any upload
- Nothing goes live without Boss approval — zero exceptions
- Admin page must not be accessible to non-admin users

## Test Checklist (Phase 1 only)

1. Form submits successfully, data appears in Supabase artists table
2. Honeypot field rejects bot submissions
3. Duplicate email returns friendly error
4. Rate limiting blocks rapid submissions (>3 per minute per IP)
5. Discord #content receives notification on new submission
6. Consent checkbox is required before submit
7. Form validation: email format, name required, bio min 20 chars
8. Build clean, no TypeScript errors
9. API route handles malformed JSON gracefully
10. Supabase connection uses env vars (not hardcoded)

## Not In Scope (any phase)

- Payment processing for artists (they're submitting art, not buying)
- Artist-to-artist messaging
- Public artist search/filter
- Social media auto-posting (Maui handles X posts manually)
- Mobile app
