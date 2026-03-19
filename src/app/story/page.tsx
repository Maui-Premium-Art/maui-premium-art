import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story — Maui Premium Art",
  description:
    "Hawaiian fine art meets the Cybertruck. Born in Kihei, Maui — original limited edition wraps by Hulali Lā.",
  openGraph: {
    title: "Our Story — Maui Premium Art",
    description:
      "Hawaiian fine art meets the Cybertruck. Born in Kihei, Maui.",
    url: "https://mauipremiumart.com/story",
  },
};

export default function StoryPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#0a0a0f",
        color: "#ffffff",
        fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "rgba(10,10,15,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "rgba(255,255,255,0.55)",
            fontSize: 13,
            letterSpacing: "0.02em",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Console
        </Link>

        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Our Story
        </div>

        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "56px 20px 80px",
        }}
      >
        {/* Opening */}
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#4a9eff",
              marginBottom: 16,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Kihei, Maui
          </div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 300,
              margin: "0 0 20px",
              letterSpacing: "0.01em",
              lineHeight: 1.3,
            }}
          >
            Where Hawaiian art meets the future of driving.
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              lineHeight: 1.8,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Maui Premium Art started with a question nobody was asking:
            what if the Cybertruck could carry original fine art?
          </p>
        </div>

        {/* The Artist */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 16px",
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            The Artist
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 16px",
              lineHeight: 1.8,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Juan Linnon Ellis is a painter from Maui. His work draws on the color, spirit,
            and depth of Hawaiian culture — not as decoration, but as language. Under the
            name <strong style={{ color: "rgba(255,255,255,0.85)" }}>Hulali Lā ☀️</strong>,
            he creates original artwork designed specifically for the Cybertruck.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              lineHeight: 1.8,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            The Mahalo Bird wasn&apos;t adapted for the CT — it was conceived for it.
            Every stroke considers the geometry of the vehicle, the way light hits stainless steel,
            the moment a driver catches it in the rearview.
          </p>
        </section>

        {/* The Vision */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 16px",
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            The Vision
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 16px",
              lineHeight: 1.8,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            The Cybertruck is the most futuristic vehicle on the road. It deserves art
            that matches — not generic graphics from a template, but original fine art
            with soul, story, and scarcity.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              lineHeight: 1.8,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            We limit every design to 10 wraps. When they&apos;re gone, they&apos;re gone.
            No reprints, no exceptions. That&apos;s not marketing — it&apos;s how we protect
            the value of owning original art.
          </p>
        </section>

        {/* The Place */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 16px",
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            The Place
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              lineHeight: 1.8,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Everything starts in Kihei, on the south shore of Maui. The light here is different —
            golden, warm, the kind of light that makes you see color differently. It&apos;s in the
            paintings, in the wraps, in the way we think about what art can be when it lives on
            a truck instead of a wall. Hawaiian culture isn&apos;t a theme we borrow — it&apos;s where
            we live, and it shapes everything we make.
          </p>
        </section>

        {/* Hawaiian Space Travelers */}
        <section style={{ marginBottom: 48 }}>
          <div
            style={{
              background: "rgba(74,158,255,0.04)",
              border: "1px solid rgba(74,158,255,0.12)",
              borderRadius: 14,
              padding: "28px 24px",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#4a9eff",
                marginBottom: 12,
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              }}
            >
              The Lore
            </div>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.6)",
                margin: "0 0 12px",
                lineHeight: 1.8,
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                fontStyle: "italic",
              }}
            >
              &ldquo;Hawaiian culture meets the future. Not cyberpunk, not Star Trek —
              Hawaiians at the forefront of interstellar travel. The vocabulary is Hawaiian.
              The music is Hawaiian. The spirit is Hawaiian. The medium is futuristic.&rdquo;
            </p>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                margin: 0,
                lineHeight: 1.6,
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              }}
            >
              The Cybertruck console is the perfect vessel for this world.
              Every design we create lives inside it.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              margin: "0 0 16px",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            See the art. Meet the artists.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/artists"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 500,
                color: "#ffffff",
                background: "rgba(74,158,255,0.15)",
                border: "1px solid rgba(74,158,255,0.3)",
                borderRadius: 8,
                padding: "10px 20px",
                textDecoration: "none",
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              }}
            >
              View Artists →
            </Link>
            <Link
              href="/pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "10px 20px",
                textDecoration: "none",
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              }}
            >
              See Pricing
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            fontSize: 11,
            color: "rgba(255,255,255,0.18)",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          Art by Hulali Lā · mauipremiumart.com
        </div>
      </div>
    </main>
  );
}
