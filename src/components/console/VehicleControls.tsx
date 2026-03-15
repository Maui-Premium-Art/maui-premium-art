export default function VehicleControls() {
  return (
    <div
      style={{
        position: "absolute",
        left: 14,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        zIndex: 20,
        alignItems: "flex-start",
      }}
    >
      {/* Close Door */}
      <ControlItem
        label="Close Door"
        icon={
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="2" width="14" height="18" rx="2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.3" />
            <line x1="3" y1="11" x2="17" y2="11" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
            <circle cx="14" cy="11" r="1.2" fill="rgba(255,255,255,0.65)" />
            <line x1="5" y1="2" x2="5" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          </svg>
        }
      />

      {/* Auto Pilot */}
      <ControlItem
        label="Auto Pilot"
        icon={
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" />
            <circle cx="11" cy="11" r="3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
            <line x1="11" y1="3" x2="11" y2="8" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" />
            <line x1="7" y1="9.5" x2="3.5" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
            <line x1="15" y1="9.5" x2="18.5" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
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
          width: 42,
          height: 42,
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.03)",
          cursor: "pointer",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.02em",
          textAlign: "center",
          lineHeight: 1.2,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}
