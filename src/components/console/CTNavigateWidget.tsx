"use client";

export default function CTNavigateWidget() {
  return (
    <nav
      aria-label="Quick navigation"
      style={{
        background: "rgba(12, 26, 46, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 12,
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 8,
        gap: 8,
        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
      }}
    >
      {/* Search bar */}
      <div
        role="search"
        aria-label="Navigation search"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 8,
          padding: "6px 10px",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
          <circle cx="6" cy="6" r="4" />
          <line x1="9.5" y1="9.5" x2="13" y2="13" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.35)" }}>Navigate</span>
      </div>

      {/* Home / Work buttons */}
      <div role="group" aria-label="Quick destinations" style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <NavBtn side="left" label="Home">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 6.5L8 2l6 4.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.5z" />
            <rect x="5.5" y="9" width="5" height="5" rx="0.5" />
          </svg>
        </NavBtn>

        {/* Vertical divider */}
        <div style={{ width: 1, alignSelf: "stretch", background: "rgba(255, 255, 255, 0.1)" }} />

        <NavBtn side="right" label="Work">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="2" y="4" width="12" height="10" rx="1" />
            <path d="M5 4V2.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V4" />
            <line x1="2" y1="8.5" x2="14" y2="8.5" strokeWidth="0.8" />
          </svg>
        </NavBtn>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 400px) {
          [aria-label="Quick navigation"] {
            padding: 10px !important;
            gap: 10px !important;
          }
          [aria-label="Quick navigation"] [aria-label="Quick destinations"] button {
            font-size: 12px !important;
            padding: 8px 0 !important;
          }
        }
      `}</style>
    </nav>
  );
}

function NavBtn({ children, label, side }: { children: React.ReactNode; label: string; side: "left" | "right" }) {
  return (
    <button
      aria-label={`Navigate ${label.toLowerCase()}`}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "7px 0",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: side === "left" ? "8px 0 0 8px" : "0 8px 8px 0",
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        transition: "color 150ms ease, background 150ms ease, transform 100ms ease-out",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.color = "rgba(255,255,255,0.9)";
        el.style.background = "rgba(255,255,255,0.10)";
        el.style.borderColor = "rgba(255,255,255,0.15)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.color = "rgba(255,255,255,0.6)";
        el.style.background = "rgba(255,255,255,0.05)";
        el.style.borderColor = "rgba(255,255,255,0.08)";
      }}
      onPointerDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
      onPointerUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      onPointerLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      {children}
      {label}
    </button>
  );
}
