export default function NavigationWidget() {
  return (
    <div
      style={{
        background: "#14141e",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: "10px 12px 10px",
        flex: 1,
        minWidth: 0,
        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Navigate</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.3" />
          <line x1="9" y1="9" x2="13" y2="13" stroke="rgba(255,255,255,0.35)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>
      {/* Step 4: Search → "Where to?" */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "6px 10px", marginBottom: 8, cursor: "pointer" }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="5.5" cy="5.5" r="4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
          <line x1="8.5" y1="8.5" x2="12" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.22)" }}>Where to?</span>
      </div>
      {/* Step 4: Home → Gallery, Work → Commission */}
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button style={pillStyle}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M1 5.5L6 1l5 4.5V12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5.5z" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <rect x="4" y="8.5" width="4" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="0.9" />
          </svg>
          Gallery
        </button>
        <button style={pillStyle}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <rect x="1" y="3.5" width="10" height="9.5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <path d="M4 3.5V2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <line x1="1" y1="7.5" x2="11" y2="7.5" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          Commission
        </button>
      </div>
      {/* Step 1: Location fix + Step 4: ETA → edition counter */}
      <div style={{ paddingTop: 6, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", letterSpacing: "0.01em" }}>Kihei, Maui · Hawaii</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>10 editions · Maui</div>
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
  padding: "5px 10px",
  color: "rgba(255,255,255,0.55)",
  fontSize: 12,
  cursor: "pointer",
  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
  transition: "all 0.15s ease",
};
