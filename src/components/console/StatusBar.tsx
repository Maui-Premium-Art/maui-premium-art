"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const hour = h % 12 || 12;
      setTime(`${hour}:${m}`);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* ── LEFT: Battery + range + Self-Driving ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5, pointerEvents: "auto" }}>
        {/* Battery + range */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Battery bars */}
          <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
            {[14, 14, 14, 12, 10].map((h, i) => (
              <div
                key={i}
                style={{
                  width: 3.5,
                  height: h,
                  borderRadius: 1.5,
                  backgroundColor: i < 3 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "0.02em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            123 mi
          </span>
        </div>

        {/* Start Self-Driving button */}
        <button
          style={{
            border: "1px solid #3b82f6",
            background: "rgba(59,130,246,0.08)",
            color: "#3b82f6",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.01em",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Start Self-Driving
        </button>
      </div>

      {/* ── CENTER: Status icons ── */}
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        {/* Person icon */}
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="6" r="3" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" />
          <path d="M2.5 16.5C2.5 13.46 5.46 11 9 11s6.5 2.46 6.5 5.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>

        {/* WiFi icon */}
        <svg width="20" height="18" viewBox="0 0 18 16" fill="none">
          <path d="M1 4.5C4.5 1 13.5 1 17 4.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M3.5 7C6.2 4.3 11.8 4.3 14.5 7" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M6.2 9.5C7.6 8.1 10.4 8.1 11.8 9.5" stroke="rgba(255,255,255,0.75)" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="9" cy="13" r="1.2" fill="rgba(255,255,255,0.9)" />
        </svg>

        {/* LTE */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.08em",
          }}
        >
          LTE
        </span>

        {/* Signal bars */}
        <div style={{ display: "flex", gap: 2.5, alignItems: "flex-end" }}>
          {[7, 10, 13, 16].map((h, i) => (
            <div
              key={i}
              style={{
                width: 3.5,
                height: h,
                borderRadius: 1.5,
                backgroundColor: i < 3 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* Location/sync icon */}
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <circle cx="7" cy="7" r="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <line x1="7" y1="1.5" x2="7" y2="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <line x1="7" y1="10" x2="7" y2="13" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        </svg>
      </div>

      {/* ── RIGHT: Clock + weather + compass ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Time + weather */}
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "0.02em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {mounted ? time : "12:00"}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.55)",
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              gap: 3,
              justifyContent: "flex-end",
            }}
          >
            {/* Cloud icon */}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M2 8C2 8 1 8 0.8 7C0.6 6 1.2 5 2 5C2 5 2 3 3.5 3C5 3 5 5 5 5C5 5 5.5 4 6.5 4C8 4 8 5.5 8 5.5C8 5.5 8.5 5 9 5C10 5 10.5 6 10.5 7C10.5 8 9.5 8 9.5 8H2Z" fill="rgba(255,255,255,0.6)" />
            </svg>
            <span>78°F</span>
          </div>
        </div>

        {/* Compass/mini-map */}
        <div
          style={{
            width: 52,
            height: 44,
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "#111826",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <svg width="52" height="44" viewBox="0 0 52 44" fill="none">
            {/* Grid lines */}
            <line x1="0" y1="22" x2="52" y2="22" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
            <line x1="26" y1="0" x2="26" y2="44" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" />
            <line x1="0" y1="11" x2="52" y2="11" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="0" y1="33" x2="52" y2="33" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="13" y1="0" x2="13" y2="44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="39" y1="0" x2="39" y2="44" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            {/* Red compass arrow */}
            <polygon points="26,4 29,14 26,12 23,14" fill="#ef4444" />
          </svg>
        </div>
      </div>
    </div>
  );
}
