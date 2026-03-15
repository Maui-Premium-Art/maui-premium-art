interface DockItemProps {
  label?: string;
  children: React.ReactNode;
  active?: boolean;
}

function DockItem({ label, children, active }: DockItemProps) {
  return (
    <button
      title={label}
      className="ct-dock-icon"
      style={{
        background: active ? "rgba(255,255,255,0.08)" : "none",
        border: active ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
        borderRadius: 8,
        padding: "6px 8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

export default function BottomDock() {
  return (
    <div
      className="ct-bottom-dock"
      style={{
        background: "#0c0c12",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        height: 52,
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        gap: 2,
        overflowX: "auto",
        flexShrink: 0,
      }}
    >
      {/* Car icon (active) */}
      <DockItem label="Vehicle" active>
        <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
          <path d="M4.5 10L7 4H19L21.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
          <rect x="2" y="10" width="22" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <circle cx="7" cy="15.5" r="1.8" fill="currentColor" opacity="0.7" />
          <circle cx="19" cy="15.5" r="1.8" fill="currentColor" opacity="0.7" />
        </svg>
      </DockItem>

      {/* Left nav arrow */}
      <DockItem label="Back">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path d="M8 2L3 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </DockItem>

      {/* Temperature display */}
      <div
        style={{
          fontSize: 17,
          fontWeight: 400,
          color: "rgba(255,255,255,0.6)",
          padding: "0 6px",
          letterSpacing: "-0.01em",
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
          fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        }}
      >
        72°
      </div>

      {/* Right nav arrow */}
      <DockItem label="Forward">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path d="M4 2L9 7L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </DockItem>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.06)", margin: "0 4px", flexShrink: 0 }} />

      {/* App icons — CT dock icons: phone, Waze-style, calendar, weather, Bluetooth, browser, settings */}
      {/* Phone */}
      <DockItem label="Phone">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3.5 1.5h3L8 5l-2 1.5C7.5 9.5 8.5 10.5 11.5 12L13 10l3.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5C8 16 2 10 2 3A1.5 1.5 0 0 1 3.5 1.5z" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </DockItem>

      {/* Toybox / Arcade */}
      <DockItem label="Toybox">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="6" cy="9" r="2" stroke="currentColor" strokeWidth="1" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
          <circle cx="14" cy="10" r="1" fill="currentColor" />
        </svg>
      </DockItem>

      {/* Calendar */}
      <DockItem label="Calendar">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="3.5" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="2" y1="7.5" x2="16" y2="7.5" stroke="currentColor" strokeWidth="0.9" />
          <line x1="6" y1="1.5" x2="6" y2="5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="12" y1="1.5" x2="12" y2="5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="5" y="10" width="2.2" height="2.2" rx="0.5" fill="currentColor" opacity="0.5" />
        </svg>
      </DockItem>

      {/* Energy / Charging */}
      <DockItem label="Energy">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M10 1L4 10h5l-1 7 6-9H9l1-7z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        </svg>
      </DockItem>

      {/* Bluetooth */}
      <DockItem label="Bluetooth">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path d="M7 1v16M7 1l5.5 4.5L7 9M7 17l5.5-4.5L7 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 5.5L7 9 1.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </DockItem>

      {/* Browser / Globe */}
      <DockItem label="Browser">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="9" cy="9" rx="3.2" ry="7.5" stroke="currentColor" strokeWidth="0.8" />
          <line x1="1.5" y1="9" x2="16.5" y2="9" stroke="currentColor" strokeWidth="0.8" />
          <path d="M2.5 5.5h13M2.5 12.5h13" stroke="currentColor" strokeWidth="0.6" />
        </svg>
      </DockItem>

      {/* Settings */}
      <DockItem label="Settings">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.1" />
          <path d="M9 1.5v2.5M9 14v2.5M1.5 9H4M14 9h2.5M3.1 3.1l1.8 1.8M13.1 13.1l1.8 1.8M3.1 14.9l1.8-1.8M13.1 4.9l1.8-1.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </DockItem>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right nav arrow */}
      <DockItem label="More">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path d="M4 2L9 7L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </DockItem>
    </div>
  );
}
