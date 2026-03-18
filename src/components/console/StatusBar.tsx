"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [weather, setWeather] = useState("78°F");

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      const hst = new Date(now.toLocaleString("en-US", { timeZone: "Pacific/Honolulu" }));
      const h = hst.getHours();
      const m = hst.getMinutes().toString().padStart(2, "0");
      const s = hst.getSeconds().toString().padStart(2, "0");
      const hour = h % 12 || 12;
      setTime(`${hour}:${m}:${s}`);
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=20.76&longitude=-156.44&current=temperature_2m&temperature_unit=fahrenheit&timezone=Pacific%2FHonolulu"
        );
        const data = await res.json();
        const temp = Math.round(data.current.temperature_2m);
        setWeather(`${temp}°F`);
      } catch {
        setWeather("78°F");
      }
    };
    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 600000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <div
      className="ct-status-bar"
      style={{
        position: "relative",
        width: "100%",
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* LEFT: PRND + charge bar + range + Gallery */}
      <div className="ct-status-left" style={{ display: "flex", flexDirection: "column", gap: 5, pointerEvents: "auto" }}>
        {/* PRND gear selector + charge bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* PRND */}
          <div style={{ display: "flex", gap: 6, fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif" }}>
            {["P", "R", "N", "D"].map((g) => (
              <span
                key={g}
                style={{
                  fontSize: 14,
                  fontWeight: g === "P" ? 700 : 400,
                  color: g === "P" ? "#ffffff" : "rgba(255,255,255,0.25)",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                {g}
              </span>
            ))}
          </div>

          {/* Charge bar — diagonal lines + percentage */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 40, height: 10, position: "relative" as const, overflow: "hidden", borderRadius: 2, border: "1px solid rgba(255,255,255,0.2)" }}>
              <div style={{ width: "60%", height: "100%", background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 2px, transparent 2px, transparent 4px)" }} />
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 500, fontVariantNumeric: "tabular-nums" as const }}>60%</span>
          </div>

          {/* Battery + range */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
              <div style={{ width: 20, height: 10, border: "1.5px solid rgba(255,255,255,0.6)", borderRadius: 2, padding: 1, display: "flex", gap: 0.5, alignItems: "stretch" }}>
                {[1, 1, 1, 0, 0].map((filled, i) => (
                  <div key={i} style={{ flex: 1, borderRadius: 0.5, backgroundColor: filled ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.1)" }} />
                ))}
              </div>
              <div style={{ width: 2, height: 4, borderRadius: "0 1px 1px 0", backgroundColor: "rgba(255,255,255,0.4)" }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#ffffff", fontVariantNumeric: "tabular-nums" as const, lineHeight: 1 }}>
              123 mi
            </span>
          </div>
        </div>

        {/* Tap to activate drive */}
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
          ↑ Tap to activate drive
        </div>

        {/* Gallery button */}
        <button
          style={{
            border: "1.5px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "rgba(255,255,255,0.7)",
            padding: "5px 14px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.02em",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            lineHeight: 1,
            alignSelf: "flex-start",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.color = "#3b82f6"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
        >
          Gallery
        </button>
      </div>

      {/* CENTER: Status icons with login button */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", paddingTop: 2 }}>
        {/* Person icon → Login button */}
        <button
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", transition: "opacity 0.15s ease", pointerEvents: "auto" } as React.CSSProperties}
          title="Login"
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = ""; }}
        >
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="7" r="3.2" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
            <path d="M3 18c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </button>
        <svg width="22" height="18" viewBox="0 0 20 16" fill="none">
          <path d="M1 4C5 0.5 15 0.5 19 4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 7C7 4 13 4 16 7" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 10C8.5 8.5 11.5 8.5 13 10" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="13.5" r="1.3" fill="rgba(255,255,255,0.95)" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>LTE</span>
        <div style={{ display: "flex", gap: 2.5, alignItems: "flex-end" }}>
          {[7, 10, 13, 16].map((h, i) => (
            <div key={i} style={{ width: 4, height: h, borderRadius: 1, backgroundColor: i < 3 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
        <svg width="14" height="18" viewBox="0 0 12 16" fill="none">
          <path d="M6 1v14M6 1l5 4-5 4M6 15l5-4-5-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* RIGHT: Clock + weather + Hawaii map */}
      <div className="ct-status-right" style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ textAlign: "right" as const }}>
          <div style={{ fontSize: 32, fontWeight: 300, color: "#ffffff", letterSpacing: "-0.01em", lineHeight: 1, fontVariantNumeric: "tabular-nums" as const, fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif" }}>
            {mounted ? time : "12:00:00"}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <circle cx="11" cy="4" r="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M3 10.5C1.5 10.5 0.5 9.5 0.5 8.2C0.5 7 1.3 6 2.5 5.8C2.5 4 4 2.5 6 2.5C7.5 2.5 8.7 3.5 9.2 4.8C9.5 4.6 10 4.5 10.5 4.5C12 4.5 13.2 5.7 13.2 7.2C13.2 7.5 13.1 7.8 13 8C13 9.4 11.8 10.5 10.5 10.5H3Z" fill="rgba(255,255,255,0.55)" />
            </svg>
            <span>{mounted ? weather : "78°F"}</span>
          </div>
        </div>

        {/* Hawaii map — replaces compass */}
        <div
          className="ct-minimap"
          style={{
            width: 62,
            height: 46,
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#0a0a0f",
            flexShrink: 0,
            position: "relative" as const,
          }}
          title="Kihei, Maui"
        >
          <svg width="62" height="46" viewBox="0 0 62 46" aria-label="Hawaiian island chain with Kihei marker">
            <defs>
              <style>{`
                @keyframes kiheiPulse {
                  0%, 100% { r: 1.2; opacity: 0.9; }
                  50% { r: 2.5; opacity: 0.4; }
                }
                .kihei-pulse { animation: kiheiPulse 2s ease-in-out infinite; }
              `}</style>
            </defs>
            <rect width="62" height="46" fill="#0a0a0f" />
            {/* Niihau */}
            <ellipse cx="5" cy="15" rx="1.8" ry="2.2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            {/* Kauai */}
            <ellipse cx="10" cy="14" rx="3.5" ry="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* Oahu */}
            <path d="M17 16 C19 14.5 22 15 22 17 C22 18.5 20 20 18 19.5 C16 19 16 17 17 16Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* Molokai */}
            <ellipse cx="27" cy="16.5" rx="4.5" ry="1.3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            {/* Lanai */}
            <ellipse cx="28" cy="21" rx="1.8" ry="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            {/* Kahoolawe */}
            <ellipse cx="32" cy="24" rx="1.5" ry="1" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7" />
            {/* Maui — highlighted */}
            <path d="M31 14.5 C33 13.5 36 14.5 36.5 16.5 C37 18.5 35 22.5 33 23 C31.5 23.3 30 21.5 30.5 19 C30 18 30 17 31 15.5Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
            {/* Hawaii (Big Island) */}
            <path d="M44 18 C47 16.5 52 18.5 52.5 22 C53 26 50 32 46 33 C42.5 33.5 40 29 40 25 C40 21.5 42 19 44 18Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* Kihei marker — pulsing dot on south Maui */}
            <circle className="kihei-pulse" cx="33" cy="21" r="1.2" fill="#ef4444" />
            <circle cx="33" cy="21" r="1" fill="#ef4444" />
          </svg>
        </div>
      </div>
    </div>
  );
}
