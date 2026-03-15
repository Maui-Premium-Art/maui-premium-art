"use client";

/**
 * HeroArea3D — Cybertruck 3D hero with static fallback
 *
 * 3D model: Tesla Cybertruck by onurpearl (Sketchfab)
 * License: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
 */

import { Suspense, useEffect, useState, useRef } from "react";
import Image from "next/image";

// Lazy load Three.js — only when WebGL confirmed available
let ThreeCanvas: React.ComponentType<{ style?: React.CSSProperties }> | null = null;

// ── Static fallback (shown when WebGL unavailable or loading) ──────────────

function StaticHero() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Sky + terrain background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #05050a 0%, #080810 40%, #0a0a0f 60%, #080810 100%)",
        }}
      />

      {/* Mountain silhouette */}
      <svg
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "55%" }}
        viewBox="0 0 1200 350"
        preserveAspectRatio="xMidYMax slice"
      >
        <path d="M0 350 L0 200 L80 170 L160 190 L240 155 L320 178 L400 145 L480 168 L560 132 L640 155 L720 128 L800 150 L880 128 L960 148 L1040 135 L1120 158 L1200 142 L1200 350 Z" fill="#0f0f1a" />
        <path d="M0 350 L0 250 L100 225 L200 240 L300 215 L400 232 L500 205 L600 225 L700 200 L800 220 L900 198 L1000 218 L1100 205 L1200 222 L1200 350 Z" fill="#0c0c16" />
        <path d="M0 350 L0 295 L150 278 L300 288 L450 272 L600 285 L750 270 L900 283 L1050 270 L1200 282 L1200 350 Z" fill="#090912" />
      </svg>

      {/* Grid floor */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-30%",
          right: "-30%",
          height: "40%",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          transform: "perspective(300px) rotateX(60deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
      />

      {/* Mahalo Bird on Cybertruck tailgate — the hero image */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          width: "min(680px, 94vw)",
          aspectRatio: "16/9",
        }}
      >
        <Image
          src="/images/mahalo-bird/wrap-tailgate.jpg"
          alt="Cybertruck tailgate with Mahalo Bird art wrap by Hulali Lā"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center 30%",
            filter: "brightness(0.92) contrast(1.04) saturate(1.05)",
            borderRadius: 4,
          }}
          priority
        />
        {/* Subtle dark vignette to blend with background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 4,
            background: "linear-gradient(to bottom, rgba(5,5,10,0.3) 0%, transparent 30%, transparent 70%, rgba(5,5,10,0.5) 100%)",
          }}
        />
      </div>
    </div>
  );
}

// ── 3D canvas (loaded dynamically) ────────────────────────────────────────

function ThreeScene() {
  const {
    Canvas,
    useGLTF,
    OrbitControls,
    Grid,
    ContactShadows,
    Environment,
    THREE,
  } = (ThreeCanvas as unknown as { _deps: Record<string, unknown> })?._deps ?? {};

  // This component is only mounted after dynamic import succeeds
  return null; // replaced by dynamic import below
}

// ── Main export ────────────────────────────────────────────────────────────

export default function HeroArea3D() {
  const [webglReady, setWebglReady] = useState(false);
  const [ThreeDComponent, setThreeDComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Check WebGL availability
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    if (!gl) {
      console.log("[CT] WebGL not available — using static fallback");
      return;
    }

    console.log("[CT] WebGL available — loading 3D scene");

    // Dynamic import Three.js only when WebGL confirmed
    import("@/components/truck/CybertruckScene")
      .then((mod) => {
        setThreeDComponent(() => mod.default);
        setWebglReady(true);
      })
      .catch((err) => {
        console.warn("[CT] 3D load failed, using static fallback:", err);
      });
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Always render static fallback — 3D scene overlays it once ready */}
      <StaticHero />

      {/* 3D scene (overlays static when WebGL available) */}
      {webglReady && ThreeDComponent && (
        <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
          <ThreeDComponent />
        </div>
      )}

      {/* Art label — bottom center, above everything */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Mahalo Bird · Edition I
        </span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#4a9eff", opacity: 0.7 }} />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em" }}>
            3 / 10 available
          </span>
        </div>
      </div>

      {/* CC attribution — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 10,
          fontSize: 9,
          color: "rgba(255,255,255,0.15)",
          letterSpacing: "0.03em",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <a
          href="https://sketchfab.com/onurpearl"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.22)", textDecoration: "none", pointerEvents: "auto" }}
        >
          3D model by onurpearl
        </a>
        {" "}· CC BY 4.0
      </div>
    </div>
  );
}
