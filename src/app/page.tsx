"use client";

import { useState, useCallback, useRef } from "react";
import SplashScreen from "@/components/splash/SplashScreen";
import StatusBar from "@/components/console/StatusBar";
import GalleryCarousel from "@/components/console/GalleryCarousel";
import ConnectOverlay from "@/components/console/ConnectOverlay";
import { dockSounds } from "@/lib/dockSounds";
import VehicleControls from "@/components/console/VehicleControls";
import HeroArea from "@/components/console/HeroArea3D";
import MediaPlayer from "@/components/console/MediaPlayer";
import NavigationWidget from "@/components/console/NavigationWidget";
import BottomDock from "@/components/console/BottomDock";

const TONNEAU_MESSAGES = [
  "Tonneau sealed — art inside.",
  "Access denied. Limited edition only.",
  "10 wraps per design. No peeking.",
  "Opening tonneau… just kidding.",
  "Art is stored in the tonneau of the mind.",
];

export default function Home() {
  const [splashDone, setSplashDone] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [tonneauMsg, setTonneauMsg] = useState<string | null>(null);
  const tonneauTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openGallery = useCallback(() => { setConnectOpen(false); setGalleryOpen(true); }, []);
  const closeGallery = useCallback(() => setGalleryOpen(false), []);
  const openConnect = useCallback(() => { setGalleryOpen(false); setConnectOpen(true); }, []);
  const closeConnect = useCallback(() => setConnectOpen(false), []);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  const handleTonneauClick = useCallback(() => {
    dockSounds.tonneauSlide();
    setTonneauMsg(TONNEAU_MESSAGES[Math.floor(Math.random() * TONNEAU_MESSAGES.length)]);
    if (tonneauTimer.current) clearTimeout(tonneauTimer.current);
    tonneauTimer.current = setTimeout(() => setTonneauMsg(null), 2500);
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
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)",
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
          <StatusBar onGalleryOpen={openGallery} />
        </div>

        {/* CONTENT ZONE — image + sidebar, fills remaining space */}
        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
          <HeroArea />
          {galleryOpen && <GalleryCarousel onClose={closeGallery} />}
          {connectOpen && <ConnectOverlay onClose={closeConnect} />}
          <VehicleControls onGalleryOpen={openGallery} />
          {/* Closed / Tonneau — right side — EASTER EGG */}
          <button
            className="ct-tonneau-label"
            onClick={handleTonneauClick}
            aria-label="Tonneau easter egg"
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke={tonneauMsg ? "rgba(74,158,255,0.5)" : "rgba(255,255,255,0.2)"} strokeWidth="1" style={{ transition: "stroke 0.3s ease" }} />
              <text x="8" y="11" fill={tonneauMsg ? "rgba(74,158,255,0.7)" : "rgba(255,255,255,0.3)"} fontSize="8" textAnchor="middle" fontWeight="700" fontFamily="sans-serif" style={{ transition: "fill 0.3s ease" }}>!</text>
            </svg>
            <span style={{ fontSize: 8, color: tonneauMsg ? "rgba(74,158,255,0.6)" : "rgba(255,255,255,0.2)", letterSpacing: "0.02em", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif", transition: "color 0.3s ease" }}>Closed / Tonneau</span>

            {/* Easter egg tooltip */}
            {tonneauMsg && (
              <div
                style={{
                  position: "absolute",
                  right: 28,
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
                }}
              >
                {tonneauMsg}
              </div>
            )}
          </button>
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
        <BottomDock onGalleryOpen={openGallery} onConnectOpen={openConnect} />
      </div>
    </main>
  );
}
