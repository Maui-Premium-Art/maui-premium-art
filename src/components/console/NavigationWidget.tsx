export default function NavigationWidget() {
  return (
    <div
      style={{
        background: "#14141e",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: "12px 14px 14px",
        flex: 1,
        minWidth: 0,
        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
      }}
    >
      {/* Header — "Navigate" with search icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Navigate
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.3" />
          <line x1="9" y1="9" x2="13" y2="13" stroke="rgba(255,255,255,0.35)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Search bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 10,
          padding: "8px 10px",
          marginBottom: 10,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="5.5" cy="5.5" r="4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
          <line x1="8.5" y1="8.5" x2="12" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.22)" }}>Search destination</span>
      </div>

      {/* Home + Work pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button style={pillStyle}>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M1 5.5L6 1l5 4.5V12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5.5z" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <rect x="4" y="8.5" width="4" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="0.9" />
          </svg>
          Home
        </button>
        <button style={pillStyle}>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <rect x="1" y="3.5" width="10" height="9.5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <path d="M4 3.5V2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <line x1="1" y1="7.5" x2="11" y2="7.5" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          Work
        </button>
      </div>

      {/* Destination info */}
      <div
        style={{
          paddingTop: 10,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", letterSpacing: "0.01em" }}>
          Kihei, Maui · Hawaii
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
          ETA — ∞ mi · Aloha
        </div>
      </div>
    </div>
  );
}

const pillStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  gap: 6,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 10,
  padding: "7px 10px",
  color: "rgba(255,255,255,0.55)",
  fontSize: 13,
  cursor: "pointer",
  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
};
