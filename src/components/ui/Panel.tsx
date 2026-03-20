"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export type PanelDirection = "up" | "right";

interface PanelProps {
  open: boolean;
  onClose: () => void;
  direction?: PanelDirection;
  /** Height for slide-up panels (CSS value). Default: "70vh" */
  height?: string;
  /** Width for slide-in panels (CSS value). Default: "380px" */
  width?: string;
  /** Show backdrop blur overlay. Default: true */
  backdrop?: boolean;
  /** Panel title shown in header. Optional. */
  title?: string;
  /** Content */
  children: React.ReactNode;
}

export default function Panel({
  open,
  onClose,
  direction = "up",
  height = "70vh",
  width = "380px",
  backdrop = true,
  title,
  children,
}: PanelProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  // Mount → animate in
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Swipe to dismiss
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;

      if (direction === "up" && deltaY > 60) {
        onClose();
      } else if (direction === "right" && deltaX > 60) {
        onClose();
      }
    },
    [direction, onClose]
  );

  if (!mounted) return null;

  const isUp = direction === "up";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 40,
        pointerEvents: visible ? "auto" : "none",
      }}
      role="dialog"
      aria-label={title ?? "Panel"}
      aria-modal="true"
    >
      {/* Backdrop */}
      {backdrop && (
        <div
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "absolute",
          ...(isUp
            ? {
                bottom: 0,
                left: 0,
                right: 0,
                height,
                maxHeight: "calc(100dvh - 120px)",
                borderRadius: "16px 16px 0 0",
                transform: visible ? "translateY(0)" : "translateY(100%)",
              }
            : {
                top: 0,
                right: 0,
                bottom: 0,
                width,
                maxWidth: "90vw",
                borderRadius: "16px 0 0 16px",
                transform: visible ? "translateX(0)" : "translateX(100%)",
              }),
          background: "rgba(12,12,20,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: isUp
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.08)",
          borderRight: isUp ? "1px solid rgba(255,255,255,0.08)" : "none",
          borderBottom: !isUp ? "1px solid rgba(255,255,255,0.08)" : "none",
          boxShadow: isUp
            ? "0 -8px 40px rgba(0,0,0,0.5)"
            : "-8px 0 40px rgba(0,0,0,0.5)",
          transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 41,
        }}
      >
        {/* Handle + Header */}
        <div
          style={{
            flexShrink: 0,
            padding: isUp ? "10px 16px 8px" : "16px 16px 8px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: isUp ? "center" : "flex-start", flex: 1 }}>
            {/* Drag handle for slide-up */}
            {isUp && (
              <div
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.15)",
                  marginBottom: 10,
                  alignSelf: "center",
                }}
              />
            )}
            {title && (
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                  width: "100%",
                }}
              >
                {title}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close panel"
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              color: "rgba(255,255,255,0.4)",
              fontSize: 18,
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              lineHeight: 1,
              fontFamily: "-apple-system, system-ui, sans-serif",
            }}
          >
            ×
          </button>
        </div>

        {/* Content — scrollable */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: "16px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
