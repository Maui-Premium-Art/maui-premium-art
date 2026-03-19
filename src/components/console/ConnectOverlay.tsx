"use client";

const LINKS = [
  {
    label: "Follow on X",
    url: "https://x.com/Maui_PremiumArt",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    description: "@Maui_PremiumArt",
  },
  {
    label: "Email Us",
    url: "mailto:hello@mauipremiumart.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
    description: "hello@mauipremiumart.com",
  },
  {
    label: "Visit Website",
    url: "https://mauipremiumart.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    description: "mauipremiumart.com",
  },
];

interface ConnectOverlayProps {
  onClose: () => void;
}

export default function ConnectOverlay({ onClose }: ConnectOverlayProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(5,5,10,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      role="dialog"
      aria-label="Connect with Maui Premium Art"
    >
      <div
        style={{
          width: "100%",
          maxWidth: 340,
          padding: "0 20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#4a9eff",
              marginBottom: 8,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Connect
          </div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 300,
              color: "#ffffff",
              margin: "0 0 6px",
              letterSpacing: "0.02em",
              fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            Find us out there.
          </h2>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              margin: 0,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Commissions, questions, or just say aloha.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                background: "rgba(14,14,22,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                textDecoration: "none",
                transition: "border-color 0.2s ease, background 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(74,158,255,0.3)";
                e.currentTarget.style.background = "rgba(74,158,255,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(14,14,22,0.8)";
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.5)", flexShrink: 0 }}>
                {link.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#ffffff",
                    letterSpacing: "0.01em",
                    fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                  }}
                >
                  {link.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    marginTop: 1,
                    fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                  }}
                >
                  {link.description}
                </div>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                style={{ marginLeft: "auto", color: "rgba(255,255,255,0.2)" }}
              >
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </a>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close connect overlay"
          style={{
            display: "block",
            margin: "20px auto 0",
            background: "none",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            padding: "8px 24px",
            cursor: "pointer",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
