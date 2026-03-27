"use client";

import { useState } from "react";

interface CTLineLabelProps {
  label: string;
  sublabel?: string;
  lineHeight?: number;
  position?: "top" | "bottom";
  onClick?: () => void;
  active?: boolean;
}

export default function CTLineLabel({
  label,
  sublabel = "Open",
  lineHeight = 50,
  position = "top",
  onClick,
  active = false,
}: CTLineLabelProps) {
  const [hovered, setHovered] = useState(false);
  const highlight = active || hovered;

  const textColor = highlight
    ? "var(--accent-blue)"
    : "rgba(255,255,255,0.6)";
  const sublabelColor = highlight
    ? "rgba(74,158,255,0.5)"
    : "rgba(255,255,255,0.35)";
  const lineColor = highlight
    ? "rgba(74,158,255,0.3)"
    : "rgba(255,255,255,0.15)";

  const labelContent = (
    <>
      {sublabel && (
        <span
          style={{
            fontSize: 9,
            fontWeight: 400,
            fontStyle: "italic",
            color: sublabelColor,
            display: "block",
            marginBottom: 1,
            fontFamily: "var(--ct-font-text)",
            transition: "color 0.2s ease",
          }}
        >
          {sublabel}
        </span>
      )}
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          fontStyle: "italic",
          color: textColor,
          fontFamily: "var(--ct-font-display)",
          letterSpacing: "0.01em",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </span>
    </>
  );

  const line = (
    <div
      style={{
        width: 1,
        height: lineHeight,
        background: lineColor,
        transition: "background 0.2s ease",
      }}
    />
  );

  const inner = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {position === "top" && labelContent}
      {line}
      {position === "bottom" && labelContent}
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          pointerEvents: "auto",
        }}
      >
        {inner}
      </button>
    );
  }

  return inner;
}
