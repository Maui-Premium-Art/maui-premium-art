"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface CTDisplayViewerProps {
  totalFrames?: number;
  frameDir?: string;
  autoPlay?: boolean;
  autoPlayFps?: number;
  tailgateFrame?: number;
  onFrameChange?: (frame: number) => void;
  startReveal?: boolean;
}

const framePath = (index: number, dir: string): string =>
  `${dir}frame_${String(index).padStart(3, "0")}.jpg`;

type ViewerState = "preloading" | "revealing" | "interactive";

export default function CTDisplayViewer({
  totalFrames = 31,
  frameDir = "/ct-captures/set-002/",
  autoPlay = true,
  autoPlayFps = 8,
  tailgateFrame = 18,
  onFrameChange,
  startReveal = true,
}: CTDisplayViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [viewerState, setViewerState] = useState<ViewerState>("preloading");
  const [autoRotating, setAutoRotating] = useState(false);
  const [announceFrame, setAnnounceFrame] = useState(false);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const revealTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoRotateTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check reduced motion preference
  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    let cancelled = false;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = framePath(i, frameDir);
      img.onload = () => {
        if (cancelled) return;
        loaded++;
        setLoadProgress(loaded / totalFrames);
        if (loaded === totalFrames) {
          framesRef.current = images;
          if (startReveal && autoPlay && !reducedMotion.current) {
            setViewerState("revealing");
          } else {
            setCurrentFrame(tailgateFrame);
            setViewerState("interactive");
          }
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loaded++;
        setLoadProgress(loaded / totalFrames);
        console.warn(`[CTDisplayViewer] Failed to load frame ${i}`);
      };
      images.push(img);
    }

    return () => { cancelled = true; };
  }, [totalFrames, frameDir, startReveal, autoPlay, tailgateFrame]);

  // Cinematic reveal: play frames 0 → tailgateFrame
  useEffect(() => {
    if (viewerState !== "revealing") return;

    let frame = 0;
    const interval = 1000 / autoPlayFps;

    revealTimer.current = setInterval(() => {
      frame++;
      setCurrentFrame(frame);
      if (frame >= tailgateFrame) {
        if (revealTimer.current) clearInterval(revealTimer.current);
        revealTimer.current = null;
        setViewerState("interactive");
      }
    }, interval);

    return () => {
      if (revealTimer.current) clearInterval(revealTimer.current);
    };
  }, [viewerState, autoPlayFps, tailgateFrame]);

  // Auto-rotate
  useEffect(() => {
    if (!autoRotating || viewerState !== "interactive") return;

    autoRotateTimer.current = setInterval(() => {
      setCurrentFrame((f) => (f + 1) % totalFrames);
    }, 1000 / autoPlayFps);

    return () => {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
    };
  }, [autoRotating, viewerState, totalFrames, autoPlayFps]);

  // Notify parent of frame changes
  useEffect(() => {
    onFrameChange?.(currentFrame);
  }, [currentFrame, onFrameChange]);

  // Frame advance helpers
  const nextFrame = useCallback(() => {
    setCurrentFrame((f) => (f + 1) % totalFrames);
  }, [totalFrames]);

  const prevFrame = useCallback(() => {
    setCurrentFrame((f) => (f - 1 + totalFrames) % totalFrames);
  }, [totalFrames]);

  // Mouse drag handlers — set cursor directly on DOM for snappy feedback
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (viewerState !== "interactive") return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    if (containerRef.current) containerRef.current.style.cursor = "grabbing";
    setAnnounceFrame(false);
    e.preventDefault();
  }, [viewerState]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) >= 28) {
      if (deltaX > 0) prevFrame();
      else nextFrame();
      dragStartX.current = e.clientX;
      setAutoRotating(false);
    }
  }, [nextFrame, prevFrame]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (containerRef.current && viewerState === "interactive") {
      containerRef.current.style.cursor = "grab";
    }
  }, [viewerState]);

  // Touch drag handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (viewerState !== "interactive") return;
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    setAnnounceFrame(false);
  }, [viewerState]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.touches[0].clientX - dragStartX.current;
    if (Math.abs(deltaX) >= 28) {
      if (deltaX > 0) prevFrame();
      else nextFrame();
      dragStartX.current = e.touches[0].clientX;
      setAutoRotating(false);
    }
    e.preventDefault();
  }, [nextFrame, prevFrame]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Wheel handler
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (viewerState !== "interactive") return;
    if (e.deltaY > 0) nextFrame();
    else if (e.deltaY < 0) prevFrame();
    setAutoRotating(false);
    setAnnounceFrame(false);
  }, [viewerState, nextFrame, prevFrame]);

  // Keyboard handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (viewerState !== "interactive") return;
    if (e.key === "ArrowLeft") { prevFrame(); setAutoRotating(false); setAnnounceFrame(true); }
    else if (e.key === "ArrowRight") { nextFrame(); setAutoRotating(false); setAnnounceFrame(true); }
    else if (e.key === " ") { e.preventDefault(); setAutoRotating((a) => !a); }
    else if (e.key === "Escape") { setAutoRotating(false); }
  }, [viewerState, nextFrame, prevFrame]);

  const currentSrc = framePath(currentFrame, frameDir);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Cybertruck 360 degree viewer. Drag to rotate."
      aria-roledescription="360 degree viewer"
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      style={{
        position: "absolute",
        inset: 0,
        cursor: viewerState === "interactive" ? "grab" : "default",
        outline: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Frame display */}
      <img
        src={currentSrc}
        alt=""
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />

      {/* Loading progress bar */}
      {viewerState === "preloading" && (
        <div
          role="progressbar"
          aria-valuenow={Math.round(loadProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading viewer frames"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: `${loadProgress * 100}%`,
              height: "100%",
              background: "rgba(255,255,255,0.6)",
              transition: "width 0.15s ease-out",
            }}
          />
        </div>
      )}

      {/* Screen reader announcement — keyboard only */}
      <span
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
        }}
      >
        {viewerState === "preloading"
          ? `Loading ${Math.round(loadProgress * 100)} percent`
          : announceFrame
            ? `Frame ${currentFrame + 1} of ${totalFrames}`
            : ""}
      </span>

      {/* Focus ring style */}
      <style>{`
        [aria-roledescription="360 degree viewer"]:focus-visible {
          outline: 2px solid rgba(255,255,255,0.6);
          outline-offset: -2px;
        }
      `}</style>
    </div>
  );
}
