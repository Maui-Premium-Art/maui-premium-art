import Link from "next/link";

interface DockIconProps {
  label: string;
  children: React.ReactNode;
  active?: boolean;
  href?: string;
}

function DockIcon({ label, children, active, href }: DockIconProps) {
  const style: React.CSSProperties = {
    background: active ? "rgba(255,255,255,0.1)" : "none",
    border: active ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
    borderRadius: 8,
    width: 38,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
    flexShrink: 0,
    transition: "background 0.15s, color 0.15s",
    textDecoration: "none",
  };

  if (href) {
    return (
      <Link href={href} title={label} aria-label={label} className="ct-dock-icon" style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button title={label} aria-label={label} className="ct-dock-icon" style={style}>
      {children}
    </button>
  );
}

export default function BottomDock() {
  return (
    <div
      className="ct-bottom-dock"
      style={{
        background: "#0d0d14",
        borderTop: "1px solid #2a2a3e",
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
      <DockIcon label="Vehicle" active>
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          <path
            d="M2 10L4 4L18 4L20 10"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinejoin="round"
          />
          <rect x="1" y="10" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <circle cx="5.5" cy="14.5" r="1.5" fill="currentColor" />
          <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor" />
        </svg>
      </DockIcon>

      {/* Left chevrons */}
      <DockIcon label="Previous">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M12 2L7 7L12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </DockIcon>

      {/* Temperature */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 400,
          color: "rgba(255,255,255,0.6)",
          padding: "0 6px",
          letterSpacing: "0.02em",
          flexShrink: 0,
        }}
      >
        72°
      </div>

      {/* Steering wheel / drive mode */}
      <DockIcon label="Drive Mode">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.1" />
          <line x1="9" y1="6.5" x2="9" y2="1.5" stroke="currentColor" strokeWidth="1.1" />
          <line x1="6" y1="8" x2="1.8" y2="10.5" stroke="currentColor" strokeWidth="1.1" />
          <line x1="12" y1="8" x2="16.2" y2="10.5" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      </DockIcon>

      {/* Phone */}
      <DockIcon label="Phone">
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <rect x="1" y="1" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.1" fill="none" />
          <circle cx="7" cy="15" r="0.8" fill="currentColor" opacity="0.6" />
          <line x1="4" y1="3.5" x2="10" y2="3.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        </svg>
      </DockIcon>

      {/* Waze/Map */}
      <DockIcon label="Maps">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1C5.2 1 3 3.2 3 6C3 9.5 8 15 8 15C8 15 13 9.5 13 6C13 3.2 10.8 1 8 1Z" stroke="currentColor" strokeWidth="1.1" fill="none" />
          <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </DockIcon>

      {/* Calendar */}
      <DockIcon label="Calendar">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1.5" y="3.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" fill="none" />
          <line x1="1.5" y1="7" x2="14.5" y2="7" stroke="currentColor" strokeWidth="0.8" />
          <line x1="5" y1="1.5" x2="5" y2="5.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="11" y1="1.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <rect x="4" y="9" width="2" height="2" rx="0.3" fill="currentColor" opacity="0.5" />
        </svg>
      </DockIcon>

      {/* Weather */}
      <DockIcon label="Weather">
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <circle cx="9" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.1" fill="none" />
          <path d="M3 9C3 9 2 9 1.5 10C1 11 1.5 12 2.5 12H14.5C15.5 12 16 11 15.5 10C15 9 14 9 14 9C14 9 13.5 7 11.5 7C10.5 7 9.8 7.5 9.5 8" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </DockIcon>

      {/* Bluetooth */}
      <DockIcon label="Bluetooth">
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
          <path d="M2 4L10 10L6 14V4L10 8L2 14" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" fill="none" />
        </svg>
      </DockIcon>

      {/* New Artists — links to /artists page */}
      <DockIcon label="New Artists" href="/artists">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="6" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.1" fill="none" />
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.1" fill="none" />
          <path d="M9 3.5C10.2 3.5 11.2 4.2 11.7 5.2" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M6.3 12.8C7 14 8.2 14.5 9.5 14.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </DockIcon>

      {/* Browser */}
      <DockIcon label="Browser">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.1" />
          <ellipse cx="9" cy="9" rx="3" ry="7.5" stroke="currentColor" strokeWidth="0.8" />
          <line x1="1.5" y1="7" x2="16.5" y2="7" stroke="currentColor" strokeWidth="0.8" />
          <line x1="1.5" y1="11" x2="16.5" y2="11" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </DockIcon>

      {/* Settings */}
      <DockIcon label="Settings">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.1" />
          <path
            d="M9 1L10.2 4.2L13.5 3L12.8 6.4L16 7L14 9L16 11L12.8 11.6L13.5 15L10.2 13.8L9 17L7.8 13.8L4.5 15L5.2 11.6L2 11L4 9L2 7L5.2 6.4L4.5 3L7.8 4.2L9 1Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </DockIcon>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right chevrons */}
      <DockIcon label="Next">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M2 2L7 7L2 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </DockIcon>
    </div>
  );
}
