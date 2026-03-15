import Link from "next/link";

interface DockItemProps {
  label?: string;
  children: React.ReactNode;
  active?: boolean;
  href?: string;
  showLabel?: boolean;
}

function DockItem({ label, children, active, href, showLabel }: DockItemProps) {
  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: "4px 6px",
        borderRadius: 8,
        background: active ? "rgba(255,255,255,0.1)" : "transparent",
        border: active ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
        cursor: "pointer",
        minWidth: 36,
        color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
      }}
    >
      {children}
      {showLabel && label && (
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.02em",
            color: "inherit",
            textAlign: "center",
            lineHeight: 1,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} title={label} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }

  return <button title={label} style={{ background: "none", border: "none", padding: 0 }}>{content}</button>;
}

export default function BottomDock() {
  return (
    <div
      style={{
        background: "#0d0d14",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
        gap: 4,
        overflowX: "auto",
        flexShrink: 0,
      }}
    >
      {/* Car icon (active — current view) */}
      <DockItem label="Vehicle" active>
        <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
          <path d="M4 10L6 4L18 4L20 10" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
          <rect x="1.5" y="10" width="21" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" fill="none" />
          <circle cx="6" cy="15.5" r="1.8" fill="currentColor" opacity="0.8" />
          <circle cx="18" cy="15.5" r="1.8" fill="currentColor" opacity="0.8" />
        </svg>
      </DockItem>

      {/* Left arrow */}
      <DockItem label="Back">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </DockItem>

      {/* Temperature */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 400,
          color: "rgba(255,255,255,0.65)",
          padding: "0 4px",
          letterSpacing: "0.01em",
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        72°
      </div>

      {/* Right arrow */}
      <DockItem label="Forward">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </DockItem>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* App icons grid */}
      {[
        {
          label: "Smiley",
          icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="6.5" cy="7" r="1" fill="currentColor" />
              <circle cx="11.5" cy="7" r="1" fill="currentColor" />
              <path d="M6 11.5C6 11.5 7.5 13 9 13C10.5 13 12 11.5 12 11.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          ),
        },
        {
          label: "Apps",
          href: "/artists",
          icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <rect x="1.5" y="10.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          ),
        },
        {
          label: "Map",
          icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1.5C6 1.5 3.5 4 3.5 7C3.5 11 9 16.5 9 16.5C9 16.5 14.5 11 14.5 7C14.5 4 12 1.5 9 1.5Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
              <circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          ),
        },
        {
          label: "Calendar",
          icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="3.5" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <line x1="2" y1="7.5" x2="16" y2="7.5" stroke="currentColor" strokeWidth="0.9" />
              <line x1="6" y1="1.5" x2="6" y2="5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="12" y1="1.5" x2="12" y2="5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <rect x="5" y="10" width="2.5" height="2.5" rx="0.5" fill="currentColor" opacity="0.5" />
            </svg>
          ),
        },
        {
          label: "Person",
          icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2.5 17C2.5 13.96 5.46 11.5 9 11.5s6.5 2.46 6.5 5.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
          ),
        },
        {
          label: "Key",
          icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.2" />
              <line x1="10.5" y1="11" x2="16" y2="16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="13" y1="14" x2="14.5" y2="12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          ),
        },
        {
          label: "Globe",
          icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2" />
              <ellipse cx="9" cy="9" rx="3" ry="7.5" stroke="currentColor" strokeWidth="0.9" />
              <line x1="1.5" y1="9" x2="16.5" y2="9" stroke="currentColor" strokeWidth="0.9" />
              <line x1="2.5" y1="5.5" x2="15.5" y2="5.5" stroke="currentColor" strokeWidth="0.7" />
              <line x1="2.5" y1="12.5" x2="15.5" y2="12.5" stroke="currentColor" strokeWidth="0.7" />
            </svg>
          ),
        },
        {
          label: "Settings",
          icon: (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M9 1.5L10 4.5L13 3L12.5 6L15.5 7L13.5 9L15.5 11L12.5 12L13 15L10 13.5L9 16.5L8 13.5L5 15L5.5 12L2.5 11L4.5 9L2.5 7L5.5 6L5 3L8 4.5L9 1.5Z" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          ),
        },
      ].map(({ label, icon, href }) => (
        <DockItem key={label} label={label} href={href} showLabel>
          {icon}
        </DockItem>
      ))}

      {/* Flex spacer */}
      <div style={{ flex: 1 }} />

      {/* Right arrow */}
      <DockItem label="More">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </DockItem>
    </div>
  );
}
