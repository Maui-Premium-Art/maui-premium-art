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
      {/* Dark backing panel */}
      <div
        style={{
          background: "rgba(10,10,15,0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "10px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          alignItems: "center",
        }}
      >
        {/* Step 6: Close Door → Artist */}
        <ControlItem
          label="Artist"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" />
              <path d="M4 20c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
          }
        />
        {/* Step 6: Autopilot → Commission */}
        <ControlItem
          label="Commission"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 3l3 3-11 11-4 1 1-4L16 3z" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
              <line x1="14" y1="5" x2="17" y2="8" stroke="rgba(255,255,255,0.45)" strokeWidth="1.1" />
            </svg>
          }
        />
        {/* Step 6: Audio → Gallery */}
        <ControlItem
          label="Gallery"
          icon={
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="2" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
              <circle cx="7.5" cy="7.5" r="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <path d="M2 17l5-5 3.5 3.5 3-3L20 19" stroke="rgba(255,255,255,0.5)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
      </div>
    </div>
  );
}

function ControlItem({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", transition: "opacity 0.15s ease" }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = ""; }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.04)",
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
