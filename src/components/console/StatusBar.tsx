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
      className="ct-status-bar"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 52,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "10px 14px 0",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* ── LEFT: Battery + range + Self-Driving ── */}
      <div className="ct-status-left" style={{ display: "flex", flexDirection: "column", gap: 6, pointerEvents: "auto" }}>
        {/* Battery + range row */}
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {/* Battery icon — horizontal bar like real CT */}
          <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
            <div
              style={{
                width: 24,
                height: 12,
                border: "1.5px solid rgba(255,255,255,0.7)",
                borderRadius: 2.5,
                padding: 1.5,
                display: "flex",
                gap: 1,
                alignItems: "stretch",
              }}
            >
              {[1, 1, 1, 1, 0, 0].map((filled, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    borderRadius: 0.5,
                    backgroundColor: filled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </div>
            {/* Battery nub */}
            <div
              style={{
                width: 2.5,
                height: 5,
                borderRadius: "0 1px 1px 0",
                backgroundColor: "rgba(255,255,255,0.45)",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "0.01em",
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
            }}
          >
            123 mi
          </span>
        </div>

        {/* Start Self-Driving button — CT pill shape */}
        <button
          style={{
            border: "1.5px solid #3b82f6",
            background: "rgba(59,130,246,0.06)",
            color: "#3b82f6",
            padding: "5px 14px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.02em",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            lineHeight: 1,
          }}
        >
          Start Self-Driving
        </button>
      </div>

      {/* ── CENTER: Status icons ── */}
      <div style={{ display: "flex", gap: 14, alignItems: "center", paddingTop: 2 }}>
        {/* Person/profile icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3.2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" />
          <path d="M3 18c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>

        {/* WiFi icon */}
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M1 4C5 0.5 15 0.5 19 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M4 7C7 4 13 4 16 7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M7 10C8.5 8.5 11.5 8.5 13 10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="10" cy="13.5" r="1.3" fill="rgba(255,255,255,0.85)" />
        </svg>

        {/* LTE text */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.06em",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          LTE
        </span>

        {/* Signal strength bars */}
        <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
          {[6, 9, 12, 15].map((h, i) => (
            <div
              key={i}
              style={{
                width: 3.5,
                height: h,
                borderRadius: 1,
                backgroundColor: i < 3 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>

        {/* Bluetooth icon */}
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
          <path d="M6 1v14M6 1l5 4-5 4M6 15l5-4-5-4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ── RIGHT: Clock + weather + compass ── */}
      <div className="ct-status-right" style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        {/* Time + weather stack */}
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            {mounted ? time : "12:00"}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              marginTop: 3,
              display: "flex",
              alignItems: "center",
              gap: 4,
              justifyContent: "flex-end",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            {/* Sun behind cloud */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <circle cx="11" cy="4" r="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M3 10.5C1.5 10.5 0.5 9.5 0.5 8.2C0.5 7 1.3 6 2.5 5.8C2.5 4 4 2.5 6 2.5C7.5 2.5 8.7 3.5 9.2 4.8C9.5 4.6 10 4.5 10.5 4.5C12 4.5 13.2 5.7 13.2 7.2C13.2 7.5 13.1 7.8 13 8C13 9.4 11.8 10.5 10.5 10.5H3Z" fill="rgba(255,255,255,0.55)" />
            </svg>
            <span>78°F</span>
          </div>
        </div>

        {/* Mini compass / map tile */}
        <div
          className="ct-minimap"
          style={{
            width: 50,
            height: 42,
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#101420",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <svg width="50" height="42" viewBox="0 0 50 42">
            <rect width="50" height="42" fill="#101420" />
            <line x1="0" y1="21" x2="50" y2="21" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            <line x1="25" y1="0" x2="25" y2="42" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            <line x1="0" y1="10" x2="50" y2="10" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="0" y1="32" x2="50" y2="32" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="12" y1="0" x2="12" y2="42" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="38" y1="0" x2="38" y2="42" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            {/* Red direction arrow */}
            <polygon points="25,5 28,14 25,12 22,14" fill="#ef4444" />
            {/* Blue position dot */}
            <circle cx="25" cy="22" r="3" fill="#3b82f6" opacity="0.6" />
            <circle cx="25" cy="22" r="1.5" fill="#3b82f6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
