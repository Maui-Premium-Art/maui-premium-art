"use client";

import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

function SourceIcon({ source }: { source: Testimonial["source"] }) {
  if (source === "x") {
    return (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 3h14v9H4l-3 3V3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export default function SocialProof() {
  return (
    <div
      style={{
        padding: "0 10px",
        marginBottom: 6,
        flexShrink: 0,
      }}
    >
      {/* Section label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
          paddingLeft: 4,
        }}
      >
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
          }}
        />
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          What people are saying
        </span>
      </div>

      {/* Horizontal scroll strip */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          paddingBottom: 2,
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            style={{
              flexShrink: 0,
              width: 240,
              padding: "12px 14px",
              background: "rgba(14,14,22,0.6)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            {/* Quote */}
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                margin: 0,
                lineHeight: 1.6,
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.25)",
                    fontWeight: 600,
                  }}
                >
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 500,
                      fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                    }}
                  >
                    {t.author}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "rgba(255,255,255,0.2)",
                  fontSize: 9,
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

      {/* Hide scrollbar */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
