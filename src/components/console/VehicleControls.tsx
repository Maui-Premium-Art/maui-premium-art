"use client";

import { useState, useCallback } from "react";
import { dockSounds } from "@/lib/dockSounds";

const EASTER_EGG_MESSAGES = [
  "Nice try, this is art — not a truck.",
  "Frunk is full of paintbrushes.",
  "Aloha! No frunk access today.",
  "Art mode engaged.",
  "The frunk contains one (1) Mahalo Bird.",
];

const TONNEAU_MESSAGES = [
  "Tonneau sealed — art inside.",
  "Access denied. Limited edition only.",
  "10 wraps per design. No peeking.",
  "Opening tonneau… just kidding.",
  "Art is stored in the tonneau of the mind.",
];

export default function VehicleControls() {
  const [frunkMsg, setFrunkMsg] = useState<string | null>(null);
  const [frunkShake, setFrunkShake] = useState(false);

  const handleFrunkClick = useCallback(() => {
    dockSounds.frunkOpen();
    setFrunkShake(true);
    setFrunkMsg(EASTER_EGG_MESSAGES[Math.floor(Math.random() * EASTER_EGG_MESSAGES.length)]);
    setTimeout(() => setFrunkShake(false), 400);
    setTimeout(() => setFrunkMsg(null), 2500);
  }, []);

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
          href="/artists"
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
          easterEgg
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
          easterEgg
        />
      </div>

      {/* Tire pressure + Frunk label — EASTER EGG */}
      <button
        onClick={handleFrunkClick}
        aria-label="Frunk easter egg"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          marginTop: 4,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          position: "relative",
          transform: frunkShake ? "translateX(3px)" : "translateX(0)",
          transition: "transform 0.1s ease",
          animation: frunkShake ? "shake 0.4s ease" : "none",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke={frunkMsg ? "rgba(74,158,255,0.5)" : "rgba(255,255,255,0.2)"} strokeWidth="1" style={{ transition: "stroke 0.3s ease" }} />
          <text x="8" y="11" fill={frunkMsg ? "rgba(74,158,255,0.7)" : "rgba(255,255,255,0.3)"} fontSize="8" textAnchor="middle" fontWeight="700" fontFamily="sans-serif" style={{ transition: "fill 0.3s ease" }}>!</text>
        </svg>
        <span style={{ fontSize: 8, color: frunkMsg ? "rgba(74,158,255,0.6)" : "rgba(255,255,255,0.2)", letterSpacing: "0.02em", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif", transition: "color 0.3s ease" }}>Closed / Frunk</span>

        {/* Easter egg tooltip */}
        {frunkMsg && (
          <div
            style={{
              position: "absolute",
              left: 28,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(10,10,15,0.9)",
              border: "1px solid rgba(74,158,255,0.2)",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 10,
              color: "rgba(255,255,255,0.7)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              animation: "fadeIn 0.2s ease",
            }}
          >
            {frunkMsg}
          </div>
        )}
      </button>

      {/* SWIPE TO CHARGE — vertical text */}
      <div
        style={{
          position: "absolute",
          left: -18,
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "center center",
          fontSize: 9,
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.4)",
          whiteSpace: "nowrap",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          fontWeight: 600,
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        SWIPE TO CHARGE
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
          40% { transform: translateX(3px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-50%) translateX(-4px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
      `}</style>
    </div>
  );
}

function ControlItem({ label, icon, href, easterEgg }: { label: string; icon: React.ReactNode; href?: string; easterEgg?: boolean }) {
  const [flash, setFlash] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const COMMISSION_MSGS = [
    "Commission requests opening soon.",
    "$2,995 – $4,995 · DM us on X.",
    "Custom wraps — coming soon.",
  ];
  const GALLERY_MSGS = [
    "Gallery loading…",
    "3 of 10 available.",
    "Swipe coming in Phase 2.",
  ];

  const handleClick = useCallback(() => {
    if (href) {
      window.location.href = href;
      return;
    }
    if (!easterEgg) return;
    dockSounds.denied();
    setFlash(true);
    const msgs = label === "Commission" ? COMMISSION_MSGS : GALLERY_MSGS;
    setMsg(msgs[Math.floor(Math.random() * msgs.length)]);
    setTimeout(() => setFlash(false), 300);
    setTimeout(() => setMsg(null), 2000);
  }, [href, easterEgg, label]);

  return (
    <div
      onClick={handleClick}
      role={href ? "link" : "button"}
      aria-label={label}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        transition: "opacity 0.15s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = ""; }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: `1px solid ${flash ? "rgba(74,158,255,0.4)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: flash ? "rgba(74,158,255,0.08)" : "rgba(255,255,255,0.04)",
          transition: "border-color 0.3s ease, background 0.3s ease",
          transform: flash ? "scale(0.95)" : "scale(1)",
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

      {/* Easter egg tooltip */}
      {msg && (
        <div
          style={{
            position: "absolute",
            left: 52,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(10,10,15,0.9)",
            border: "1px solid rgba(74,158,255,0.2)",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 10,
            color: "rgba(255,255,255,0.7)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            animation: "fadeIn 0.2s ease",
            zIndex: 30,
          }}
        >
          {msg}
        </div>
      )}
    </div>
  );
}
