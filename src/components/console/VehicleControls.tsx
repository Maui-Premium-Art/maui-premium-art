export default function VehicleControls() {
  return (
    <div
      className="ct-vehicle-controls"
      style={{
        position: "absolute",
        left: 16,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        zIndex: 20,
        alignItems: "flex-start",
      }}
    >
      {/* Close Door */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.04)",
            cursor: "pointer",
          }}
        >
          {/* Door icon */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="2" width="14" height="18" rx="1.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" fill="none" />
            <line x1="3" y1="11" x2="17" y2="11" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
            <circle cx="14.5" cy="11" r="1" fill="rgba(255,255,255,0.6)" />
            {/* Hinge line */}
            <line x1="5" y1="2" x2="5" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          </svg>
        </div>
        <span
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.03em",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Close<br />Door
        </span>
      </div>

      {/* Autopilot / Headlights icon */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.02)",
            cursor: "pointer",
          }}
        >
          {/* Autopilot/headlight icon - two horizontal lines with dot */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="6" cy="11" r="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
            <line x1="9" y1="9" x2="19" y2="7" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
            <line x1="9" y1="11" x2="19" y2="11" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
            <line x1="9" y1="13" x2="19" y2="15" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
        <span
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.03em",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Auto<br />Pilot
        </span>
      </div>
    </div>
  );
}
