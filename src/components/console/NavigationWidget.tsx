export default function NavigationWidget() {
  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 10,
        padding: "10px 14px",
        minWidth: 200,
        flex: 1,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 12,
          color: "#888899",
          letterSpacing: "0.12em",
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
          border: "1px solid #2a2a3e",
          borderRadius: 6,
          padding: "6px 10px",
          marginBottom: 10,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="5" cy="5" r="3.5" stroke="#888899" strokeWidth="1.1" />
          <line x1="7.5" y1="7.5" x2="10.5" y2="10.5" stroke="#888899" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 14, color: "#505068", flex: 1 }}>
          Search destination
        </span>
      </div>

      {/* Quick destinations */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid #2a2a3e",
            borderRadius: 6,
            padding: "6px 8px",
            color: "#888899",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 13,
          }}
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M5 0C2.8 0 1 1.8 1 4C1 7 5 12 5 12C5 12 9 7 9 4C9 1.8 7.2 0 5 0ZM5 5.5C4.2 5.5 3.5 4.8 3.5 4C3.5 3.2 4.2 2.5 5 2.5C5.8 2.5 6.5 3.2 6.5 4C6.5 4.8 5.8 5.5 5 5.5Z" fill="currentColor" />
          </svg>
          Home
        </button>

        <button
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid #2a2a3e",
            borderRadius: 6,
            padding: "6px 8px",
            color: "#888899",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 13,
          }}
        >
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <rect x="1" y="4" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <path d="M3 4V3C3 1.9 3.9 1 5 1H7C8.1 1 9 1.9 9 3V4" stroke="currentColor" strokeWidth="1.1" fill="none" />
          </svg>
          Work
        </button>
      </div>

      {/* Address display */}
      <div
        style={{
          marginTop: 10,
          padding: "6px 0 0",
          borderTop: "1px solid #2a2a3e",
        }}
      >
        <div style={{ fontSize: 12, color: "#505068", letterSpacing: "0.05em" }}>
          Kihei, Maui · Hawaii
        </div>
        <div style={{ fontSize: 13, color: "#888899", marginTop: 2 }}>
          ETA — ∞ mi · Aloha
        </div>
      </div>
    </div>
  );
}
