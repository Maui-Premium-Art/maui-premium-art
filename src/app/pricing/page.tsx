import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Maui Premium Art",
  description:
    "Limited edition Cybertruck vinyl wraps from $295. Custom commissions from $2,995. Maximum 10 per design — when they're gone, they're gone.",
  openGraph: {
    title: "Pricing — Maui Premium Art",
    description:
      "Limited edition CT wraps from $295. Custom commissions from $2,995. 10 per design max.",
    url: "https://mauipremiumart.com/pricing",
  },
};

const EDITIONS = [
  {
    name: "Panel Wrap",
    price: "$295",
    description: "Single panel — tailgate, hood, or side.",
    features: [
      "One panel of your choice",
      "Original fine art by Hulali Lā",
      "Professional-grade 3M vinyl",
      "Limited to 10 per design",
    ],
    available: 7,
  },
  {
    name: "Half Wrap",
    price: "$695",
    description: "Tailgate + side panels — the signature look.",
    features: [
      "Tailgate + both side panels",
      "Cohesive art flow across panels",
      "Professional-grade 3M vinyl",
      "Limited to 10 per design",
      "Installation guide included",
    ],
    available: 5,
    featured: true,
  },
  {
    name: "Full Wrap",
    price: "$1,295",
    description: "Every panel — the complete statement.",
    features: [
      "All exterior panels covered",
      "Full art composition across vehicle",
      "Professional-grade 3M vinyl",
      "Limited to 10 per design",
      "Installation guide included",
      "Priority support",
    ],
    available: 3,
  },
];

export default function PricingPage() {
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
          Pricing
        </div>

        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "48px 20px 80px",
        }}
      >
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
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
            Limited Editions
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 300,
              margin: "0 0 10px",
              letterSpacing: "0.02em",
            }}
          >
            10 per design. When they&apos;re gone, they&apos;re gone.
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.45)",
              margin: 0,
              lineHeight: 1.7,
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Every wrap is original fine art by Hulali Lā, printed on professional-grade 3M vinyl.
            No reprints after the edition sells out.
          </p>
        </div>

        {/* Edition tiers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 16,
            marginBottom: 56,
          }}
        >
          {EDITIONS.map((tier) => (
            <div
              key={tier.name}
              style={{
                background: tier.featured ? "rgba(74,158,255,0.04)" : "rgba(14,14,22,0.8)",
                border: `1px solid ${tier.featured ? "rgba(74,158,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 14,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {tier.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: -1,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#4a9eff",
                    color: "#0a0a0f",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "3px 12px",
                    borderRadius: "0 0 6px 6px",
                    fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                  }}
                >
                  Most Popular
                </div>
              )}

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 8,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {tier.name}
              </div>

              <div
                style={{
                  fontSize: 36,
                  fontWeight: 300,
                  color: "#ffffff",
                  marginBottom: 6,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {tier.price}
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  margin: "0 0 20px",
                  lineHeight: 1.5,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {tier.description}
              </p>

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 20px",
                  flex: 1,
                }}
              >
                {tier.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.55)",
                      padding: "5px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                    }}
                  >
                    <span style={{ color: "#4a9eff", fontSize: 14 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Availability */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: tier.available <= 3 ? "#ef4444" : tier.available <= 5 ? "#eab308" : "#22c55e",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                    }}
                  >
                    {tier.available} of 10 available
                  </span>
                </div>

                <a
                  href="/art/mahalo-bird"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: tier.featured ? "#4a9eff" : "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                  }}
                >
                  Reserve →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Commission section */}
        <div
          style={{
            background: "rgba(14,14,22,0.6)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "32px 28px",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: 10,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Custom Commissions
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 300,
              color: "#ffffff",
              marginBottom: 8,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            $2,995 – $4,995
          </div>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.45)",
              margin: "0 0 20px",
              lineHeight: 1.7,
              maxWidth: 440,
              marginLeft: "auto",
              marginRight: "auto",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            A one-of-one original artwork designed for your Cybertruck.
            You tell us your vision — we paint it, print it, ship it. Nobody else gets this design. Ever.
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
              color: "#ffffff",
              background: "rgba(74,158,255,0.15)",
              border: "1px solid rgba(74,158,255,0.3)",
              borderRadius: 8,
              padding: "10px 24px",
              textDecoration: "none",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Start a Commission →
          </a>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: "0 0 20px",
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Common Questions
          </h2>

          {[
            {
              q: "Why only 10 per design?",
              a: "Scarcity preserves value. When you own a Maui Premium Art wrap, you know there are only 9 others like it in the world. That's the point.",
            },
            {
              q: "What happens when an edition sells out?",
              a: "It's gone. No reprints, no exceptions. The design is retired permanently.",
            },
            {
              q: "Can I install it myself?",
              a: "Yes — we include a detailed installation guide. Most CT owners with basic tools can do it in 2–4 hours. Professional installation is also available in select markets.",
            },
            {
              q: "What vinyl do you use?",
              a: "Professional-grade 3M vinyl with UV-protective laminate. Rated for 5+ years of outdoor durability.",
            },
          ].map((item) => (
            <div
              key={item.q}
              style={{
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.75)",
                  marginBottom: 6,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {item.q}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {item.a}
              </div>
            </div>
          ))}
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
