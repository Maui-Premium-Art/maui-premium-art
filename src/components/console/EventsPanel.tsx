"use client";

import Panel from "@/components/ui/Panel";

interface EventsPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function EventsPanel({ open, onClose }: EventsPanelProps) {
  return (
    <Panel open={open} onClose={onClose} direction="up" height="65vh" title="Events · Coming Soon">
      {/* Calendar icon */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ opacity: 0.3 }}>
          <rect x="6" y="10" width="36" height="32" rx="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <line x1="6" y1="20" x2="42" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="16" y1="6" x2="16" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32" y1="6" x2="32" y2="14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="30" r="3" fill="rgba(74,158,255,0.4)" />
        </svg>
      </div>

      <h2
        style={{
          fontSize: 20,
          fontWeight: 300,
          textAlign: "center",
          margin: "0 0 8px",
          color: "#ffffff",
          fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        }}
      >
        Events are on the way.
      </h2>
      <p
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
          margin: "0 0 24px",
          lineHeight: 1.6,
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        Wrap reveals, live drops, and behind-the-scenes from the studio in Kihei.
      </p>

      {/* Event types */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {[
          { icon: "🎨", title: "Wrap Reveals", desc: "First look at new limited edition designs" },
          { icon: "🔴", title: "Live Drops", desc: "Real-time edition releases — 10 per design" },
          { icon: "🏝️", title: "Studio Sessions", desc: "Behind the scenes from Kihei, Maui" },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
                {item.title}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Email signup placeholder */}
      <div
        style={{
          padding: "16px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 10,
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          Get notified
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="email"
            placeholder="your@email.com"
            aria-label="Email address"
            style={{
              flex: 1,
              padding: "9px 12px",
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
            style={{
              padding: "9px 16px",
              background: "rgba(74,158,255,0.12)",
              border: "1px solid rgba(74,158,255,0.25)",
              borderRadius: 8,
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            Notify Me
          </button>
        </div>
      </div>

      {/* Follow link */}
      <a
        href="https://x.com/Maui_PremiumArt"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontSize: 12,
          color: "rgba(255,255,255,0.4)",
          textDecoration: "none",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Follow @Maui_PremiumArt
      </a>
    </Panel>
  );
}
