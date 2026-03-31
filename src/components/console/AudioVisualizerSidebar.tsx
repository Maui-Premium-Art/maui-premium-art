"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Panel from "@/components/ui/Panel";
import { VISUALIZER_PRESETS, resetSpectrogramHistory } from "@/lib/visualizerPresets";

interface AudioVisualizerSidebarProps {
  open: boolean;
  onClose: () => void;
  analyserNode: AnalyserNode | null;
}

export default function AudioVisualizerSidebar({
  open,
  onClose,
  analyserNode,
}: AudioVisualizerSidebarProps) {
  const [activePreset, setActivePreset] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  const reducedMotion = useRef(false);
  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (analyserNode) {
      dataRef.current = new Uint8Array(analyserNode.frequencyBinCount);
    }
  }, [analyserNode]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!open) {
      resetSpectrogramHistory();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();

    const observer = new ResizeObserver(() => resizeCanvas());
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    let frameCount = 0;
    const preset = VISUALIZER_PRESETS[activePreset];
    const skipFrames = reducedMotion.current ? 4 : 1;

    const draw = () => {
      frameCount++;
      if (frameCount % skipFrames !== 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      if (analyserNode && dataRef.current) {
        if (activePreset === 1) {
          analyserNode.getByteTimeDomainData(dataRef.current);
        } else {
          analyserNode.getByteFrequencyData(dataRef.current);
        }
      }

      const data = dataRef.current || new Uint8Array(128);
      const time = performance.now() / 1000;

      preset.render(ctx, data, w, h, time);
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [open, activePreset, analyserNode, resizeCanvas]);

  const handleClose = useCallback(() => {
    resetSpectrogramHistory();
    onClose();
  }, [onClose]);

  return (
    <Panel
      open={open}
      onClose={handleClose}
      direction="right"
      width="50vw"
      title="EQUALIZER"
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          gap: 0,
        }}
      >
        {/* Preset nav column */}
        <nav
          role="tablist"
          aria-label="Visualization presets"
          style={{
            width: 160,
            flexShrink: 0,
            borderRight: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {VISUALIZER_PRESETS.map((preset, i) => (
            <button
              key={preset.name}
              role="tab"
              aria-selected={i === activePreset}
              onClick={() => setActivePreset(i)}
              style={{
                background: i === activePreset ? "rgba(255,255,255,0.06)" : "transparent",
                border: "none",
                borderLeft: i === activePreset
                  ? "2px solid rgba(74,158,255,0.7)"
                  : "2px solid transparent",
                color: i === activePreset ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)",
                padding: "10px 14px",
                textAlign: "left",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: i === activePreset ? 600 : 400,
                fontFamily: "var(--ct-font-text, -apple-system, 'SF Pro Text', system-ui, sans-serif)",
                letterSpacing: "0.02em",
                transition: "all 0.15s ease",
              }}
            >
              <div>{preset.name}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>
                {preset.description}
              </div>
            </button>
          ))}
        </nav>

        {/* Canvas visualizer */}
        <div
          style={{
            flex: 1,
            position: "relative",
            minHeight: 0,
            background: "#0a0c10",
          }}
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Audio visualization: ${VISUALIZER_PRESETS[activePreset].name}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>

      {/* SR announcement */}
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
        {VISUALIZER_PRESETS[activePreset].name} visualization active
      </span>

      {/* Mobile responsive: stack nav on top below 768px */}
      <style>{`
        @media (max-width: 768px) {
          [aria-label="Visualization presets"] {
            width: 100% !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
            padding: 4px 0 !important;
            min-height: 44px;
          }
          [aria-label="Visualization presets"] button {
            white-space: nowrap;
            padding: 8px 12px !important;
            border-left: none !important;
            border-bottom: 2px solid transparent;
          }
          [aria-label="Visualization presets"] button[aria-selected="true"] {
            border-bottom-color: rgba(74,158,255,0.7) !important;
          }
          [aria-label="Visualization presets"] button div:last-child {
            display: none;
          }
        }
      `}</style>
    </Panel>
  );
}
