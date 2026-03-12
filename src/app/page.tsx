"use client";

import { useState, useCallback } from "react";
import SplashScreen from "@/components/splash/SplashScreen";
import StatusBar from "@/components/console/StatusBar";
import VehicleControls from "@/components/console/VehicleControls";
import HeroArea from "@/components/console/HeroArea";
import MediaPlayer from "@/components/console/MediaPlayer";
import NavigationWidget from "@/components/console/NavigationWidget";
import BottomDock from "@/components/console/BottomDock";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

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
      {/* Boot splash screen */}
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main console — fades in after splash */}
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
        {/* Hero area — fills available space */}
        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
          <HeroArea />
          <StatusBar />
          <VehicleControls />
        </div>

        {/* Bottom widgets row */}
        <div
          style={{
            display: "flex",
            gap: 10,
            padding: "0 12px 10px",
            flexShrink: 0,
          }}
        >
          <MediaPlayer />
          <NavigationWidget />
        </div>

        {/* Bottom dock */}
        <BottomDock />
      </div>
    </main>
  );
}
