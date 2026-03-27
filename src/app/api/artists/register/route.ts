import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// Simple in-memory rate limiter (per IP, resets on deploy)
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60_000;

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

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot — if "website" field is filled, it's a bot
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const { name, email, xHandle, instagramHandle, portfolioUrl, bio, consentPublicDisplay } = body;

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

    const { data, error } = await getSupabaseAdmin()
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

    // Discord notification to #content (fire-and-forget)
    const discordWebhook = process.env.DISCORD_CONTENT_WEBHOOK_URL;
    if (discordWebhook) {
      fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🎨 **New Artist Submission**\n**Name:** ${name.trim()}\n**Email:** ${email.trim()}\n**Portfolio:** ${portfolioUrl || "Not provided"}\n**X:** ${xHandle || "Not provided"}\n**Instagram:** ${instagramHandle || "Not provided"}\n**Bio:** ${bio?.slice(0, 200) || "Not provided"}\n\nReview at /admin/artists (coming Phase 4)`,
        }),
      }).catch((err) => console.error("[Discord notify]", err));
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
