"use client";

/**
 * Maui Premium Art — Homepage
 * 
 * CT Display translated from screenshot to real HTML.
 * Every element is a real DOM node at the exact pixel position
 * extracted from the 2560x1440 CID screenshot.
 * 
 * Layout: 16:9 container, percentage-based positioning.
 * Background: CT terrain (from screenshot, will be replaced by panorama).
 * All UI elements: real divs, real text, real buttons.
 */

export default function Home() {
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

        {/* ═══ LAYER 3: ACTION ZONES ═══
            Transparent clickable areas over CT controls.
            CT pixels show through. Cursor changes on hover.
            Each zone wired to a handler (empty for now). */}

        {/* — STATUS BAR — */}
        <div title="P R N D" style={{ position:"absolute", left:"1.56%", top:"3.33%", width:"8.16%", height:"0.76%", cursor:"default", zIndex:5 }} />
        <div title="200 mi" style={{ position:"absolute", left:"6.33%", top:"3.33%", width:"3.4%", height:"0.76%", cursor:"default", zIndex:5 }} />

        {/* — LEFT CONTROLS — */}
        <div title="Start Self-Driving" style={{ position:"absolute", left:"2.15%", top:"8.19%", width:"17.03%", height:"6.32%", cursor:"pointer", zIndex:5 }} />
        <div title="Ride Height" style={{ position:"absolute", left:"5.08%", top:"44.44%", width:"14.41%", height:"4.72%", cursor:"pointer", zIndex:5 }} />
        <div title="PARK" style={{ position:"absolute", left:"2.81%", top:"31.87%", width:"1.29%", height:"2%", cursor:"default", zIndex:5 }} />

        {/* — FLOATING LABELS — */}
        <div title="Open Frunk" style={{ position:"absolute", left:"26.29%", top:"25.21%", width:"2.97%", height:"3.54%", cursor:"pointer", zIndex:5 }} />
        <div title="Open Tonneau" style={{ position:"absolute", left:"60.04%", top:"18.75%", width:"4.41%", height:"3.54%", cursor:"pointer", zIndex:5 }} />
        <div title="Open Tailgate" style={{ position:"absolute", left:"74.41%", top:"27.29%", width:"4.1%", height:"3.89%", cursor:"pointer", zIndex:5 }} />

        {/* — MEDIA PLAYER CONTROLS — */}
        <div title="Menu" style={{ position:"absolute", left:"20.08%", top:"73.89%", width:"0.98%", height:"1.74%", cursor:"pointer", zIndex:5 }} />
        <div title="Album Art" style={{ position:"absolute", left:"21.09%", top:"73.61%", width:"7.38%", height:"12.43%", cursor:"pointer", zIndex:5 }} />
        <div title="Previous" style={{ position:"absolute", left:"30%", top:"83%", width:"3%", height:"3.5%", cursor:"pointer", zIndex:5 }} />
        <div title="Play" style={{ position:"absolute", left:"36%", top:"83%", width:"3%", height:"3.5%", cursor:"pointer", zIndex:5 }} />
        <div title="Next" style={{ position:"absolute", left:"42%", top:"83%", width:"3%", height:"3.5%", cursor:"pointer", zIndex:5 }} />
        <div title="Equalizer" style={{ position:"absolute", left:"42.97%", top:"84.24%", width:"2.5%", height:"2.5%", cursor:"pointer", zIndex:5 }} />
        <div title="Search" style={{ position:"absolute", left:"48.71%", top:"84.17%", width:"2.5%", height:"2.5%", cursor:"pointer", zIndex:5 }} />

        {/* — NAVIGATE WIDGET — */}
        <div title="Navigate" style={{ position:"absolute", left:"61.52%", top:"75.35%", width:"6%", height:"2.5%", cursor:"pointer", zIndex:5 }} />
        <div title="Home" style={{ position:"absolute", left:"62.7%", top:"83.75%", width:"4.8%", height:"1.94%", cursor:"pointer", zIndex:5 }} />
        <div title="Work" style={{ position:"absolute", left:"73.32%", top:"83.75%", width:"4.38%", height:"1.94%", cursor:"pointer", zIndex:5 }} />

        {/* — DOCK BAR — */}
        <div title="Vehicle" style={{ position:"absolute", left:"1.6%", top:"94.51%", width:"1.84%", height:"2.57%", cursor:"pointer", zIndex:5 }} />
        <div title="Temperature Down" style={{ position:"absolute", left:"12.66%", top:"95.07%", width:"1.5%", height:"1.53%", cursor:"pointer", zIndex:5 }} />
        <div title="71°" style={{ position:"absolute", left:"16.52%", top:"94.72%", width:"2.03%", height:"2.43%", cursor:"default", zIndex:5 }} />
        <div title="Temperature Up" style={{ position:"absolute", left:"22.07%", top:"95%", width:"1.5%", height:"1.6%", cursor:"pointer", zIndex:5 }} />
        <div title="Sentry" style={{ position:"absolute", left:"31.95%", top:"94.72%", width:"1.84%", height:"2.5%", cursor:"pointer", zIndex:5 }} />
        <div title="Phone" style={{ position:"absolute", left:"36.99%", top:"94.44%", width:"2%", height:"2.57%", cursor:"pointer", zIndex:5 }} />
        <div title="Climate" style={{ position:"absolute", left:"41.52%", top:"94.1%", width:"2.23%", height:"3.4%", cursor:"pointer", zIndex:5 }} />
        <div title="Toybox" style={{ position:"absolute", left:"46.56%", top:"94.1%", width:"2.11%", height:"3.4%", cursor:"pointer", zIndex:5 }} />
        <div title="Apps" style={{ position:"absolute", left:"51.56%", top:"94.31%", width:"1.68%", height:"2.99%", cursor:"pointer", zIndex:5 }} />
        <div title="Events" style={{ position:"absolute", left:"56.33%", top:"94.1%", width:"1.45%", height:"3.4%", cursor:"pointer", zIndex:5 }} />
        <div title="Map" style={{ position:"absolute", left:"61.21%", top:"94.1%", width:"1.91%", height:"3.4%", cursor:"pointer", zIndex:5 }} />
        <div title="Energy" style={{ position:"absolute", left:"66.09%", top:"94.1%", width:"1.91%", height:"3.4%", cursor:"pointer", zIndex:5 }} />
        <div title="Volume Down" style={{ position:"absolute", left:"77.5%", top:"95.07%", width:"1.5%", height:"1.53%", cursor:"pointer", zIndex:5 }} />
        <div title="Volume" style={{ position:"absolute", left:"81.76%", top:"95.14%", width:"1.25%", height:"1.32%", cursor:"pointer", zIndex:5 }} />
        <div title="Volume Up" style={{ position:"absolute", left:"86.88%", top:"95%", width:"1.5%", height:"1.6%", cursor:"pointer", zIndex:5 }} />

      </div>
    </main>
  );
}
