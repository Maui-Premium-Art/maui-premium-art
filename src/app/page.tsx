"use client";

import { useState, useEffect, useMemo } from "react";
import { useHawaiianRadio } from "@/hooks/useHawaiianRadio";
import AudioVisualizerSidebar from "@/components/console/AudioVisualizerSidebar";
import { CTZoneRenderer, parseManifest } from "@/components/console/CTZoneRenderer";
import { createZoneHandlers } from "@/data/zone-handlers";
import rawManifest from "@/data/ct-display-manifest-v2.json";
// import CTDisplayViewer from "@/components/CTDisplayViewer"; // REMOVED — Boss: clear 3D model for template editing

/**
 * Maui Premium Art — Homepage
 *
 * CT Display driven by ct-display-manifest-v2.json (44 zones).
 * Debug mode: ?debug=true or press D key.
 */

const manifest = parseManifest(rawManifest);

export default function Home() {
  const [debug, setDebug] = useState(false);
  const [eqOpen, setEqOpen] = useState(false);
  const [trackListOpen, setTrackListOpen] = useState(false);
  const radio = useHawaiianRadio();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "true") setDebug(true);
    const handler = (e: KeyboardEvent) => {
      if (e.key === "d" || e.key === "D") {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        setDebug(prev => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handlers = useMemo(
    () => createZoneHandlers({ radio, setEqOpen, setTrackListOpen }),
    [radio, setEqOpen, setTrackListOpen]
  );

  return (
    <main style={{
      width: "100vw", height: "100dvh",
      background: "#0a0c10",
      display: "flex", alignItems: "center", justifyContent: "flex-start",
      overflow: "hidden",
    }}>
      <div
        id="ct-display"
        role="img"
        aria-label="Cybertruck display interface"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "calc(100dvh * 16 / 9)",
          aspectRatio: "16/9",
          background: "#0a0c10",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        {/* ═══ LAYER 1: CT BACKGROUND ═══ */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/ct-display-real.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }} />

        {/* ═══ LAYER 1.5: 360° VIEWER — TEMPORARILY REMOVED ═══ */}
        {/* <CTDisplayViewer /> */}

        {/* ═══ LAYER 3: MANIFEST-DRIVEN ZONES ═══ */}
        <CTZoneRenderer zones={manifest} debug={debug} handlers={handlers} />

        {/* Audio Visualizer Sidebar */}
        <AudioVisualizerSidebar
          open={eqOpen}
          onClose={() => setEqOpen(false)}
          analyserNode={radio.analyserNode}
          isPlaying={radio.isPlaying}
          onTogglePlay={radio.togglePlay}
        />
      </div>
    </main>
  );
}
