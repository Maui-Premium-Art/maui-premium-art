"use client";

import dynamic from "next/dynamic";

// Load 3D viewer client-side only — Three.js doesn't run on server
const CybertruckViewer = dynamic(
  () => import("@/components/truck/CybertruckViewer"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
        }}
      >
        {/* Simple loading indicator */}
        <div
          style={{
            width: 40,
            height: 40,
            border: "1px solid rgba(255,255,255,0.1)",
            borderTopColor: "rgba(74,158,255,0.6)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    ),
  }
);

export default function HeroArea() {
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 3D Cybertruck viewer — fills the hero */}
      <CybertruckViewer
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      {/* Art label — floats over the 3D scene */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          zIndex: 10,
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
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#4a9eff",
              opacity: 0.7,
            }}
          />
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            3 / 10 available
          </span>
        </div>
      </div>
    </div>
  );
}
