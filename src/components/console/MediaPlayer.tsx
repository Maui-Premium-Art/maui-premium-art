export default function MediaPlayer() {
  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 10,
        padding: "10px 14px",
        minWidth: 220,
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
        Choose Media Source
      </div>

      {/* Now playing */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 14, color: "#fff", fontWeight: 500, letterSpacing: "0.01em" }}>
          Slack Key Sessions
        </div>
        <div style={{ fontSize: 13, color: "#888899", marginTop: 2 }}>
          Keola Beamer · Hawaiian Slack Key
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 2,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 1,
          marginBottom: 10,
          position: "relative",
        }}
      >
        <div
          style={{
            width: "38%",
            height: "100%",
            background: "rgba(255,255,255,0.5)",
            borderRadius: 1,
          }}
        />
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Prev */}
        <button
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="2" height="10" fill="currentColor" rx="0.5" />
            <path d="M14 3L6 8L14 13V3Z" fill="currentColor" />
          </svg>
        </button>

        {/* Play */}
        <button
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50%",
            width: 32,
            height: 32,
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Play"
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M2 1L11 7L2 13V1Z" fill="white" />
          </svg>
        </button>

        {/* Next */}
        <button
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="12" y="3" width="2" height="10" fill="currentColor" rx="0.5" />
            <path d="M2 3L10 8L2 13V3Z" fill="currentColor" />
          </svg>
        </button>

        {/* EQ icon */}
        <button
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            padding: 4,
          }}
          aria-label="Equalizer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="2" y1="4" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="5" y1="2" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="5" x2="8" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="11" y1="3" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Search icon */}
        <button
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            padding: 4,
          }}
          aria-label="Search"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
            <line x1="9" y1="9" x2="12.5" y2="12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
