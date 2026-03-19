import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events — Maui Premium Art",
  description:
    "Upcoming events, wrap reveals, and live drops from Maui Premium Art. Sign up to be the first to know.",
  openGraph: {
    title: "Events — Maui Premium Art",
    description:
      "Upcoming events, wrap reveals, and live drops. Be the first to know.",
    url: "https://mauipremiumart.com/events",
  },
};

export default function EventsPage() {
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
          Events
        </div>

        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "60px 20px 80px",
          textAlign: "center",
        }}
      >
        {/* Coming Soon hero */}
        <div style={{ marginBottom: 48 }}>
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
            Coming Soon
          </div>

          {/* Calendar icon */}
          <div style={{ marginBottom: 20 }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
              style={{ opacity: 0.3 }}
            >
              <rect x="6" y="10" width="36" height="32" rx="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              <line x1="6" y1="20" x2="42" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <line x1="16" y1="6" x2="16" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="32" y1="6" x2="32" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="24" cy="30" r="3" fill="rgba(74,158,255,0.4)" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 300,
              margin: "0 0 10px",
              letterSpacing: "0.02em",
              lineHeight: 1.3,
            }}
          >
            Events are on the way.
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 8px",
              lineHeight: 1.7,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Wrap reveals, live drops, and behind-the-scenes from the studio in Kihei.
          </p>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.3)",
              margin: 0,
              lineHeight: 1.6,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Sign up below and we&apos;ll let you know first.
          </p>
        </div>

        {/* Email signup */}
        <div
          style={{
            background: "rgba(14,14,22,0.8)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "28px 24px",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: 16,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Get notified
          </div>

          <form
            action="https://x.com/Maui_PremiumArt"
            method="get"
            target="_blank"
            style={{
              display: "flex",
              gap: 8,
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              aria-label="Email address"
              style={{
                flex: 1,
                padding: "10px 14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#ffffff",
                fontSize: 13,
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                background: "rgba(74,158,255,0.15)",
                border: "1px solid rgba(74,158,255,0.3)",
                borderRadius: 8,
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              Notify Me
            </button>
          </form>

          <p
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.2)",
              marginTop: 12,
              marginBottom: 0,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            No spam. Unsubscribe anytime. We respect your inbox.
          </p>
        </div>

        {/* What to expect */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 40,
            textAlign: "left",
          }}
        >
          {[
            { emoji: "🎨", title: "Wrap Reveals", desc: "First look at new limited edition designs" },
            { emoji: "🔴", title: "Live Drops", desc: "Real-time edition releases — 10 per design" },
            { emoji: "🏝️", title: "Studio Sessions", desc: "Behind the scenes from Kihei, Maui" },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "rgba(14,14,22,0.6)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "16px 14px",
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 8 }}>{item.emoji}</div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: 4,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.5,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div style={{ marginBottom: 20 }}>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              margin: "0 0 14px",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Follow us for real-time updates
          </p>
          <a
            href="https://x.com/Maui_PremiumArt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @Maui_PremiumArt
          </a>
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
