export default function MediaPlayer() {
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
        Choose Media Source
      </div>

      {/* Track info */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#ffffff",
            letterSpacing: "0.01em",
            lineHeight: 1.3,
          }}
        >
          Slack Key Sessions
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.45)",
            marginTop: 2,
            lineHeight: 1.3,
          }}
        >
          Keola Beamer · Hawaiian Slack Key
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 3,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 1.5,
          marginBottom: 10,
          position: "relative",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "38%",
            height: "100%",
            background: "rgba(255,255,255,0.6)",
            borderRadius: 1.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "38%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#ffffff",
          }}
        />
      </div>

      {/* Transport controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Skip back */}
        <button style={btnStyle} aria-label="Previous">
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
            <rect x="1" y="2" width="2.5" height="12" rx="1" fill="currentColor" />
            <path d="M16 2L6 8L16 14V2Z" fill="currentColor" />
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          style={{
            ...btnStyle,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "50%",
            width: 36,
            height: 36,
          }}
          aria-label="Play"
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M2 1L13 8L2 15V1Z" fill="white" />
          </svg>
        </button>

        {/* Skip forward */}
        <button style={btnStyle} aria-label="Next">
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
            <rect x="14.5" y="2" width="2.5" height="12" rx="1" fill="currentColor" />
            <path d="M2 2L12 8L2 14V2Z" fill="currentColor" />
          </svg>
        </button>

        {/* EQ */}
        <button style={btnStyle} aria-label="Equalizer">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <line x1="2" y1="3" x2="2" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="5.5" y1="1.5" x2="5.5" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9" y1="4" x2="9" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12.5" y1="2.5" x2="12.5" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Search */}
        <button style={btnStyle} aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            <line x1="10.5" y1="10.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "rgba(255,255,255,0.55)",
  cursor: "pointer",
  padding: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
