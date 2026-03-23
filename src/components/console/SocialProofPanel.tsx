"use client";

import Panel from "@/components/ui/Panel";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

function SourceIcon({ source }: { source: Testimonial["source"] }) {
  if (source === "x") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 3h14v9H4l-3 3V3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

interface SocialProofPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function SocialProofPanel({ open, onClose }: SocialProofPanelProps) {
  return (
    <Panel open={open} onClose={onClose} direction="up" height="65vh" title={`Social · ${testimonials.length} reviews`}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {testimonials.map((t) => (
          <div
            key={t.id}
            style={{
              padding: "14px 16px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                margin: "0 0 10px",
                lineHeight: 1.7,
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.3)",
                    fontWeight: 600,
                  }}
                >
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 500, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
                    {t.author}
                  </div>
                  {t.handle && (
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
                      @{t.handle}
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "rgba(255,255,255,0.25)",
                  fontSize: 10,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                <SourceIcon source={t.source} />
                {t.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
