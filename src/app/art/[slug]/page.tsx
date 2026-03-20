"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getArtworkBySlug, getAllSlugs } from "@/data/artworks";
import type { ArtFormat } from "@/data/artworks";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

function formatPrice(price: number): string {
  return price >= 1000
    ? `$${Math.floor(price / 1000)},${String(price % 1000).padStart(3, "0")}`
    : `$${price}`;
}

export default function ArtProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const artwork = getArtworkBySlug(slug);
  const [selectedFormat, setSelectedFormat] = useState<ArtFormat | null>(
    artwork ? artwork.formats[0] : null
  );
  const [activeImage, setActiveImage] = useState(0);

  if (!artwork) {
    return (
      <main
        style={{
          minHeight: "100dvh",
          background: "#0a0a0f",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 300, marginBottom: 12 }}>Artwork not found</h1>
          <Link href="/" style={{ color: "#4a9eff", textDecoration: "none", fontSize: 14 }}>
            ← Back to Console
          </Link>
        </div>
      </main>
    );
  }

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const images = artwork.galleryImages ?? [artwork.heroImage];

  const handleCheckout = useCallback(async () => {
    if (!selectedFormat) return;

    // If no Stripe key configured, fall back to X DM
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
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      window.open("https://x.com/Maui_PremiumArt", "_blank", "noopener");
    } finally {
      setCheckoutLoading(false);
    }
  }, [selectedFormat, artwork.title]);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#0a0a0f",
        color: "#ffffff",
        fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "rgba(10,10,15,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "rgba(255,255,255,0.55)",
            fontSize: 13,
            letterSpacing: "0.02em",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Console
        </Link>

        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {artwork.category}
        </div>

        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "32px 20px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "start",
          }}
          className="art-product-grid"
        >
          {/* LEFT — Image gallery */}
          <div>
            {/* Main image */}
            <div
              style={{
                width: "100%",
                aspectRatio: "4/3",
                borderRadius: 14,
                overflow: "hidden",
                background: "#0d0d18",
                marginBottom: 12,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url('${images[activeImage]}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "background-image 0.3s ease",
                }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: 8 }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    style={{
                      width: 64,
                      height: 48,
                      borderRadius: 8,
                      overflow: "hidden",
                      border: i === activeImage
                        ? "2px solid rgba(74,158,255,0.6)"
                        : "1px solid rgba(255,255,255,0.08)",
                      background: "#0d0d18",
                      cursor: "pointer",
                      padding: 0,
                      position: "relative",
                      opacity: i === activeImage ? 1 : 0.6,
                      transition: "opacity 0.2s ease, border-color 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url('${img}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Product info */}
          <div>
            {/* Title */}
            <h1
              style={{
                fontSize: 32,
                fontWeight: 300,
                margin: "0 0 6px",
                letterSpacing: "0.01em",
                lineHeight: 1.2,
              }}
            >
              {artwork.title}
            </h1>

            {/* Artist */}
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                marginBottom: 24,
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              }}
            >
              by <span style={{ color: "rgba(255,255,255,0.65)" }}>{artwork.artist}</span>
              {artwork.artistAlias && (
                <span style={{ color: "rgba(255,255,255,0.3)" }}> aka {artwork.artistAlias}</span>
              )}
            </div>

            {/* Price display */}
            <div
              style={{
                fontSize: 36,
                fontWeight: 300,
                color: "#ffffff",
                marginBottom: 4,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {selectedFormat ? formatPrice(selectedFormat.price) : ""}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.3)",
                marginBottom: 24,
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              }}
            >
              {selectedFormat?.name}
            </div>

            {/* Format selector */}
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 10,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                Select Format
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {artwork.formats.map((fmt) => (
                  <button
                    key={fmt.name}
                    onClick={() => setSelectedFormat(fmt)}
                    aria-label={`${fmt.name} — ${formatPrice(fmt.price)}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      background:
                        selectedFormat?.name === fmt.name
                          ? "rgba(74,158,255,0.08)"
                          : "rgba(14,14,22,0.8)",
                      border: `1px solid ${
                        selectedFormat?.name === fmt.name
                          ? "rgba(74,158,255,0.3)"
                          : "rgba(255,255,255,0.08)"
                      }`,
                      borderRadius: 10,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color:
                          selectedFormat?.name === fmt.name
                            ? "#ffffff"
                            : "rgba(255,255,255,0.6)",
                        fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                      }}
                    >
                      {fmt.name}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color:
                          selectedFormat?.name === fmt.name
                            ? "#ffffff"
                            : "rgba(255,255,255,0.5)",
                        fontVariantNumeric: "tabular-nums",
                        fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
                      }}
                    >
                      {formatPrice(fmt.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reserve CTA */}
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: "14px 24px",
                background: checkoutLoading ? "rgba(74,158,255,0.08)" : "rgba(74,158,255,0.15)",
                border: "1px solid rgba(74,158,255,0.3)",
                borderRadius: 10,
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: checkoutLoading ? "wait" : "pointer",
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                marginBottom: 12,
                opacity: checkoutLoading ? 0.6 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              {checkoutLoading ? "Opening checkout…" : "Reserve Your Edition"}
            </button>

            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.25)",
                textAlign: "center",
                margin: "0 0 32px",
                fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
              }}
            >
              Limited to 10 per design · Contact via X to reserve
            </p>

            {/* Description */}
            <div
              style={{
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 12,
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                About This Piece
              </div>
              {artwork.description.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.55)",
                    margin: i === 0 ? "0 0 14px" : "0 0 14px",
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

        {/* Footer */}
        <div
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            fontSize: 11,
            color: "rgba(255,255,255,0.18)",
            fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
          }}
        >
          Art by Hulali Lā · mauipremiumart.com
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 700px) {
          .art-product-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </main>
  );
}
