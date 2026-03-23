"use client";

import { useState, useCallback, useRef } from "react";

interface CybertruckCSS3DProps {
  artImage?: string;
  style?: React.CSSProperties;
}

/**
 * CSS 3D Cybertruck model — 6 faces (box shape approximation).
 * Tailgate = hero art showcase. User drag-rotates.
 * No WebGL — pure CSS transforms.
 */
export default function CybertruckCSS3D({
  artImage = "/images/mahalo-bird/electric-prr-hummingbird.jpg",
  style,
}: CybertruckCSS3DProps) {
  const [rotateY, setRotateY] = useState(-155);
  const [rotateX, setRotateX] = useState(12);
  const [cursorStyle, setCursorStyle] = useState<"grab" | "grabbing">("grab");
  const draggingRef = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    setCursorStyle("grabbing");
    lastPos.current = { x: e.clientX, y: e.clientY };
    containerRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setRotateY((r) => r + dx * 0.4);
    setRotateX((r) => Math.max(-30, Math.min(30, r - dy * 0.3)));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
    setCursorStyle("grab");
  }, []);

  // CT proportions (approximate): 5.7m long, 2m wide, 1.8m tall
  // Scaled up to fill ~60% of viewport width
  const W = 160; // width (side to side)
  const H = 140; // height
  const D = 440; // depth (front to back)

  const faceBase: React.CSSProperties = {
    position: "absolute",
    backfaceVisibility: "visible",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  const metallic = "linear-gradient(135deg, #0f1d35 0%, #1a2d4a 30%, #0f1d35 50%, #1a2d4a 70%, #0f1d35 100%)";

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1200,
        cursor: cursorStyle,
        userSelect: "none",
        touchAction: "none",
        ...style,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="img"
      aria-label="3D Cybertruck model — drag to rotate"
    >
      <div
        style={{
          width: D,
          height: H,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: draggingRef.current ? "none" : "transform 0.3s ease-out",
        }}
      >
        {/* TAILGATE (back face) — HERO ART */}
        <div
          style={{
            ...faceBase,
            width: W,
            height: H,
            left: (D - W) / 2,
            transform: `translateZ(${-D / 2}px) rotateY(180deg)`,
            backgroundImage: `url('${artImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            boxShadow: "0 0 20px rgba(74,158,255,0.1)",
          }}
        />

        {/* FRONT (hood face) — angular CT hood */}
        <div
          style={{
            ...faceBase,
            width: W,
            height: H,
            left: (D - W) / 2,
            transform: `translateZ(${D / 2}px)`,
            background: metallic,
            clipPath: "polygon(10% 100%, 0% 40%, 25% 0%, 75% 0%, 100% 40%, 90% 100%)",
          }}
        >
          {/* Headlight bars */}
          <div style={{ position: "absolute", top: "38%", left: "5%", right: "5%", height: 2, background: "rgba(255,255,255,0.12)" }} />
        </div>

        {/* TOP (roof) */}
        <div
          style={{
            ...faceBase,
            width: W,
            height: D,
            left: (D - W) / 2,
            top: (H - D) / 2,
            transform: `rotateX(90deg) translateZ(${H / 2}px)`,
            background: metallic,
          }}
        >
          {/* Roof line */}
          <div style={{ position: "absolute", top: "15%", left: "10%", right: "10%", bottom: "40%", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }} />
        </div>

        {/* BOTTOM (underside) */}
        <div
          style={{
            ...faceBase,
            width: W,
            height: D,
            left: (D - W) / 2,
            top: (H - D) / 2,
            transform: `rotateX(-90deg) translateZ(${H / 2}px)`,
            background: "#0a0a12",
          }}
        />

        {/* LEFT SIDE */}
        <div
          style={{
            ...faceBase,
            width: D,
            height: H,
            transform: `rotateY(-90deg) translateZ(${W / 2 + (D - W) / 2}px)`,
            background: metallic,
          }}
        >
          {/* Window line */}
          <div style={{ position: "absolute", top: "10%", left: "20%", right: "15%", height: "35%", borderBottom: "1px solid rgba(255,255,255,0.1)", borderLeft: "1px solid rgba(255,255,255,0.06)" }} />
          {/* Wheel wells */}
          <div style={{ position: "absolute", bottom: 0, left: "12%", width: 40, height: 20, borderRadius: "20px 20px 0 0", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", bottom: 0, right: "12%", width: 40, height: 20, borderRadius: "20px 20px 0 0", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }} />
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            ...faceBase,
            width: D,
            height: H,
            transform: `rotateY(90deg) translateZ(${W / 2 + (D - W) / 2}px)`,
            background: metallic,
          }}
        >
          {/* Window line */}
          <div style={{ position: "absolute", top: "10%", left: "15%", right: "20%", height: "35%", borderBottom: "1px solid rgba(255,255,255,0.1)", borderRight: "1px solid rgba(255,255,255,0.06)" }} />
          {/* Wheel wells */}
          <div style={{ position: "absolute", bottom: 0, left: "12%", width: 40, height: 20, borderRadius: "20px 20px 0 0", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", bottom: 0, right: "12%", width: 40, height: 20, borderRadius: "20px 20px 0 0", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }} />
        </div>
      </div>

      {/* Drag hint */}
      {cursorStyle === "grab" && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.1em",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          Drag to rotate
        </div>
      )}
    </div>
  );
}
