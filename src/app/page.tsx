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
        background: "var(--bg-primary)",
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
            background: "var(--bg-primary)",
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
            onBrowseGallery={openGallery}
            onSeeEditions={openPricing}
            onTailgateArt={handleTailgateArtClick}
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

          {/* Newsletter signup modal — triggered by Tailgate Art label */}
          {newsletterOpen && (
            <div
              role="dialog"
              aria-label="Newsletter signup"
              style={{
                position: "absolute",
                right: 40,
                top: "20%",
                zIndex: 30,
                width: 280,
                background: "var(--ct-glass)",
                backdropFilter: "var(--ct-glass-blur)",
                WebkitBackdropFilter: "var(--ct-glass-blur)",
                border: "1px solid var(--ct-glass-border)",
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
              <div style={{ fontSize: 14, fontWeight: 500, color: "#ffffff", marginBottom: 4, fontFamily: "var(--ct-font-display)" }}>
                Stay in the loop
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 14, lineHeight: 1.5, fontFamily: "var(--ct-font-text)" }}>
                New editions, wrap reveals, and studio drops. No spam.
              </div>
              <NewsletterSignup source="tailgate-art-label" compact />
            </div>
          )}
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
