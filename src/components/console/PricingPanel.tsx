"use client";

import { useState } from "react";
import Panel from "@/components/ui/Panel";

const EDITIONS = [
  { name: "Cybertruck Tailgate Wrap", price: 895, available: 7 },
  { name: "Original Art Piece", price: 4995, available: 2 },
  { name: "Metallic Print", price: 1295, available: 5 },
  { name: "Gallery Canvas", price: 895, available: 6 },
  { name: "Fine Art Print", price: 395, available: 8 },
];

function fmt(price: number): string {
  return price >= 1000
    ? `$${Math.floor(price / 1000)},${String(price % 1000).padStart(3, "0")}`
    : `$${price}`;
}

interface PricingPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function PricingPanel({ open, onClose }: PricingPanelProps) {
  const [selected, setSelected] = useState(0);
  const edition = EDITIONS[selected];

  return (
    <Panel open={open} onClose={onClose} direction="up" height="70vh" title="Pricing · Limited Editions">
      {/* Price hero */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div
          style={{
            fontSize: 40,
            fontWeight: 300,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
          }}
        >
          {fmt(edition.price)}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
            marginTop: 4,
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          {edition.name}
        </div>
      </div>

      {/* Format selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
        {EDITIONS.map((ed, i) => (
          <button
            key={ed.name}
            onClick={() => setSelected(i)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "11px 14px",
              background: i === selected ? "rgba(74,158,255,0.08)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${i === selected ? "rgba(74,158,255,0.3)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: 10,
              cursor: "pointer",
              transition: "all 0.15s ease",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: ed.available <= 3 ? "#ef4444" : ed.available <= 5 ? "#eab308" : "#22c55e",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: i === selected ? 500 : 400,
                  color: i === selected ? "#ffffff" : "rgba(255,255,255,0.55)",
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {ed.name}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {ed.available}/10
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: i === selected ? "#ffffff" : "rgba(255,255,255,0.45)",
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
                }}
              >
                {fmt(ed.price)}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Reserve CTA */}
      <a
        href="https://x.com/Maui_PremiumArt"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "13px",
          background: "rgba(74,158,255,0.12)",
          border: "1px solid rgba(74,158,255,0.25)",
          borderRadius: 10,
          color: "#ffffff",
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          letterSpacing: "0.02em",
          marginBottom: 12,
        }}
      >
        Reserve Your Edition
      </a>

      <p
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.2)",
          textAlign: "center",
          margin: 0,
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
        }}
      >
        10 per design max · Contact via X to reserve
      </p>
    </Panel>
  );
}
