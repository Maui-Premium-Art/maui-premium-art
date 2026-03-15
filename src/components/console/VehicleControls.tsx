export default function VehicleControls() {
  return (
    <div
      className="ct-vehicle-controls"
      style={{
        position: "absolute",
        left: 12,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        zIndex: 20,
        alignItems: "flex-start",
      }}
    >
      {/* Close Door — CT shows door outline with handle */}
      <ControlItem
        label="Close Door"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {/* Door body */}
            <path d="M4 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4V3z" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" fill="none" />
            {/* Window divider */}
            <line x1="4" y1="11" x2="18" y2="11" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            {/* Door handle */}
            <rect x="13" y="12.5" width="3.5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.55)" />
            {/* Hinge line */}
            <line x1="4" y1="3" x2="4" y2="21" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          </svg>
        }
      />

      {/* Autopilot — CT steering wheel icon */}
      <ControlItem
        label="Autopilot"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {/* Steering wheel circle */}
            <circle cx="12" cy="12" r="8.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" />
            {/* Center hub */}
            <circle cx="12" cy="12" r="2.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
            {/* Spokes */}
            <line x1="12" y1="3.5" x2="12" y2="9.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
            <line x1="4.5" y1="15" x2="9.5" y2="12.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
            <line x1="19.5" y1="15" x2="14.5" y2="12.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          </svg>
        }
      />

      {/* Audio */}
      <ControlItem
        label="Audio"
        icon={
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="8" width="2.5" height="6" rx="1" fill="rgba(255,255,255,0.5)" />
            <rect x="7" y="5" width="2.5" height="12" rx="1" fill="rgba(255,255,255,0.65)" />
            <rect x="11" y="7" width="2.5" height="8" rx="1" fill="rgba(255,255,255,0.5)" />
            <rect x="15" y="4" width="2.5" height="14" rx="1" fill="rgba(255,255,255,0.35)" />
          </svg>
        }
      />
    </div>
  );
}

function ControlItem({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div
        style={{
          width: 44,
          height: 44,
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.03)",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.02em",
          textAlign: "center",
          lineHeight: 1.2,
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}
