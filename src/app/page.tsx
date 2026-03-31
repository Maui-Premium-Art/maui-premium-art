"use client";

import { useState, useEffect } from "react";
import { useHawaiianRadio } from "@/hooks/useHawaiianRadio";
// import CTDisplayViewer from "@/components/CTDisplayViewer"; // REMOVED — Boss: clear 3D model for template editing

/**
 * Maui Premium Art — Homepage
 * 
 * CT Display translated from screenshot to real HTML.
 * Every element is a real DOM node at the exact pixel position
 * extracted from the 2560x1440 CID screenshot.
 * 
 * Debug mode: ?debug=true or press D key
 * Shows red outlines on all action/data zones.
 * 
 * Zone positions: CT Zone Editor v3 export (Mar 31, 2026)
 */

export default function Home() {
  const [debug, setDebug] = useState(false);
  const radio = useHawaiianRadio();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "true") setDebug(true);
    const handler = (e: KeyboardEvent) => {
      if (e.key === "d" || e.key === "D") setDebug(prev => !prev);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
      <div id="ct-display" style={{
        position: "relative",
        width: "100%",
        maxWidth: "calc(100dvh * 16 / 9)",
        aspectRatio: "16/9",
        background: "#0a0c10",
        overflow: "hidden",
      }}>
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

        {/* ═══ LAYER 3: ACTION ZONES (CT Zone Editor v3) ═══ */}

        {/* — STATUS BAR — */}
        <Label text="prnd" left="1.16%" top="2.97%" />
        <div style={z("P R N D", "1.16%", "2.97%", "8.25%", "2.04%", false)} />
        <Label text="miles" left="9.2%" top="2.97%" />
        <div style={z("200 mi", "9.2%", "2.97%", "3.96%", "2.04%", false)} />
        <Label text="status_icons" left="46.71%" top="2.97%" />
        <div style={z("Status Icons", "46.71%", "2.97%", "10.26%", "2.04%", false)} />
        <Label text="time" left="89.64%" top="2.97%" />
        <div style={z("21:55", "89.64%", "2.97%", "3.85%", "2.04%", false)} />
        <Label text="temp" left="93.94%" top="2.97%" />
        <div style={z("70°F", "93.94%", "2.97%", "4.25%", "2.04%", false)} />

        {/* — LEFT CONTROLS — */}
        <Label text="fsd_button" left="6.55%" top="8.19%" />
        <div style={z("Start Self-Driving", "6.55%", "8.19%", "12.63%", "7.74%")} />
        <Label text="direction_text" left="2.81%" top="19.38%" />
        <div style={z("Choose direction", "2.81%", "19.38%", "12%", "2%", false)} />
        <Label text="ride_height_dots" left="1.11%" top="7.46%" />
        <div style={z("Ride Height Dots", "1.11%", "7.46%", "3.4%", "35.39%")} />
        <Label text="park" left="6.08%" top="38.26%" />
        <div style={z("PARK", "6.08%", "38.26%", "3%", "2.5%", false)} />
        <Label text="headlights" left="6.24%" top="38.26%" />
        <div style={z("Headlights", "6.24%", "38.26%", "2.61%", "2.5%")} />
        <Label text="ride_height" left="11.53%" top="49.08%" />
        <div style={z("Ride Height", "11.53%", "49.08%", "7.35%", "4.72%")} />

        {/* — CUSTOM ZONES — */}
        <Label text="custom_1" left="6.84%" top="24.92%" />
        <div style={z("New Zone", "6.84%", "24.92%", "15.31%", "2.9%")} />
        <Label text="custom_2" left="6.12%" top="38.26%" />
        <div style={z("New Zone", "6.12%", "38.26%", "3.27%", "2.5%")} />
        <Label text="custom_3" left="6.22%" top="38.26%" />
        <div style={z("New Zone", "6.22%", "38.26%", "3.06%", "2.5%")} />

        {/* — FLOATING LABELS — */}
        <Label text="label_frunk" left="26.19%" top="24.68%" />
        <div style={z("Open Frunk", "26.19%", "24.68%", "3.77%", "4.78%")} />
        <Label text="label_tonneau" left="59.74%" top="18.39%" />
        <div style={z("Open Tonneau", "59.74%", "18.39%", "5.01%", "4.43%")} />
        <Label text="label_tailgate" left="74.21%" top="26.93%" />
        <div style={z("Open Tailgate", "74.21%", "26.93%", "4.8%", "4.43%")} />

        {/* — COMPASS — */}
        <Label text="compass" left="87.5%" top="19.64%" />
        <div style={z("Compass", "87.5%", "19.64%", "2.1%", "4.25%", false)} />

        {/* — MEDIA PLAYER (wired to Hawaiian Radio) — */}
        <Label text="media_card" left="19.07%" top="72.22%" />
        <div style={z("Media Card", "19.07%", "72.22%", "39.11%", "16.58%", false)} />
        <Label text="media_hamburger" left="19.5%" top="73.5%" />
        <div style={z("Menu", "19.5%", "73.5%", "1.8%", "2.5%")} />

        {/* Album Art — real image over screenshot */}
        <Label text="media_album_art" left="19.2%" top="72.34%" />
        <div style={z("Album Art", "19.2%", "72.34%", "9.3%", "16.26%")} onClick={radio.togglePlay}>
          <img
            src={radio.currentTrack.artworkImage}
            alt={radio.currentTrack.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2, display: "block" }}
          />
        </div>

        {/* Track title — real text over screenshot, solid bg to cover "Khris's iPhone" */}
        <Label text="media_title" left="29.6%" top="74.5%" />
        <div style={{...z("Track Title", "29.6%", "74.5%", "28%", "3.5%", false), display: "flex", alignItems: "center", gap: 6, overflow: "hidden", background: "#16181e", paddingLeft: 6, paddingRight: 6}}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", flexShrink: 0 }} />
          <span style={{ color: "#fff", fontSize: "clamp(9px, 1.1vw, 14px)", fontFamily: "'Blender-TSL Medium', system-ui, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {radio.currentTrack.title}
          </span>
        </div>

        {/* Artist name — second line under title */}
        <div style={{...z("Artist", "29.6%", "78%", "28%", "2.5%", false), display: "flex", alignItems: "center", gap: 5, overflow: "hidden", background: "#16181e", paddingLeft: 6}}>
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(7px, 0.85vw, 11px)", fontFamily: "'Blender-TSL Medium', system-ui, sans-serif", whiteSpace: "nowrap" }}>
            {radio.currentTrack.artist}
          </span>
        </div>

        {/* Playback controls — wired with icon overlays */}
        <Label text="media_prev" left="29.5%" top="82.5%" />
        <div style={z("Previous", "29.5%", "82.5%", "5.5%", "5%")} onClick={radio.prevTrack} />
        <Label text="media_play" left="35.5%" top="82.5%" />
        <div style={{...z(radio.isPlaying ? "Pause" : "Play", "35.5%", "82.5%", "5.5%", "5%"), display: "flex", alignItems: "center", justifyContent: "center"}} onClick={radio.togglePlay}>
          {radio.isPlaying && (
            <svg width="16" height="18" viewBox="0 0 12 14" fill="rgba(255,255,255,0.85)" style={{ position: "relative", zIndex: 6 }}>
              <rect x="1" y="1" width="3.5" height="12" rx="0.8" />
              <rect x="7.5" y="1" width="3.5" height="12" rx="0.8" />
            </svg>
          )}
        </div>
        <Label text="media_next" left="41.5%" top="82.5%" />
        <div style={z("Next", "41.5%", "82.5%", "5.5%", "5%")} onClick={radio.nextTrack} />
        <Label text="media_eq" left="47.5%" top="82.5%" />
        <div style={z("Equalizer", "47.5%", "82.5%", "5.5%", "5%")} />
        <Label text="media_search" left="53.5%" top="82.5%" />
        <div style={z("Search", "53.5%", "82.5%", "4%", "5%")} />

        {/* — NAVIGATE WIDGET — */}
        <Label text="nav_card" left="60.14%" top="72.22%" />
        <div style={z("Navigate Card", "60.14%", "72.22%", "25.35%", "16.58%", false)} />
        <Label text="nav_search" left="60.82%" top="74.5%" />
        <div style={z("Navigate", "60.82%", "74.5%", "18.3%", "3.5%")} />
        <Label text="nav_home" left="62.4%" top="82.33%" />
        <div style={z("Home", "62.4%", "82.33%", "6%", "4.6%")} />
        <Label text="nav_work" left="72.52%" top="82.33%" />
        <div style={z("Work", "72.52%", "82.33%", "6.08%", "4.6%")} />

        {/* — DOCK BAR — */}
        <Label text="dock_vehicle" left="1.6%" top="94.51%" />
        <div style={z("Vehicle", "1.6%", "94.51%", "2.5%", "3%")} />
        <Label text="dock_temp_dn" left="12.66%" top="95.07%" />
        <div style={z("Temp Down", "12.66%", "95.07%", "2%", "2%")} />
        <Label text="dock_temp" left="16.52%" top="95.07%" />
        <div style={z("71°", "16.52%", "95.07%", "2.03%", "2%", false)} />
        <Label text="dock_temp_up" left="22.07%" top="95.07%" />
        <div style={z("Temp Up", "22.07%", "95.07%", "2%", "2%")} />
        <Label text="dock_sentry" left="31.95%" top="94.72%" />
        <div style={z("Sentry", "31.95%", "94.72%", "2.5%", "3%")} />
        <Label text="dock_phone" left="36.99%" top="94.44%" />
        <div style={z("Phone", "36.99%", "94.44%", "2.5%", "3%")} />
        <Label text="dock_climate" left="41.52%" top="94.44%" />
        <div style={z("Climate", "41.52%", "94.44%", "2.5%", "3%")} />
        <Label text="dock_toybox" left="46.56%" top="94.44%" />
        <div style={z("Toybox", "46.56%", "94.44%", "2.5%", "3%")} />
        <Label text="dock_apps" left="51.56%" top="94.44%" />
        <div style={z("Apps", "51.56%", "94.44%", "2.5%", "3%")} />
        <Label text="dock_events" left="56.33%" top="94.44%" />
        <div style={z("Events", "56.33%", "94.44%", "2.5%", "3%")} />
        <Label text="dock_map" left="61.21%" top="94.44%" />
        <div style={z("Map", "61.21%", "94.44%", "2.5%", "3%")} />
        <Label text="dock_energy" left="66.09%" top="94.1%" />
        <div style={z("Energy", "66.09%", "94.1%", "2.5%", "3.5%")} />
        <Label text="dock_vol_dn" left="77.5%" top="95.07%" />
        <div style={z("Vol Down", "77.5%", "95.07%", "2%", "2%")} onClick={radio.volumeDown} />
        <Label text="dock_vol" left="81.76%" top="95.07%" />
        <div style={z("Volume", "81.76%", "95.07%", "1.5%", "2%", false)} />
        <Label text="dock_vol_up" left="86.88%" top="95.07%" />
        <div style={z("Vol Up", "86.88%", "95.07%", "2%", "2%")} onClick={radio.volumeUp} />

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
            DEBUG MODE — press D to toggle — 47 zones mapped
          </div>
        )}

      </div>
    </main>
  );
}
