"use client";

import { useState, useCallback, useRef } from "react";
import SplashScreen from "@/components/splash/SplashScreen";
import StatusBar from "@/components/console/StatusBar";
import GalleryCarousel from "@/components/console/GalleryCarousel";
import ConnectOverlay from "@/components/console/ConnectOverlay";
import PricingPanel from "@/components/console/PricingPanel";
import EventsPanel from "@/components/console/EventsPanel";
import StoryPanel from "@/components/console/StoryPanel";
import ArtistBioPanel from "@/components/console/ArtistBioPanel";
import ArtZoomView from "@/components/console/ArtZoomView";
import NewsletterPopup from "@/components/NewsletterPopup";
import { dockSounds } from "@/lib/dockSounds";
import VehicleControls from "@/components/console/VehicleControls";
import HeroArea from "@/components/console/HeroArea3D";
import CTMediaPlayer from "@/components/console/CTMediaPlayer";
import CTNavigateWidget from "@/components/console/CTNavigateWidget";
import BottomDock from "@/components/console/BottomDock";
import SocialProofPanel from "@/components/console/SocialProofPanel";

const TONNEAU_MESSAGES = [
  "Tonneau sealed — art inside.",
  "Access denied. Limited edition only.",
  "10 wraps per design. No peeking.",
  "Opening tonneau… just kidding.",
  "Art is stored in the tonneau of the mind.",
];

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [artistBioOpen, setArtistBioOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [zoomArtSlug, setZoomArtSlug] = useState<string | null>(null);
  const [heroArtImage, setHeroArtImage] = useState("/images/mahalo-bird/electric-prr-hummingbird.jpg");
  const [tonneauMsg, setTonneauMsg] = useState<string | null>(null);
  const tonneauTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleTonneauClick = useCallback(() => {
    dockSounds.tonneauSlide();
    setTonneauMsg(TONNEAU_MESSAGES[Math.floor(Math.random() * TONNEAU_MESSAGES.length)]);
    if (tonneauTimer.current) clearTimeout(tonneauTimer.current);
    tonneauTimer.current = setTimeout(() => setTonneauMsg(null), 2500);
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
          <HeroArea artImage={heroArtImage} />
          <GalleryCarousel open={galleryOpen} onClose={closeGallery} onArtSelect={handleArtSelect} onArtImageChange={setHeroArtImage} />
          {connectOpen && <ConnectOverlay onClose={closeConnect} />}
          <PricingPanel open={pricingOpen} onClose={closePricing} />
          <EventsPanel open={eventsOpen} onClose={closeEvents} />
          <StoryPanel open={storyOpen} onClose={closeStory} />
          <ArtistBioPanel open={artistBioOpen} onClose={closeArtistBio} />
          <ArtZoomView slug={zoomArtSlug} onClose={closeArtZoom} />
          <SocialProofPanel open={socialOpen} onClose={closeSocial} />
          <VehicleControls onGalleryOpen={openGallery} onArtistOpen={openArtistBio} />
          {/* Closed / Tonneau — right side — EASTER EGG */}
          <button
            className="ct-tonneau-label"
            onClick={handleTonneauClick}
            aria-label="Tonneau easter egg"
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
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke={tonneauMsg ? "rgba(74,158,255,0.5)" : "rgba(255,255,255,0.2)"} strokeWidth="1" style={{ transition: "stroke 0.3s ease" }} />
              <text x="8" y="11" fill={tonneauMsg ? "rgba(74,158,255,0.7)" : "rgba(255,255,255,0.3)"} fontSize="8" textAnchor="middle" fontWeight="700" fontFamily="sans-serif" style={{ transition: "fill 0.3s ease" }}>!</text>
            </svg>
            <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.15)", marginBottom: 2 }} />
            <span style={{ fontSize: 11, color: tonneauMsg ? "rgba(74,158,255,0.7)" : "rgba(255,255,255,0.5)", letterSpacing: "0.01em", fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif", fontWeight: 700, fontStyle: "italic", transition: "color 0.3s ease" }}>Tailgate Art</span>

            {/* Easter egg tooltip */}
            {tonneauMsg && (
              <div
                style={{
                  position: "absolute",
                  right: 28,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(10,10,15,0.9)",
                  border: "1px solid rgba(74,158,255,0.2)",
                  borderRadius: 8,
                  padding: "6px 10px",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.7)",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
                }}
              >
                {tonneauMsg}
              </div>
            )}
          </button>
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
          <CTMediaPlayer />
          <CTNavigateWidget />
        </div>

        {/* DOCK — 52px fixed */}
        <BottomDock onGalleryOpen={openGallery} onConnectOpen={openConnect} onPricingOpen={openPricing} onEventsOpen={openEvents} onStoryOpen={openStory} onSocialOpen={openSocial} />
      </div>

      <NewsletterPopup />
    </main>
  );
}
