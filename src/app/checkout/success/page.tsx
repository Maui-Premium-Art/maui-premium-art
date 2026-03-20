import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reserved — Maui Premium Art",
  description: "Your edition has been reserved. Mahalo!",
};

export default function CheckoutSuccess() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#0a0a0f",
        color: "#ffffff",
        fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", padding: "0 20px", maxWidth: 480 }}>
        {/* Success icon */}
        <div style={{ marginBottom: 24 }}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="28"
              cy="28"
              r="26"
              stroke="rgba(74,158,255,0.4)"
              strokeWidth="1.5"
            />
            <path
              d="M18 28l6 6 14-14"
              stroke="#4a9eff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

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
          Edition Reserved
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 300,
            margin: "0 0 12px",
            letterSpacing: "0.01em",
            lineHeight: 1.3,
          }}
        >
          Mahalo!
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
          Your edition has been reserved. You&apos;ll receive a confirmation
          email with details and next steps.
        </p>

        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            margin: "0 0 32px",
            lineHeight: 1.6,
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          Limited to 10 per design. Thank you for supporting original art.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
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
            ← Back to Console
          </Link>
          <a
            href="https://x.com/Maui_PremiumArt"
            target="_blank"
            rel="noopener noreferrer"
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
            Follow @Maui_PremiumArt
          </a>
        </div>
      </div>
    </main>
  );
}
