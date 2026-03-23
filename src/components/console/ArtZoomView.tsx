"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { artworks } from "@/data/artworks";
import type { ArtFormat } from "@/data/artworks";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

function fmt(price: number): string {
  return price >= 1000
    ? `$${Math.floor(price / 1000)},${String(price % 1000).padStart(3, "0")}`
    : `$${price}`;
}

interface ArtZoomViewProps {
  slug: string | null;
  onClose: () => void;
}

export default function ArtZoomView({ slug, onClose }: ArtZoomViewProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ArtFormat | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const touchStartX = useRef(0);

  const artworkIndex = slug ? artworks.findIndex((a) => a.slug === slug) : -1;
  const artwork = artworkIndex >= 0 ? artworks[artworkIndex] : null;

  // Gallery images within current artwork
  const images = artwork?.galleryImages ?? (artwork ? [artwork.heroImage] : []);

  const goNextImage = useCallback(() => {
    if (images.length <= 1) return;
    setSwipeDir("left");
    setCurrentIndex((i) => (i + 1) % images.length);
    setTimeout(() => setSwipeDir(null), 300);
  }, [images.length]);

  const goPrevImage = useCallback(() => {
    if (images.length <= 1) return;
    setSwipeDir("right");
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    setTimeout(() => setSwipeDir(null), 300);
  }, [images.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (delta < -60) goNextImage();
      else if (delta > 60) goPrevImage();
    },
    [goNextImage, goPrevImage]
  );

  const handleCheckout = useCallback(async () => {
    if (!selectedFormat || !artwork) return;
    if (!stripePromise || !selectedFormat.stripePriceId) {
      window.open("https://x.com/Maui_PremiumArt", "_blank", "noopener");
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: selectedFormat.stripePriceId,
          artworkTitle: artwork.title,
          formatName: selectedFormat.name,
          slug: artwork.slug,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      window.open("https://x.com/Maui_PremiumArt", "_blank", "noopener");
    } finally {
      setCheckoutLoading(false);
    }
  }, [selectedFormat, artwork]);

  useEffect(() => {
    if (slug && artwork) {
      setMounted(true);
      setSelectedFormat(artwork.formats[0]);
      setCurrentIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
        setSelectedFormat(null);
        setCurrentIndex(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [slug, artwork]);

  useEffect(() => {
    if (!slug) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [slug, onClose]);

  if (!mounted || !artwork) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 45,
        background: "rgba(5,5,10,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      role="dialog"
      aria-label={artwork.title}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Back to gallery"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            cursor: "pointer",
            padding: "4px 0",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Gallery
        </button>

        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          {artwork.category}
        </div>

        <div style={{ width: 50 }} />
      </div>

      {/* Content — scrollable */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Hero image — swipeable gallery */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            position: "relative",
            overflow: "hidden",
            transform: visible ? "scale(1)" : "scale(0.92)",
            transition: "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${images[currentIndex]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "opacity 0.3s ease",
              opacity: swipeDir ? 0.7 : 1,
            }}
          />

          {/* Prev/Next arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrevImage}
                aria-label="Previous image"
                style={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(10,10,15,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 5,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <button
                onClick={goNextImage}
                aria-label="Next image"
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(10,10,15,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 5,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 5,
                  zIndex: 5,
                }}
              >
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Image ${i + 1}`}
                    style={{
                      width: i === currentIndex ? 8 : 5,
                      height: 5,
                      borderRadius: 3,
                      background: i === currentIndex ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info section */}
        <div style={{ padding: "20px 16px 24px" }}>
          {/* Title + artist */}
          <h2
            style={{
              fontSize: 24,
              fontWeight: 300,
              margin: "0 0 4px",
              color: "#ffffff",
              fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            {artwork.title}
          </h2>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 20,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            by {artwork.artist}
            {artwork.artistAlias && <span style={{ color: "rgba(255,255,255,0.25)" }}> aka {artwork.artistAlias}</span>}
          </div>

          {/* Price */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 300,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: 4,
              fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            {selectedFormat ? fmt(selectedFormat.price) : ""}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              marginBottom: 20,
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            {selectedFormat?.name}
          </div>

          {/* Format selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
            {artwork.formats.map((f) => (
              <button
                key={f.name}
                onClick={() => setSelectedFormat(f)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "11px 14px",
                  background: selectedFormat?.name === f.name ? "rgba(74,158,255,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selectedFormat?.name === f.name ? "rgba(74,158,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: selectedFormat?.name === f.name ? 500 : 400,
                    color: selectedFormat?.name === f.name ? "#ffffff" : "rgba(255,255,255,0.55)",
                    fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                  }}
                >
                  {f.name}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: selectedFormat?.name === f.name ? "#ffffff" : "rgba(255,255,255,0.4)",
                    fontVariantNumeric: "tabular-nums",
                    fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
                  }}
                >
                  {fmt(f.price)}
                </span>
              </button>
            ))}
          </div>

          {/* Reserve CTA */}
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "14px",
              background: checkoutLoading ? "rgba(74,158,255,0.08)" : "rgba(74,158,255,0.15)",
              border: "1px solid rgba(74,158,255,0.3)",
              borderRadius: 10,
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 600,
              cursor: checkoutLoading ? "wait" : "pointer",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              letterSpacing: "0.02em",
              marginBottom: 8,
              opacity: checkoutLoading ? 0.6 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            {checkoutLoading ? "Opening checkout…" : "Reserve Your Edition"}
          </button>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              textAlign: "center",
              margin: "0 0 24px",
              fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
            }}
          >
            Limited to 10 per design · Contact via X
          </p>

          {/* Description */}
          <div
            style={{
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 10,
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              }}
            >
              About This Piece
            </div>
            {artwork.description.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  margin: "0 0 12px",
                  lineHeight: 1.8,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
