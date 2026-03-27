"use client";

import { useState, useCallback } from "react";
import Panel from "@/components/ui/Panel";
import { artworks } from "@/data/artworks";

// Build gallery items from artworks data
const GALLERY_ITEMS = artworks.map((art) => ({
  src: art.tailgateImage,
  title: art.title,
  edition: "Edition I",
  available: `${Math.floor(Math.random() * 7) + 2} of 10`,
  slug: art.slug,
}));

interface GalleryCarouselProps {
  open: boolean;
  onClose: () => void;
  onArtSelect?: (slug: string) => void;
  onArtIndexChange?: (index: number) => void;
}

export default function GalleryCarousel({ open, onClose, onArtSelect, onArtIndexChange }: GalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const item = GALLERY_ITEMS[index];

  const prev = useCallback(() => {
    setIndex((i) => {
      const newIndex = i === 0 ? GALLERY_ITEMS.length - 1 : i - 1;
      onArtIndexChange?.(newIndex);
      return newIndex;
    });
  }, [onArtIndexChange]);

  const next = useCallback(() => {
    setIndex((i) => {
      const newIndex = i === GALLERY_ITEMS.length - 1 ? 0 : i + 1;
      onArtIndexChange?.(newIndex);
      return newIndex;
    });
  }, [onArtIndexChange]);

  return (
    <Panel
      open={open}
      onClose={onClose}
      direction="up"
      height="75vh"
      title={`Gallery · ${index + 1} / ${GALLERY_ITEMS.length}`}
    >
      {/* Image area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/10",
          borderRadius: 10,
          overflow: "hidden",
          background: "#0a1628",
          marginBottom: 14,
        }}
      >
        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous artwork"
          style={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "rgba(10,10,15,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image — tap to zoom */}
        <button
          onClick={() => onArtSelect?.(item.slug)}
          aria-label={`View ${item.title} details`}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${item.src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.3s ease",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        />

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next artwork"
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "rgba(10,10,15,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Art info + dots */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 15,
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

      {/* View details button */}
      <button
        onClick={() => onArtSelect?.(item.slug)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          width: "100%",
          padding: "12px",
          background: "rgba(74,158,255,0.1)",
          border: "1px solid rgba(74,158,255,0.25)",
          borderRadius: 10,
          color: "#ffffff",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          letterSpacing: "0.02em",
        }}
      >
        View Details · From $395
      </button>
    </Panel>
  );
}
