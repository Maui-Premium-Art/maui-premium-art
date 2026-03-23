"use client";

import { useEffect, useState, useCallback } from "react";

type Gear = "P" | "R" | "N" | "D";

const CHARGE_LEVEL = 72;

function getChargeColor(pct: number): string {
  if (pct <= 20) return "#ef4444";
  if (pct <= 50) return "#eab308";
  return "#22c55e";
}

function getChargeGradient(pct: number): string {
  if (pct <= 20) return "linear-gradient(90deg, #dc2626, #ef4444)";
  if (pct <= 50) return "linear-gradient(90deg, #ef4444, #eab308)";
  return "linear-gradient(90deg, #22c55e, #4ade80)";
}

function getRangeForCharge(pct: number): number {
  return Math.round((pct / 100) * 320);
}

function getBatterySegments(pct: number): boolean[] {
  const filled = Math.round((pct / 100) * 5);
  return Array.from({ length: 5 }, (_, i) => i < filled);
}

interface StatusBarProps {
  onGalleryOpen?: () => void;
}

export default function StatusBar({ onGalleryOpen }: StatusBarProps) {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [weather, setWeather] = useState("78°F");
  const [gear, setGear] = useState<Gear>("P");
  const [charge, setCharge] = useState(0);
  const [chargeAnimated, setChargeAnimated] = useState(false);

  const handleGearSelect = useCallback((g: Gear) => {
    setGear(g);
  }, []);

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

    // Animate charge bar from 0 to CHARGE_LEVEL on mount
    const chargeTimeout = setTimeout(() => {
      setCharge(CHARGE_LEVEL);
      setChargeAnimated(true);
    }, 300);

    return () => {
      clearInterval(clockInterval);
      clearInterval(weatherInterval);
      clearTimeout(chargeTimeout);
    };
  }, []);

  return (
    <div
      className="ct-status-bar"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* LEFT: Battery hash + editions + Start Exploring (CT reference style) */}
      <div className="ct-status-left" style={{ display: "flex", flexDirection: "column", gap: 6, pointerEvents: "auto" }}>
        {/* Battery hash marks + range (CT style: /////// 224 mi) */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.5px", fontFamily: "monospace" }}>
            {"╱".repeat(getBatterySegments(charge).filter(Boolean).length)}
            <span style={{ color: "rgba(255,255,255,0.15)" }}>{"╱".repeat(5 - getBatterySegments(charge).filter(Boolean).length)}</span>
          </span>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", fontVariantNumeric: "tabular-nums" as const, fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif" }}>
            {getRangeForCharge(charge)} mi
          </span>
        </div>

        {/* Start Exploring button (CT: "Start Self-Driving") */}
        <button
          onClick={onGalleryOpen}
          aria-label="Start Exploring — open gallery"
          style={{
            border: "1.5px solid rgba(74,158,255,0.5)",
            background: "transparent",
            color: "rgba(255,255,255,0.85)",
            padding: "6px 16px",
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.02em",
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
            lineHeight: 1.2,
            alignSelf: "flex-start",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4a9eff"; e.currentTarget.style.background = "rgba(74,158,255,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(74,158,255,0.5)"; e.currentTarget.style.background = "transparent"; }}
        >
          Start Exploring
        </button>

        {/* Edition indicator (CT: "Press brake to select gears") */}
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontStyle: "italic", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
          3 of 10 editions available
        </div>
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
            background: "#0a1628",
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
            <rect width="62" height="46" fill="#0a1628" />
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
