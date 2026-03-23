import type { Metadata } from "next";
import Link from "next/link";
import CommissionForm from "@/components/CommissionForm";

export const metadata: Metadata = {
  title: "Commission a Wrap — Maui Premium Art",
  description:
    "Request a custom one-of-one Cybertruck wrap. Original fine art by Hulali Lā, designed for your CT. Starting at $2,995.",
  openGraph: {
    title: "Commission a Wrap — Maui Premium Art",
    description: "Custom one-of-one CT wraps. Starting at $2,995.",
    url: "https://mauipremiumart.com/commission",
  },
};

export default function CommissionPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#0a1628",
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
          Commission
        </div>

        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "48px 20px 80px",
        }}
      >
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
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
            One of One
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 300,
              margin: "0 0 10px",
              letterSpacing: "0.02em",
            }}
          >
            Commission a custom wrap.
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.45)",
              margin: 0,
              lineHeight: 1.7,
              maxWidth: 440,
              marginLeft: "auto",
              marginRight: "auto",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            A one-of-one original artwork designed for your Cybertruck.
            You tell us your vision — we paint it, print it, ship it.
            Nobody else gets this design. Ever.
          </p>
        </div>

        {/* Pricing callout */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 32,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Partial Wrap", range: "$2,995+" },
            { label: "Full Wrap", range: "$4,995+" },
          ].map((tier) => (
            <div
              key={tier.label}
              style={{
                padding: "12px 20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 300, color: "#ffffff", marginBottom: 2, fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif" }}>
                {tier.range}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
                {tier.label}
              </div>
            </div>
          ))}
        </div>

        {/* Commission Form */}
        <CommissionForm />

        {/* Footer */}
        <div
          style={{
            marginTop: 40,
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
