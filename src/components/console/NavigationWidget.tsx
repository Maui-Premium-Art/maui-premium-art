export default function NavigationWidget() {
  return (
    <div
      style={{
        background: "#14141e",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "10px 14px 12px",
        flex: 1,
        minWidth: 0,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "rgba(255,255,255,0.38)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        Navigate
      </div>

      {/* Search bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 8,
          padding: "6px 10px",
          marginBottom: 10,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="5.5" cy="5.5" r="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <line x1="8.5" y1="8.5" x2="12" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Search destination</span>
      </div>

      {/* Home + Work pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <button
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 8,
            padding: "6px 10px",
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Pin icon */}
          <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
            <path d="M5.5 0.5C3.3 0.5 1.5 2.3 1.5 4.5C1.5 7.5 5.5 13.5 5.5 13.5C5.5 13.5 9.5 7.5 9.5 4.5C9.5 2.3 7.7 0.5 5.5 0.5Z" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <circle cx="5.5" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1" />
          </svg>
          Home
        </button>
        <button
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 8,
            padding: "6px 10px",
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Building icon */}
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
            <rect x="1" y="4" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <path d="M4 4V2C4 1.45 4.45 1 5 1H7C7.55 1 8 1.45 8 2V4" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <line x1="4" y1="8" x2="4" y2="10" stroke="currentColor" strokeWidth="1" />
            <line x1="8" y1="8" x2="8" y2="10" stroke="currentColor" strokeWidth="1" />
          </svg>
          Work
        </button>
      </div>

      {/* Destination info */}
      <div
        style={{
          paddingTop: 8,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", letterSpacing: "0.01em" }}>
          Kihei, Maui · Hawaii
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginTop: 3 }}>
          ETA — ∞ mi · Aloha
        </div>
      </div>
    </div>
  );
}
