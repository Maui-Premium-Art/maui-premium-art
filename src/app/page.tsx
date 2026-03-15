"use client";

import { useState, useCallback } from "react";
import SplashScreen from "@/components/splash/SplashScreen";
import StatusBar from "@/components/console/StatusBar";
import VehicleControls from "@/components/console/VehicleControls";
import HeroArea from "@/components/console/HeroArea3D";
import MediaPlayer from "@/components/console/MediaPlayer";
import NavigationWidget from "@/components/console/NavigationWidget";
import BottomDock from "@/components/console/BottomDock";

export default function Home() {
  const [splashDone, setSplashDone] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <main
      style={{
        width: "100vw",
        height: "100dvh",
        background: "#0a0a0f",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          opacity: splashDone ? 1 : 0,
          transition: "opacity 0.6s ease",
          minHeight: 0,
        }}
      >
        {/* HEADER — 48px fixed, clear separation */}
        <div
          style={{
            height: 48,
            flexShrink: 0,
            position: "relative",
            zIndex: 25,
            background: "#0a0a0f",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <StatusBar />
        </div>

        {/* CONTENT ZONE — image + sidebar, fills remaining space */}
        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
          <HeroArea />
          <VehicleControls />
          {/* Closed / Tonneau — right side */}
          <div
            className="ct-tonneau-label"
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="8" y="11" fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle" fontWeight="700" fontFamily="sans-serif">!</text>
            </svg>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.02em", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>Closed / Tonneau</span>
          </div>
        </div>

        {/* BOTTOM CARDS — compact 155px zone */}
        <div
          className="ct-widgets-row"
          style={{
            display: "flex",
            gap: 8,
            padding: "0 10px 6px",
            flexShrink: 0,
          }}
        >
          <MediaPlayer />
          <NavigationWidget />
        </div>

        {/* DOCK — 52px fixed */}
        <BottomDock />
      </div>
    </main>
  );
}
