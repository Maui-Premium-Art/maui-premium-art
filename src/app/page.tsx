"use client";

import { useState, useEffect } from "react";
import CTDisplayViewer from "@/components/CTDisplayViewer";

/**
 * Maui Premium Art — Homepage
 * 
 * CT Display translated from screenshot to real HTML.
 * Every element is a real DOM node at the exact pixel position
 * extracted from the 2560x1440 CID screenshot.
 * 
 * Debug mode: ?debug=true or press D key
 * Shows red outlines on all action/data zones.
 */

export default function Home() {
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    // Check URL param
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "true") setDebug(true);

    // D key toggle
    const handler = (e: KeyboardEvent) => {
      if (e.key === "d" || e.key === "D") setDebug(prev => !prev);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Debug style for action zones
  const z = (title: string, left: string, top: string, width: string, height: string, pointer = true) => ({
    position: "absolute" as const,
    left, top, width, height,
    cursor: pointer ? "pointer" : "default",
    zIndex: 5,
    title,
    ...(debug ? {
      outline: "1px solid rgba(255,0,0,0.7)",
      backgroundColor: "rgba(255,0,0,0.08)",
    } : {}),
  });

  // Debug label (only visible in debug mode)
  const Label = ({ text, left, top }: { text: string; left: string; top: string }) => (
    debug ? (
      <div style={{
        position: "absolute", left, top, zIndex: 20,
        fontSize: 9, color: "#ff3333", fontFamily: "monospace",
        background: "rgba(0,0,0,0.85)", padding: "1px 4px",
        borderRadius: 2, whiteSpace: "nowrap", pointerEvents: "none",
        transform: "translateY(-100%)",
      }}>{text}</div>
    ) : null
  );
  return (
    <main style={{
      width: "100vw", height: "100dvh",
      background: "#0a0c10",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* 16:9 container — the CT display */}
      <div id="ct-display" style={{
        position: "relative",
        width: "100%",
        maxWidth: "calc(100dvh * 16 / 9)",
        aspectRatio: "16/9",
        background: "#0a0c10",
        overflow: "hidden",
      }}>
        {/* ═══ LAYER 1: CT BACKGROUND (terrain) ═══
            For now: the full screenshot. 
            Future: extracted terrain panorama from capture sessions. */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/ct-display-real.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }} />

        {/* ═══ LAYER 1.5: 360° VIEWER (over background, under zones) ═══ */}
        <CTDisplayViewer />

        {/* ═══ LAYER 2: DATA ZONES ═══
            These are the areas where content changes.
            For now: empty/transparent (screenshot shows through).
            When wired: text, images, dynamic data render here.
            Each zone matches exact CT element positions from manifest. */}

        {/* Media player: album art (data zone — will show our art) */}
        {/* x=21.09% y=73.61% w=7.38% h=12.43% */}

        {/* Media player: title text (data zone — will show track name) */}
        {/* x=29.30% y=74.93% w=8.75% h=1.67% */}

        {/* Navigate: search text (data zone) */}
        {/* x=63.75% y=75.56% w=4.53% h=1.81% */}

        {/* ═══ LAYER 3: ACTION ZONES ═══ */}

        {/* — STATUS BAR — */}
        <Label text="prnd" left="1.56%" top="3.33%" />
        <div style={z("P R N D", "1.56%", "3.33%", "8.16%", "1.5%", false)} />
        <Label text="miles" left="9.61%" top="3.33%" />
        <div style={z("200 mi", "9.61%", "3.33%", "3.55%", "1.5%", false)} />
        <Label text="status_icons" left="47.42%" top="3.26%" />
        <div style={z("Status Icons", "47.42%", "3.26%", "8.63%", "1.5%", false)} />
        <Label text="time" left="89.64%" top="3.36%" />
        <div style={z("21:55", "89.64%", "3.36%", "3.85%", "2.04%", false)} />
        <Label text="temp" left="93.94%" top="3.22%" />
        <div style={z("70°F", "93.94%", "3.22%", "4.25%", "2.04%", false)} />

        {/* — LEFT CONTROLS — */}
        <Label text="fsd_button" left="6.55%" top="8.19%" />
        <div style={z("Start Self-Driving", "6.55%", "8.19%", "12.63%", "7.74%")} />
        <Label text="direction_text" left="2.81%" top="19.38%" />
        <div style={z("Choose direction", "2.81%", "19.38%", "12%", "2%", false)} />
        <Label text="ride_height_dots" left="1.52%" top="8.19%" />
        <div style={z("Ride Height Dots", "1.52%", "8.19%", "1.56%", "29.38%")} />
        <Label text="park" left="2.81%" top="31%" />
        <div style={z("PARK", "2.81%", "31%", "3%", "2.5%", false)} />
        <Label text="headlights" left="2.77%" top="34.58%" />
        <div style={z("Headlights", "2.77%", "34.58%", "2%", "2%")} />
        <Label text="ride_height" left="5.08%" top="44.44%" />
        <div style={z("Ride Height", "5.08%", "44.44%", "14.41%", "4.72%")} />

        {/* — FLOATING LABELS — */}
        <Label text="label_frunk" left="26.19%" top="24.68%" />
        <div style={z("Open Frunk", "26.19%", "24.68%", "3.77%", "4.78%")} />
        <Label text="label_tonneau" left="59.74%" top="18.39%" />
        <div style={z("Open Tonneau", "59.74%", "18.39%", "5.01%", "4.43%")} />
        <Label text="label_tailgate" left="74.21%" top="26.93%" />
        <div style={z("Open Tailgate", "74.21%", "26.93%", "4.8%", "4.43%")} />

        {/* — COMPASS — */}
        <Label text="compass" left="87.4%" top="19.89%" />
        <div style={z("Compass", "87.4%", "19.89%", "2.1%", "4.25%", false)} />

        {/* — MEDIA PLAYER — */}
        <Label text="media_card" left="19.07%" top="72.22%" />
        <div style={z("Media Card", "19.07%", "72.22%", "39.11%", "16.58%", false)} />
        <Label text="media_hamburger" left="19.5%" top="73.5%" />
        <div style={z("Menu", "19.5%", "73.5%", "1.8%", "2.5%")} />
        <Label text="media_album_art" left="19.2%" top="72.34%" />
        <div style={z("Album Art", "19.2%", "72.34%", "9.3%", "16.26%")} />
        <Label text="media_title" left="29.6%" top="74.5%" />
        <div style={z("Track Title", "29.6%", "74.5%", "28%", "3.5%", false)} />
        <Label text="media_prev" left="29.5%" top="82.5%" />
        <div style={z("Previous", "29.5%", "82.5%", "5.5%", "5%")} />
        <Label text="media_play" left="35.5%" top="82.5%" />
        <div style={z("Play", "35.5%", "82.5%", "5.5%", "5%")} />
        <Label text="media_next" left="41.5%" top="82.5%" />
        <div style={z("Next", "41.5%", "82.5%", "5.5%", "5%")} />
        <Label text="media_eq" left="47.5%" top="82.5%" />
        <div style={z("Equalizer", "47.5%", "82.5%", "5.5%", "5%")} />
        <Label text="media_search" left="53.5%" top="82.5%" />
        <div style={z("Search", "53.5%", "82.5%", "4%", "5%")} />

        {/* — NAVIGATE WIDGET — */}
        <Label text="nav_card" left="60.14%" top="72.04%" />
        <div style={z("Navigate Card", "60.14%", "72.04%", "25.35%", "16.76%", false)} />
        <Label text="nav_search" left="60.82%" top="74.46%" />
        <div style={z("Navigate", "60.82%", "74.46%", "18.3%", "3.57%")} />
        <Label text="nav_home" left="62.4%" top="82.33%" />
        <div style={z("Home", "62.4%", "82.33%", "6%", "4.6%")} />
        <Label text="nav_work" left="72.52%" top="82.15%" />
        <div style={z("Work", "72.52%", "82.15%", "6.08%", "4.6%")} />

        {/* — DOCK BAR — */}
        <Label text="dock_vehicle" left="1.6%" top="94.51%" />
        <div style={z("Vehicle", "1.6%", "94.51%", "2.5%", "3%")} />
        <Label text="dock_temp_dn" left="12.66%" top="95.07%" />
        <div style={z("Temp Down", "12.66%", "95.07%", "2%", "2%")} />
        <Label text="dock_temp" left="16.52%" top="94.72%" />
        <div style={z("71°", "16.52%", "94.72%", "2.03%", "2.43%", false)} />
        <Label text="dock_temp_up" left="22.07%" top="95%" />
        <div style={z("Temp Up", "22.07%", "95%", "2%", "2%")} />
        <Label text="dock_sentry" left="31.95%" top="94.72%" />
        <div style={z("Sentry", "31.95%", "94.72%", "2.5%", "3%")} />
        <Label text="dock_phone" left="36.99%" top="94.44%" />
        <div style={z("Phone", "36.99%", "94.44%", "2.5%", "3%")} />
        <Label text="dock_climate" left="41.52%" top="94.1%" />
        <div style={z("Climate", "41.52%", "94.1%", "2.5%", "3.5%")} />
        <Label text="dock_toybox" left="46.56%" top="94.1%" />
        <div style={z("Toybox", "46.56%", "94.1%", "2.5%", "3.5%")} />
        <Label text="dock_apps" left="51.56%" top="94.31%" />
        <div style={z("Apps", "51.56%", "94.31%", "2.5%", "3%")} />
        <Label text="dock_events" left="56.33%" top="94.1%" />
        <div style={z("Events", "56.33%", "94.1%", "2.5%", "3.5%")} />
        <Label text="dock_map" left="61.21%" top="94.1%" />
        <div style={z("Map", "61.21%", "94.1%", "2.5%", "3.5%")} />
        <Label text="dock_energy" left="66.09%" top="94.1%" />
        <div style={z("Energy", "66.09%", "94.1%", "2.5%", "3.5%")} />
        <Label text="dock_vol_dn" left="77.5%" top="95.07%" />
        <div style={z("Vol Down", "77.5%", "95.07%", "2%", "2%")} />
        <Label text="dock_vol" left="81.76%" top="95.14%" />
        <div style={z("Volume", "81.76%", "95.14%", "1.5%", "1.5%", false)} />
        <Label text="dock_vol_up" left="86.88%" top="95%" />
        <div style={z("Vol Up", "86.88%", "95%", "2%", "2%")} />

        {/* — AIRBAG INDICATOR — */}
        <Label text="airbag" left="94%" top="94%" />
        <div style={z("Passenger Airbag Off", "94%", "94%", "5%", "4%", false)} />

        {/* Debug mode indicator */}
        {debug && (
          <div style={{
            position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
            zIndex: 30, fontSize: 11, fontFamily: "monospace",
            color: "#ff3333", background: "rgba(0,0,0,0.9)",
            padding: "4px 12px", borderRadius: 4,
            border: "1px solid rgba(255,0,0,0.3)",
          }}>
            DEBUG MODE — press D to toggle — 48 zones mapped
          </div>
        )}

      </div>
    </main>
  );
}
