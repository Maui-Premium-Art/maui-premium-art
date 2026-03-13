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
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* LEFT: Range + Self-Driving */}
      <div className="ct-status-left" style={{ display: "flex", flexDirection: "column", gap: 4, pointerEvents: "auto" }}>
        {/* Range indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Battery bars */}
          <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {[1, 1, 1, 0.7, 0.4, 0.2].map((opacity, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: i < 3 ? 12 : i < 5 ? 10 : 8,
                  backgroundColor: `rgba(255,255,255,${opacity})`,
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "0.02em",
            }}
          >
            123 mi
          </span>
        </div>

        {/* Start Self-Driving button */}
        <button
          className="ct-button-outline"
          style={{ alignSelf: "flex-start" }}
          aria-label="Start Exploring"
        >
          Start Self-Driving
        </button>
      </div>

      {/* CENTER: Status icons */}
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        {/* Profile icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="5" r="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <path
            d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>

        {/* WiFi icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 5.5C4 2.5 12 2.5 15 5.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M3 8c2.5-2.5 7.5-2.5 10 0" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M5.5 10.5c1.4-1.4 3.6-1.4 5 0" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="8" cy="13" r="1" fill="rgba(255,255,255,0.9)" />
        </svg>

        {/* LTE text */}
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.08em",
          }}
        >
          LTE
        </span>

        {/* Signal bars */}
        <div style={{ display: "flex", gap: 1.5, alignItems: "flex-end" }}>
          {[5, 8, 11, 14].map((h, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: h,
                backgroundColor: i < 3 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                borderRadius: 1,
              }}
            />
          ))}
        </div>

        {/* Settings circle */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <circle cx="8" cy="8" r="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        </svg>
      </div>

      {/* RIGHT: Time + Weather + Mini Map */}
      <div className="ct-status-right" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Time + Weather */}
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            {mounted ? time : "12:00"}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              gap: 4,
              justifyContent: "flex-end",
            }}
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
              <circle cx="5" cy="4" r="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1="5" y1="0.5" x2="5" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
              <line x1="5" y1="7" x2="5" y2="7.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
              <line x1="1.5" y1="4" x2="1" y2="4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
              <line x1="8.5" y1="4" x2="9" y2="4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
              <path d="M4 8C4 8 3 8 2.5 9C2 10 2.5 11 3.5 11H11.5C12.5 11 13 10 12.5 9C12 8 11 8 11 8C11 8 10.5 6.5 9 6.5C8 6.5 7.3 7 7 7.5" stroke="rgba(255,255,255,0.5)" strokeWidth="0.9" fill="none" />
            </svg>
            <span>78°F</span>
          </div>
        </div>

        {/* Mini map */}
        <div
          className="ct-minimap"
          style={{
            width: 56,
            height: 44,
            borderRadius: 6,
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#1a1f2e",
          }}
        >
          {/* Simple map grid */}
          <svg width="56" height="44" viewBox="0 0 56 44" fill="none">
            {/* Road lines */}
            <line x1="0" y1="22" x2="56" y2="22" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <line x1="28" y1="0" x2="28" y2="44" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <line x1="0" y1="11" x2="56" y2="11" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
            <line x1="0" y1="33" x2="56" y2="33" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
            <line x1="14" y1="0" x2="14" y2="44" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
            <line x1="42" y1="0" x2="42" y2="44" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
            {/* Compass/direction indicator */}
            <polygon points="28,8 31,16 28,14 25,16" fill="#ff3b30" />
          </svg>
        </div>
      </div>
    </div>
  );
}
