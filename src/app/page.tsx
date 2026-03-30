"use client";

/**
 * Maui Premium Art — Homepage
 * 
 * The website IS the Cybertruck display.
 * Source: Real CID screenshot from Tesla Toolbox 3 (2560×1440)
 * 
 * Phase 1: Just the real display. No overlays. No fake components.
 * We add interactivity one element at a time on top of the real pixels.
 */

export default function Home() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        background: "#0a0c10",
      }}
    >
      {/* THE REAL CT DISPLAY — full bleed, nothing else */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/ct-display-real.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </main>
  );
}
