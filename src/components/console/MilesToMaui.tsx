"use client";

import { useMilesToMaui, formatDistance } from "@/hooks/useMilesToMaui";

const MARKS = Array.from({ length: 10 }, (_, i) => i);

export default function MilesToMaui() {
  const { distance, litMarks, loading, error } = useMilesToMaui();

  const isLit = (i: number) => {
    if (loading) return false;
    if (error) return true;
    return i < litMarks;
  };

  const textReady = !loading;

  return (
    <div
      role="status"
      aria-label="Distance to Maui"
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "0 4px",
        flexShrink: 1,
        minWidth: 0,
        alignSelf: "center",
      }}
    >
      {/* Hash bar SVG */}
      <svg
        width="62"
        height="18"
        viewBox="0 0 62 18"
        aria-hidden="true"
        style={{ flexShrink: 1 }}
      >
        {MARKS.map((i) => {
          const cx = i * 6.5 + 1.5;
          const cy = 9;
          return (
            <rect
              key={i}
              x={i * 6.5}
              y={3}
              width={3}
              height={12}
              rx={0.5}
              fill={
                isLit(i)
                  ? "rgba(255,255,255,0.80)"
                  : "rgba(255,255,255,0.08)"
              }
              transform={`rotate(-18, ${cx}, ${cy})`}
              style={{
                transition: `fill 400ms ease-out`,
                transitionDelay: `${i * 30}ms`,
              }}
            />
          );
        })}
      </svg>

      {/* Distance text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          opacity: textReady ? 1 : 0.4,
          transition: "opacity 300ms ease-out 320ms",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.70)",
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
            lineHeight: 1.2,
            fontFamily:
              "-apple-system, 'SF Pro Display', system-ui, sans-serif",
          }}
        >
          {error
            ? "Aloha"
            : loading
              ? "... mi"
              : distance! < 20
                ? "On Maui"
                : `${formatDistance(distance!)} mi`}
        </span>
        {!error && distance !== null && distance >= 20 && (
          <span
            style={{
              fontSize: 8,
              fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              lineHeight: 1.2,
              fontFamily:
                "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            to Maui
          </span>
        )}
      </div>

      {/* Reduced motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [aria-label="Distance to Maui"] rect,
          [aria-label="Distance to Maui"] div {
            transition-duration: 0ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
    </div>
  );
}
