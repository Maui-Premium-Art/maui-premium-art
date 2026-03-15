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
        padding: "4px 6px 2px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
        flexShrink: 0,
        minWidth: 34,
        transition: "opacity 0.15s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = ""; }}
    >
      {children}
      {label && (
        <span style={{ fontSize: 9, color: "inherit", letterSpacing: "0.01em", lineHeight: 1, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
          {label}
        </span>
      )}
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
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        gap: 2,
        overflowX: "auto",
        flexShrink: 0,
      }}
    >
      {/* Step 5: Dock icons → site nav */}
      <DockItem label="Home" active>
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
          <path d="M2 7L10 1l8 6v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <rect x="7" y="10" width="6" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      </DockItem>

      {/* Left nav arrow */}
      <DockItem>
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path d="M8 2L3 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </DockItem>

      {/* Temperature */}
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
      <DockItem>
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path d="M4 2L9 7L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </DockItem>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.06)", margin: "0 4px", flexShrink: 0 }} />

      {/* Site navigation icons */}
      <DockItem label="Gallery">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="6" cy="6.5" r="2" stroke="currentColor" strokeWidth="1" />
          <path d="M1.5 13l4-4 3 3 2.5-2.5L16.5 15" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </DockItem>

      <DockItem label="Commission">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M14 2l2 2-9.5 9.5-3.5 1 1-3.5L14 2z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
          <line x1="12" y1="4" x2="14" y2="6" stroke="currentColor" strokeWidth="1" />
        </svg>
      </DockItem>

      <DockItem label="Events">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="3.5" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="2" y1="7.5" x2="16" y2="7.5" stroke="currentColor" strokeWidth="0.9" />
          <line x1="6" y1="1.5" x2="6" y2="5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="12" y1="1.5" x2="12" y2="5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="5" y="10" width="2.2" height="2.2" rx="0.5" fill="currentColor" opacity="0.5" />
        </svg>
      </DockItem>

      <DockItem label="Drops">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2C9 2 4 8 4 11a5 5 0 0 0 10 0c0-3-5-9-5-9z" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <circle cx="9" cy="12" r="1.5" stroke="currentColor" strokeWidth="0.9" />
        </svg>
      </DockItem>

      <DockItem label="Story">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 2h8l4 4v10a1 1 0 0 1-1 1H3V2z" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M11 2v4h4" stroke="currentColor" strokeWidth="1.1" />
          <line x1="5.5" y1="9" x2="12.5" y2="9" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="5.5" y1="12" x2="10.5" y2="12" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
      </DockItem>

      <DockItem label="Customize">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.1" />
          <path d="M9 1.5v2.5M9 14v2.5M1.5 9H4M14 9h2.5M3.1 3.1l1.8 1.8M13.1 13.1l1.8 1.8M3.1 14.9l1.8-1.8M13.1 4.9l1.8-1.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </DockItem>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right nav arrow — visible */}
      <DockItem>
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path d="M4 2L10 8L4 14" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </DockItem>
    </div>
  );
}
