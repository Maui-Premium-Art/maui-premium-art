"use client";

import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"boot" | "logo" | "fade">("boot");

  useEffect(() => {
    // Phase 1: brief black screen (boot)
    const t1 = setTimeout(() => setPhase("logo"), 400);
    // Phase 2: logo visible
    const t2 = setTimeout(() => setPhase("fade"), 2000);
    // Phase 3: transition out
    const t3 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        transition: phase === "fade" ? "opacity 0.8s ease" : "none",
        opacity: phase === "fade" ? 0 : 1,
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      {/* Scan line effect */}
      {phase === "boot" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(transparent 50%, rgba(0,0,0,0.03) 50%)",
            backgroundSize: "100% 4px",
            pointerEvents: "none",
            opacity: 0.3,
          }}
        />
      )}

      {/* Logo block */}
      <div
        style={{
          textAlign: "center",
          opacity: phase === "boot" ? 0 : 1,
          transition: "opacity 0.5s ease",
          transform: phase === "logo" || phase === "fade" ? "scale(1)" : "scale(0.92)",
        }}
      >
        {/* Angular logo mark */}
        <div
          style={{
            width: 56,
            height: 56,
            margin: "0 auto 20px",
            position: "relative",
          }}
        >
          <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Angular CT-inspired diamond mark */}
            <polygon
              points="28,2 54,16 54,40 28,54 2,40 2,16"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
            <polygon
              points="28,10 46,20 46,36 28,46 10,36 10,20"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
            <line x1="28" y1="2" x2="28" y2="10" stroke="white" strokeWidth="1.5" />
            <line x1="28" y1="46" x2="28" y2="54" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 300,
            letterSpacing: "0.25em",
            color: "#ffffff",
            textTransform: "uppercase",
            fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
          }}
        >
          MAUI PREMIUM ART
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.4)",
            marginTop: 8,
            textTransform: "uppercase",
          }}
        >
          Fine Art · Cybertruck · Aloha
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            width: 40,
            height: 1,
            background: "rgba(255,255,255,0.25)",
            margin: "16px auto 0",
          }}
        />
      </div>

      {/* Boot indicator dots */}
      {(phase === "logo") && (
        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            gap: 6,
            opacity: 0.5,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "white",
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
