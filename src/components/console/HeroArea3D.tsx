"use client";

/**
 * HeroArea3D — CT-style hero with static photo + optional 3D upgrade
 *
 * 3D model: Tesla Cybertruck by onurpearl (Sketchfab)
 * License: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
 *
 * Strategy: Always show a great static photo. Never show a black hole.
 * 3D loads on top ONLY after the truck mesh is confirmed in the scene.
 */

// 3D disabled for v1 — static photo hero
// CybertruckScene re-enabled in Phase 1a

// ── Static hero — always visible ───────────────────────────────────────────

function StaticHero() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Sky gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #05050a 0%, #080810 40%, #0a0a0f 60%, #080810 100%)",
        }}
      />

      {/* Mountain silhouette */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "55%",
          pointerEvents: "none",
        }}
        viewBox="0 0 1200 350"
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          d="M0 350 L0 200 L80 170 L160 190 L240 155 L320 178 L400 145 L480 168 L560 132 L640 155 L720 128 L800 150 L880 128 L960 148 L1040 135 L1120 158 L1200 142 L1200 350 Z"
          fill="#0f0f1a"
        />
        <path
          d="M0 350 L0 250 L100 225 L200 240 L300 215 L400 232 L500 205 L600 225 L700 200 L800 220 L900 198 L1000 218 L1100 205 L1200 222 L1200 350 Z"
          fill="#0c0c16"
        />
        <path
          d="M0 350 L0 295 L150 278 L300 288 L450 272 L600 285 L750 270 L900 283 L1050 270 L1200 282 L1200 350 Z"
          fill="#090912"
        />
      </svg>

      {/* Grid floor — perspective */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-30%",
          right: "-30%",
          height: "38%",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          transform: "perspective(280px) rotateX(62deg)",
          transformOrigin: "bottom center",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero image — Mahalo Bird on CT tailgate */}
      {/* Using CSS background-image (avoids Next.js Image fill height requirements) */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(620px, 92vw)",
          height: "min(348px, 51.75vw)",  /* 16:9 ratio of width */
          zIndex: 2,
          backgroundImage: "url('/images/mahalo-bird/electric-prr-hummingbird.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
          borderRadius: 4,
          filter: "brightness(0.9) contrast(1.04) saturate(1.05)",
        }}
      >
        {/* Dark vignette — blends into background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 4,
            background:
              "linear-gradient(to bottom, rgba(5,5,10,0.35) 0%, transparent 25%, transparent 65%, rgba(5,5,10,0.6) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export default function HeroArea3D() {
  // 3D disabled for v1 — static photo is the hero, 3D comes in Phase 1a
  const showWebGL = false;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Static hero — always visible, shown immediately */}
      <StaticHero />

      {/* 3D overlay disabled for v1 — Phase 1a */}

      {/* Art caption — bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
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
        {/* Title */}
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 500,
          }}
        >
          Mahalo Bird · Edition I
        </span>

        {/* Dot pagination */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.75)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }} />
        </div>

        {/* 3 of 10 by @handle */}
        <span
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.08em",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          3 of 10 · @Maui_PremiumArt
        </span>
      </div>

      {/* CC attribution — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 10,
          fontSize: 9,
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.02em",
          zIndex: 20,
          pointerEvents: "none",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        3D model by{" "}
        <a
          href="https://sketchfab.com/onurpearl"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.28)", textDecoration: "none", pointerEvents: "auto" }}
        >
          onurpearl
        </a>
        {" "}— CC BY 4.0
      </div>
    </div>
  );
}
