"use client";

// Force Vercel rebuild — stale cache detected 2026-03-16
import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { dockSounds } from "@/lib/dockSounds";

interface DockItemProps {
  label?: string;
  ariaLabel?: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  onPointerLeave?: () => void;
}

function DockItem({
  label,
  ariaLabel,
  children,
  active,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: DockItemProps) {
  return (
    <button
      aria-label={ariaLabel || label}
      className="ct-dock-icon"
      style={{
        background: "none",
        border: "1px solid transparent",
        borderRadius: 6,
        padding: "1px 2px 0px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: active
          ? "rgba(255,255,255,0.9)"
          : "rgba(255,255,255,0.45)",
        flexShrink: 1,
        minWidth: 0,
        minHeight: 32,
      }}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      <div style={{ height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {children}
      </div>
      {label && <span className="dock-label" style={{ marginTop: 1, lineHeight: 1 }}>{label}</span>}
    </button>
  );
}

function triggerCTReveal() {
  dockSounds.ctReveal();
  const el = document.createElement("div");
  el.style.cssText =
    "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;pointer-events:none;animation:ctA 850ms ease-out forwards";
  el.innerHTML =
    '<svg viewBox="0 0 500 200" width="500" style="opacity:.12;filter:invert(1)"><rect x="60" y="70" width="380" height="70" rx="6" fill="white"/><rect x="20" y="90" width="55" height="40" rx="4" fill="white"/><rect x="425" y="90" width="55" height="40" rx="4" fill="white"/><circle cx="110" cy="158" r="24" fill="none" stroke="white" stroke-width="10"/><circle cx="390" cy="158" r="24" fill="none" stroke="white" stroke-width="10"/></svg>';
  const s = document.createElement("style");
  s.textContent =
    "@keyframes ctA{0%{opacity:0;transform:scale(.95)}15%{opacity:1;transform:scale(1.02)}80%{opacity:1}100%{opacity:0;transform:scale(1.05)}}";
  document.head.appendChild(s);
  document.body.appendChild(el);
  setTimeout(() => {
    el.remove();
    s.remove();
  }, 900);
}

function triggerPowerUp() {
  dockSounds.powerUp();
  const f = document.createElement("div");
  f.textContent = "CHARGED";
  f.style.cssText =
    "position:fixed;bottom:64px;left:50%;transform:translateX(-50%);font-size:11px;letter-spacing:.22em;color:rgba(255,255,255,.92);font-weight:500;z-index:9998;pointer-events:none;animation:chF 1800ms ease-out forwards";
  const s = document.createElement("style");
  s.textContent =
    "@keyframes chF{0%{opacity:0}12%{opacity:1}75%{opacity:1}100%{opacity:0}}";
  document.head.appendChild(s);
  document.body.appendChild(f);
  setTimeout(() => {
    f.remove();
    s.remove();
  }, 1850);
}

interface BottomDockProps {
  onGalleryOpen?: () => void;
  onConnectOpen?: () => void;
  onPricingOpen?: () => void;
  onEventsOpen?: () => void;
  onStoryOpen?: () => void;
  onSocialOpen?: () => void;
  volume?: number;
  onVolumeUp?: () => void;
  onVolumeDown?: () => void;
}

export default function BottomDock({ onGalleryOpen, onConnectOpen, onPricingOpen, onEventsOpen, onStoryOpen, onSocialOpen, volume = 1.0, onVolumeUp, onVolumeDown }: BottomDockProps) {
  const router = useRouter();
  const cameraClickCount = useRef(0);
  const cameraTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chargeHoldTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCamera = useCallback(() => {
    dockSounds.camera();
    cameraClickCount.current++;
    if (cameraTimer.current) clearTimeout(cameraTimer.current);
    if (cameraClickCount.current >= 3) {
      cameraClickCount.current = 0;
      triggerCTReveal();
      return;
    }
    cameraTimer.current = setTimeout(() => {
      cameraClickCount.current = 0;
      if (onGalleryOpen) {
        onGalleryOpen();
      } else {
        router.push("/gallery");
      }
    }, 800);
  }, [router, onGalleryOpen]);

  const handleChargeDown = useCallback(() => {
    chargeHoldTimer.current = setTimeout(triggerPowerUp, 2000);
  }, []);

  const handleChargeUp = useCallback(() => {
    if (chargeHoldTimer.current) clearTimeout(chargeHoldTimer.current);
  }, []);

  return (
    <div
      className="ct-bottom-dock"
      role="toolbar"
      aria-label="App dock"
      style={{
        background: "var(--dock-bg)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 2px",
        gap: 0,
        overflow: "hidden",
        flexWrap: "nowrap",
        flexShrink: 0,
      }}
    >
      {/* Home */}
      <DockItem label="Home" ariaLabel="Home" active onClick={() => { router.push("/"); }}>
        <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
          <path
            d="M2 7L10 1l8 6v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z"
            stroke="currentColor"
            strokeWidth="1.3"
            fill="none"
          />
          <rect
            x="7"
            y="10"
            width="6"
            height="7"
            rx="0.5"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </svg>
      </DockItem>



      {/* Phone — Call Us */}
      <DockItem
        label="Call Us"
        ariaLabel="Call Us"
        onClick={() => {
          dockSounds.phone();
          window.location.href = "tel:+18082501162";
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M4 2.5C4 2.5 5.5 2 6 2s1.2.8 1.5 2l.3 1c.2.5 0 1.2-.5 1.5L6 7.5s.5 2 2.2 3.8S12 13.5 12 13.5l1-1.3c.3-.5 1-.7 1.5-.5l1 .3c1.2.3 2 .9 2 1.5s-.5 1.5-.5 1.5-1.5 2-4 2S4 12 4 12s-3-5.5-3-8 2-4 2-4l1 1z"
            stroke="currentColor"
            strokeWidth="1.1"
            fill="none"
          />
        </svg>
      </DockItem>

      {/* Camera — Gallery (triple-click easter egg) */}
      <DockItem label="Gallery" ariaLabel="Gallery" onClick={handleCamera}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect
            x="1.5"
            y="1.5"
            width="15"
            height="15"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="6" cy="6.5" r="2" stroke="currentColor" strokeWidth="1" />
          <path
            d="M1.5 13l4-4 3 3 2.5-2.5L16.5 15"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </DockItem>

      {/* Calendar — Events */}
      <DockItem
        label="Events"
        ariaLabel="Events"
        onClick={() => {
          dockSounds.calendar();
          if (onEventsOpen) {
            onEventsOpen();
          } else {
            router.push("/events");
          }
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect
            x="2"
            y="3.5"
            width="14"
            height="13"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="2"
            y1="7.5"
            x2="16"
            y2="7.5"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <line
            x1="6"
            y1="1.5"
            x2="6"
            y2="5.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="1.5"
            x2="12"
            y2="5.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <rect
            x="5"
            y="10"
            width="2.2"
            height="2.2"
            rx="0.5"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </DockItem>

      {/* Lightning — Pricing (charging easter egg) */}
      <DockItem
        label="Pricing"
        ariaLabel="Pricing"
        onClick={() => {
          dockSounds.charging();
          if (onPricingOpen) {
            onPricingOpen();
          } else {
            router.push("/pricing");
          }
        }}
        onPointerDown={handleChargeDown}
        onPointerUp={handleChargeUp}
        onPointerLeave={handleChargeUp}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M10 1L4 10h4.5L8 17l6-9h-4.5L10 1z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
      </DockItem>

      {/* Bluetooth — Connect overlay */}
      <DockItem
        label="Connect"
        ariaLabel="Connect"
        onClick={() => {
          dockSounds.bluetooth();
          if (onConnectOpen) {
            onConnectOpen();
          } else {
            window.open("https://x.com/Maui_PremiumArt", "_blank", "noopener");
          }
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M6 4.5L12 9l-6 4.5M9 2v14"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 2l4.5 4.5L9 9l4.5 4.5L9 16"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
      </DockItem>

      {/* Globe — Our Story */}
      <DockItem
        label="Our Story"
        ariaLabel="Our Story"
        onClick={() => {
          dockSounds.browser();
          if (onStoryOpen) {
            onStoryOpen();
          } else {
            router.push("/story");
          }
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" />
          <ellipse
            cx="9"
            cy="9"
            rx="3"
            ry="7"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="2"
            y1="9"
            x2="16"
            y2="9"
            stroke="currentColor"
            strokeWidth="0.9"
          />
        </svg>
      </DockItem>

      {/* Palette — Artists */}
      <DockItem
        label="Artists"
        ariaLabel="Artist Sign-Up"
        onClick={() => { router.push("/artists"); }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </DockItem>

      {/* Sun — Settings (no-op) */}
      <DockItem label="Settings" ariaLabel="Settings">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.1" />
          <path
            d="M9 1.5v2.5M9 14v2.5M1.5 9H4M14 9h2.5M3.1 3.1l1.8 1.8M13.1 13.1l1.8 1.8M3.1 14.9l1.8-1.8M13.1 4.9l1.8-1.8"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      </DockItem>

      {/* Volume cluster */}
      <div role="group" aria-label="Volume control" style={{ display: "flex", alignItems: "center", gap: 0, marginLeft: "auto" }}>
        <DockItem ariaLabel="Volume down" onClick={() => onVolumeDown?.()}>
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M6 1L2 6L6 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </DockItem>
        <div role="img" aria-label={`Volume level: ${Math.round(volume * 100)}%`} style={{ height: 20, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1px", color: "rgba(255,255,255,0.45)" }}>
          {volume === 0 ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 5.5h2l3-3v11l-3-3H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <line x1="12" y1="4" x2="9" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          ) : volume <= 0.5 ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 5.5h2l3-3v11l-3-3H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <path d="M10.5 6c.8.8.8 4 0 4.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 5.5h2l3-3v11l-3-3H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <path d="M10.5 6c.8.8.8 4 0 4.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <path d="M12.5 4c1.3 1.3 1.3 7 0 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            </svg>
          )}
        </div>
        <DockItem ariaLabel="Volume up" onClick={() => onVolumeUp?.()}>
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M2 1L6 6L2 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </DockItem>
        <span aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Volume: {Math.round(volume * 100)}%</span>
      </div>

      {/* Right nav arrow → Social Proof */}
      <DockItem ariaLabel="Reviews" onClick={() => onSocialOpen?.()}>
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path
            d="M4 2L10 8L4 14"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </DockItem>
    </div>
  );
}
