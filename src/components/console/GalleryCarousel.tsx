"use client";

import { useState, useCallback } from "react";

const GALLERY_ITEMS = [
  {
    src: "/images/mahalo-bird/electric-prr-hummingbird.jpg",
    title: "Electric Prr & Hummingbird",
    edition: "Edition I",
    available: "3 of 10",
  },
  {
    src: "/images/mahalo-bird/wrap-2.jpg",
    title: "Mahalo Bird — Tailgate",
    edition: "Edition I",
    available: "5 of 10",
  },
  {
    src: "/images/mahalo-bird/wrap-5.jpg",
    title: "Mahalo Bird — Side Panel",
    edition: "Edition I",
    available: "7 of 10",
  },
  {
    src: "/images/mahalo-bird/wrap-tailgate.jpg",
    title: "Mahalo Bird — Full Wrap",
    edition: "Edition I",
    available: "4 of 10",
  },
];

interface GalleryCarouselProps {
  onClose: () => void;
}

export default function GalleryCarousel({ onClose }: GalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const item = GALLERY_ITEMS[index];

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? GALLERY_ITEMS.length - 1 : i - 1));
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i === GALLERY_ITEMS.length - 1 ? 0 : i + 1));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        background: "rgba(5,5,10,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      role="dialog"
      aria-label="Art gallery"
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          Gallery · {index + 1} / {GALLERY_ITEMS.length}
        </div>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 6,
            color: "rgba(255,255,255,0.5)",
            fontSize: 11,
            padding: "4px 12px",
            cursor: "pointer",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          Close
        </button>
      </div>

      {/* Image area */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous artwork"
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "rgba(10,10,15,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url('${item.src}')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "background-image 0.3s ease",
          }}
        />

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next artwork"
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "rgba(10,10,15,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Footer — art info */}
      <div
        style={{
          padding: "12px 16px 14px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "0.02em",
              fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.05em",
              marginTop: 2,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            {item.edition} · {item.available}
          </div>
        </div>

        {/* Dot pagination */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {GALLERY_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`View artwork ${i + 1}`}
              style={{
                width: i === index ? 8 : 6,
                height: i === index ? 8 : 6,
                borderRadius: "50%",
                background: i === index ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
