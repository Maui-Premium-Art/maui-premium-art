"use client";

import { useState, useCallback } from "react";
import SplashScreen from "@/components/splash/SplashScreen";
import StatusBar from "@/components/console/StatusBar";
import GalleryCarousel from "@/components/console/GalleryCarousel";
import ConnectOverlay from "@/components/console/ConnectOverlay";
import PricingPanel from "@/components/console/PricingPanel";
import EventsPanel from "@/components/console/EventsPanel";
import StoryPanel from "@/components/console/StoryPanel";
import ArtistBioPanel from "@/components/console/ArtistBioPanel";
import ArtZoomView from "@/components/console/ArtZoomView";
import NewsletterSignup from "@/components/NewsletterSignup";
import { artworks } from "@/data/artworks";
import { useHawaiianRadio } from "@/hooks/useHawaiianRadio";
import VehicleControls from "@/components/console/VehicleControls";
import HeroArea from "@/components/console/HeroArea3D";
import CTMediaPlayer from "@/components/console/CTMediaPlayer";
import CTNavigateWidget from "@/components/console/CTNavigateWidget";
import BottomDock from "@/components/console/BottomDock";
import SocialProofPanel from "@/components/console/SocialProofPanel";

export default function Home() {
  const radio = useHawaiianRadio();
  const [splashDone, setSplashDone] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [artistBioOpen, setArtistBioOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [zoomArtSlug, setZoomArtSlug] = useState<string | null>(null);
  const [heroArtIndex, setHeroArtIndex] = useState(0);
  const heroArtImage = artworks[heroArtIndex].tailgateImage;
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  const closeAllPanels = useCallback(() => { setGalleryOpen(false); setConnectOpen(false); setPricingOpen(false); setEventsOpen(false); setStoryOpen(false); setArtistBioOpen(false); setSocialOpen(false); }, []);
  const openGallery = useCallback(() => { closeAllPanels(); setGalleryOpen(true); }, [closeAllPanels]);
  const closeGallery = useCallback(() => setGalleryOpen(false), []);
  const openConnect = useCallback(() => { closeAllPanels(); setConnectOpen(true); }, [closeAllPanels]);
  const closeConnect = useCallback(() => setConnectOpen(false), []);
  const openPricing = useCallback(() => { closeAllPanels(); setPricingOpen(true); }, [closeAllPanels]);
  const closePricing = useCallback(() => setPricingOpen(false), []);
  const openEvents = useCallback(() => { closeAllPanels(); setEventsOpen(true); }, [closeAllPanels]);
  const closeEvents = useCallback(() => setEventsOpen(false), []);
  const openStory = useCallback(() => { closeAllPanels(); setStoryOpen(true); }, [closeAllPanels]);
  const closeStory = useCallback(() => setStoryOpen(false), []);
  const openArtistBio = useCallback(() => { closeAllPanels(); setArtistBioOpen(true); }, [closeAllPanels]);
  const closeArtistBio = useCallback(() => setArtistBioOpen(false), []);
  const openSocial = useCallback(() => { closeAllPanels(); setSocialOpen(true); }, [closeAllPanels]);
  const closeSocial = useCallback(() => setSocialOpen(false), []);
  const handleArtSelect = useCallback((slug: string) => { closeAllPanels(); setZoomArtSlug(slug); }, [closeAllPanels]);
  const closeArtZoom = useCallback(() => setZoomArtSlug(null), []);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  const handleTailgateArtClick = useCallback(() => {
    setNewsletterOpen((prev) => !prev);
  }, []);

  const prevArt = useCallback(() => {
    setHeroArtIndex((i) => (i - 1 + artworks.length) % artworks.length);
  }, []);

  const nextArt = useCallback(() => {
    setHeroArtIndex((i) => (i + 1) % artworks.length);
  }, []);

  return (
    <main
      style={{
        width: "100vw",
        height: "100dvh",
        background: "#0a1628",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)",
      }}
    >
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          opacity: splashDone ? 1 : 0,
          transition: "opacity 0.6s ease",
          minHeight: 0,
        }}
      >
        {/* HEADER — 48px fixed, clear separation */}
        <div
          style={{
            height: 48,
            flexShrink: 0,
            position: "relative",
            zIndex: 25,
            background: "#0a1628",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <StatusBar onGalleryOpen={openGallery} />
        </div>

        {/* CONTENT ZONE — image + sidebar, fills remaining space */}
        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
          <HeroArea
            artImage={heroArtImage}
            startReveal={splashDone}
            artworkTitle={artworks[heroArtIndex].title}
            artworkIndex={heroArtIndex}
            artworkCount={artworks.length}
            onPrevArt={prevArt}
            onNextArt={nextArt}
          />
          <GalleryCarousel open={galleryOpen} onClose={closeGallery} onArtSelect={handleArtSelect} onArtIndexChange={setHeroArtIndex} />
          {connectOpen && <ConnectOverlay onClose={closeConnect} />}
          <PricingPanel open={pricingOpen} onClose={closePricing} />
          <EventsPanel open={eventsOpen} onClose={closeEvents} />
          <StoryPanel open={storyOpen} onClose={closeStory} />
          <ArtistBioPanel open={artistBioOpen} onClose={closeArtistBio} />
          <ArtZoomView slug={zoomArtSlug} onClose={closeArtZoom} />
          <SocialProofPanel open={socialOpen} onClose={closeSocial} />
          <VehicleControls onGalleryOpen={openGallery} onArtistOpen={openArtistBio} />
          {/* Tailgate Art label — opens newsletter signup */}
          <div
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <button
              className="ct-tonneau-label"
              onClick={handleTailgateArtClick}
              aria-label="Open newsletter signup"
              aria-expanded={newsletterOpen}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke={newsletterOpen ? "rgba(74,158,255,0.5)" : "rgba(255,255,255,0.2)"} strokeWidth="1" style={{ transition: "stroke 0.3s ease" }} />
                <text x="8" y="11" fill={newsletterOpen ? "rgba(74,158,255,0.7)" : "rgba(255,255,255,0.3)"} fontSize="8" textAnchor="middle" fontWeight="700" fontFamily="sans-serif" style={{ transition: "fill 0.3s ease" }}>!</text>
              </svg>
              <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.15)", marginBottom: 2 }} />
              <span style={{ fontSize: 11, color: newsletterOpen ? "rgba(74,158,255,0.7)" : "rgba(255,255,255,0.5)", letterSpacing: "0.01em", fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif", fontWeight: 700, fontStyle: "italic", transition: "color 0.3s ease" }}>Tailgate Art</span>
            </button>

            {/* Newsletter signup card */}
            {newsletterOpen && (
              <div
                role="dialog"
                aria-label="Newsletter signup"
                style={{
                  position: "absolute",
                  right: 28,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 280,
                  background: "rgba(12,12,20,0.95)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "20px 16px 16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <button
                  onClick={() => setNewsletterOpen(false)}
                  aria-label="Close"
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: 16,
                    cursor: "pointer",
                    padding: "2px 6px",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#ffffff", marginBottom: 4, fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif" }}>
                  Stay in the loop
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 14, lineHeight: 1.5, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}>
                  New editions, wrap reveals, and studio drops. No spam.
                </div>
                <NewsletterSignup source="tailgate-art-label" compact />
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM CARDS — fit under truck body width */}
        <div
          className="ct-widgets-row"
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 8,
            padding: "0 10px 4px",
            flexShrink: 0,
            position: "relative",
            zIndex: 22,
            maxWidth: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CTMediaPlayer currentTrack={radio.currentTrack} isPlaying={radio.isPlaying} togglePlay={radio.togglePlay} nextTrack={radio.nextTrack} prevTrack={radio.prevTrack} />
          <CTNavigateWidget />
        </div>

        {/* DOCK — 52px fixed */}
        <BottomDock onGalleryOpen={openGallery} onConnectOpen={openConnect} onPricingOpen={openPricing} onEventsOpen={openEvents} onStoryOpen={openStory} onSocialOpen={openSocial} volume={radio.volume} onVolumeUp={radio.volumeUp} onVolumeDown={radio.volumeDown} />
      </div>

    </main>
  );
}
