export default function MediaPlayer() {
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
      <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: 10 }}>
        Choose Media Source
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#ffffff", letterSpacing: "0.01em", lineHeight: 1.3 }}>Slack Key Sessions</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2, lineHeight: 1.3 }}>Keola Beamer · Hawaiian Slack Key</div>
      </div>
      <div style={{ height: 2.5, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 4, position: "relative" as const, cursor: "pointer" }}>
        <div style={{ width: "38%", height: "100%", background: "rgba(255,255,255,0.55)", borderRadius: 2 }} />
        <div style={{ position: "absolute" as const, left: "38%", top: "50%", transform: "translate(-50%, -50%)", width: 8, height: 8, borderRadius: "50%", background: "#ffffff", boxShadow: "0 0 4px rgba(0,0,0,0.4)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.28)", marginBottom: 10, fontVariantNumeric: "tabular-nums" as const }}>
        <span>1:42</span>
        <span>4:28</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button style={btnStyle} aria-label="Shuffle">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M1 10h2l3-3M1 4h2l8 6h4M11 4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 2l2 2-2 2M13 8l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button style={btnStyle} aria-label="Previous">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <rect x="1" y="2" width="2" height="10" rx="0.8" fill="currentColor" />
            <path d="M14 2L5 7L14 12V2Z" fill="currentColor" />
          </svg>
        </button>
        <button style={{ ...btnStyle, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: 38, height: 38 }} aria-label="Play">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M2 1L13 8L2 15V1Z" fill="white" />
          </svg>
        </button>
        <button style={btnStyle} aria-label="Next">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <rect x="13" y="2" width="2" height="10" rx="0.8" fill="currentColor" />
            <path d="M2 2L11 7L2 12V2Z" fill="currentColor" />
          </svg>
        </button>
        <button style={btnStyle} aria-label="Repeat">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M3 3h10a2 2 0 0 1 2 2v0M13 11H3a2 2 0 0 1-2-2v0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M11 1l2 2-2 2M5 9l-2 2 2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "rgba(255,255,255,0.5)",
  cursor: "pointer",
  padding: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
