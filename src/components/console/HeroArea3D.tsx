"use client";

import dynamic from "next/dynamic";

const CybertruckThreeViewer = dynamic(
  () => import("@/components/console/CybertruckThreeViewer"),
  {
    ssr: false,
    loading: () => (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 32, height: 32, border: "1px solid rgba(255,255,255,0.1)", borderTopColor: "rgba(74,158,255,0.5)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    ),
  }
);

/**
 * HeroArea3D — Three.js CT model + terrain backdrop
 *
 * Strategy: Show real 3D CT model with art texture on tailgate.
 * Terrain background visible behind. OrbitControls for drag-rotate.
 */

// ── Static hero — always visible ───────────────────────────────────────────

function StaticHero({ artImage, startReveal }: { artImage: string; startReveal: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Background — CT wireframe terrain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/ct-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay to blend with UI chrome */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,22,40,0.5) 0%, rgba(10,22,40,0.2) 40%, rgba(10,22,40,0.3) 70%, rgba(10,22,40,0.6) 100%)",
        }}
      />

      {/* Low-poly terrain mesh — Tron/wireframe meets Hawaiian landscape */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60%",
          pointerEvents: "none",
        }}
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="terrain-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Far range — distant peaks, darkest */}
        <g fill="#0c1424" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5">
          <polygon points="0,200 60,155 120,175 0,200" />
          <polygon points="60,155 120,175 180,140 60,155" />
          <polygon points="120,175 180,140 240,162 120,175" />
          <polygon points="180,140 240,162 300,128 180,140" />
          <polygon points="240,162 300,128 360,152 240,162" />
          <polygon points="300,128 360,152 420,118 300,128" />
          <polygon points="360,152 420,118 480,145 360,152" />
          <polygon points="420,118 480,145 540,110 420,118" />
          <polygon points="480,145 540,110 600,138 480,145" />
          <polygon points="540,110 600,138 660,105 540,110" />
          <polygon points="600,138 660,105 720,132 600,138" />
          <polygon points="660,105 720,132 780,98 660,105" />
          <polygon points="720,132 780,98 840,125 720,132" />
          <polygon points="780,98 840,125 900,108 780,98" />
          <polygon points="840,125 900,108 960,130 840,125" />
          <polygon points="900,108 960,130 1020,115 900,108" />
          <polygon points="960,130 1020,115 1080,138 960,130" />
          <polygon points="1020,115 1080,138 1140,120 1020,115" />
          <polygon points="1080,138 1140,120 1200,142 1080,138" />
          {/* Fill down to base */}
          <polygon points="0,200 120,175 0,400" />
          <polygon points="120,175 240,162 0,400" />
          <polygon points="240,162 360,152 0,400" />
          <polygon points="0,400 360,152 600,138 0,400" />
          <polygon points="0,400 600,138 1200,142 1200,400" />
        </g>

        {/* Mid range — closer ridgeline, slightly lighter */}
        <g fill="#0e1a2e" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5">
          <polygon points="0,260 80,225 160,248" />
          <polygon points="80,225 160,248 200,218" />
          <polygon points="160,248 200,218 280,240" />
          <polygon points="200,218 280,240 340,210" />
          <polygon points="280,240 340,210 400,235" />
          <polygon points="340,210 400,235 460,200" />
          <polygon points="400,235 460,200 520,228" />
          <polygon points="460,200 520,228 580,195" />
          <polygon points="520,228 580,195 640,222" />
          <polygon points="580,195 640,222 700,188" />
          <polygon points="640,222 700,188 760,215" />
          <polygon points="700,188 760,215 820,195" />
          <polygon points="760,215 820,195 880,220" />
          <polygon points="820,195 880,220 940,202" />
          <polygon points="880,220 940,202 1000,225" />
          <polygon points="940,202 1000,225 1060,208" />
          <polygon points="1000,225 1060,208 1120,230" />
          <polygon points="1060,208 1120,230 1200,215" />
          {/* Fill triangles connecting mid to base */}
          <polygon points="0,260 160,248 80,290" />
          <polygon points="160,248 80,290 240,285" />
          <polygon points="160,248 280,240 240,285" />
          <polygon points="280,240 240,285 400,280" />
          <polygon points="280,240 400,235 400,280" />
          <polygon points="400,235 400,280 560,275" />
          <polygon points="400,235 520,228 560,275" />
          <polygon points="520,228 560,275 680,270" />
          <polygon points="520,228 640,222 680,270" />
          <polygon points="640,222 680,270 800,268" />
          <polygon points="640,222 760,215 800,268" />
          <polygon points="760,215 800,268 920,272" />
          <polygon points="760,215 880,220 920,272" />
          <polygon points="880,220 920,272 1060,275" />
          <polygon points="880,220 1000,225 1060,275" />
          <polygon points="1000,225 1060,275 1200,270" />
          <polygon points="1000,225 1200,215 1200,270" />
        </g>

        {/* Near range — foreground terrain, lightest facets */}
        <g stroke="rgba(255,255,255,0.07)" strokeWidth="0.5">
          <polygon points="0,310 80,290 160,305" fill="#10182e" />
          <polygon points="80,290 160,305 240,285" fill="#0f1a2c" />
          <polygon points="160,305 240,285 320,300" fill="#111d30" />
          <polygon points="240,285 320,300 400,280" fill="#0f1a2c" />
          <polygon points="320,300 400,280 480,298" fill="#10182e" />
          <polygon points="400,280 480,298 560,275" fill="#0e1a2e" />
          <polygon points="480,298 560,275 640,295" fill="#111d30" />
          <polygon points="560,275 640,295 720,278" fill="#10182e" />
          <polygon points="640,295 720,278 800,292" fill="#0f1a2c" />
          <polygon points="720,278 800,292 880,275" fill="#10182e" />
          <polygon points="800,292 880,275 960,290" fill="#111d30" />
          <polygon points="880,275 960,290 1040,278" fill="#0f1a2c" />
          <polygon points="960,290 1040,278 1120,295" fill="#10182e" />
          <polygon points="1040,278 1120,295 1200,282" fill="#0e1a2e" />
          {/* Bottom fill to viewport edge */}
          <polygon points="0,310 160,305 0,400" fill="#111d30" />
          <polygon points="160,305 320,300 0,400" fill="#10182e" />
          <polygon points="0,400 320,300 480,298" fill="#0f1a2c" />
          <polygon points="0,400 480,298 720,278 1200,282 1200,400" fill="#10182e" />
        </g>

        {/* Wireframe highlight overlay — subtle edge glow */}
        <g fill="none" stroke="url(#terrain-fade)" strokeWidth="0.8">
          <polyline points="0,260 80,225 200,218 340,210 460,200 580,195 700,188 820,195 940,202 1060,208 1200,215" />
          <polyline points="0,310 80,290 240,285 400,280 560,275 720,278 880,275 1040,278 1200,282" />
        </g>
      </svg>

      {/* Grid floor — perspective wireframe (CT reference: visible under truck) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-30%",
          right: "-30%",
          height: "45%",
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          transform: "perspective(300px) rotateX(62deg)",
          transformOrigin: "bottom center",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Three.js Cybertruck model — art on tailgate */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
        }}
      >
        <CybertruckThreeViewer artImage={artImage} startReveal={startReveal} />
      </div>

      {/* CT-style line connector labels (bold italic + vertical line) */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
        {/* Left: "Browse Gallery" — connects to front */}
        <div style={{ position: "absolute", left: "22%", top: "18%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, fontStyle: "italic", color: "rgba(255,255,255,0.6)", fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif", letterSpacing: "0.01em", marginBottom: 4 }}>
            <span style={{ fontSize: 9, fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 1 }}>Open</span>
            Browse Gallery
          </span>
          <div style={{ width: 1, height: 50, background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Center: "See Editions" — connects to tonneau */}
        <div style={{ position: "absolute", left: "52%", top: "14%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, fontStyle: "italic", color: "rgba(255,255,255,0.6)", fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif", letterSpacing: "0.01em", marginBottom: 4 }}>
            <span style={{ fontSize: 9, fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 1 }}>Open</span>
            See Editions
          </span>
          <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Right: "Tailgate Art" — connects to rear */}
        <div style={{ position: "absolute", right: "18%", top: "16%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, fontStyle: "italic", color: "rgba(255,255,255,0.6)", fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif", letterSpacing: "0.01em", marginBottom: 4 }}>
            <span style={{ fontSize: 9, fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 1 }}>Open</span>
            Tailgate Art
          </span>
          <div style={{ width: 1, height: 55, background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Bottom-left: "Art Scale" (CT: "Ride Height") */}
        <div style={{ position: "absolute", left: "30%", bottom: "18%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.12)" }} />
          <span style={{ fontSize: 9, fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.35)", fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif", marginTop: 3 }}>Medium</span>
          <span style={{ fontSize: 11, fontWeight: 700, fontStyle: "italic", color: "rgba(255,255,255,0.55)", fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif" }}>Art Scale</span>
        </div>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

interface HeroArea3DProps {
  artImage?: string;
  startReveal?: boolean;
}

export default function HeroArea3D({ artImage = "/images/mahalo-bird/electric-prr-hummingbird.jpg", startReveal = false }: HeroArea3DProps) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <StaticHero artImage={artImage} startReveal={startReveal} />

      {/* FIX #5: Caption more prominent + FIX #6: larger dots */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 20,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {/* FIX #5: More prominent caption */}
        <span
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          Mahalo Bird · Edition I
        </span>

        {/* FIX #6: Larger dot pagination */}
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />
        </div>

        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.08em",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          3 of 10 · @Maui_PremiumArt
        </span>
      </div>

      {/* Attribution */}
      <div
        style={{
          position: "absolute",
          bottom: 6,
          right: 10,
          fontSize: 9,
          color: "rgba(255,255,255,0.15)",
          letterSpacing: "0.02em",
          zIndex: 20,
          pointerEvents: "none",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        Art by{" "}
        <span style={{ color: "rgba(255,255,255,0.22)" }}>Hulali Lā</span>
        {" "}· mauipremiumart.com
      </div>
    </div>
  );
}
