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
        background: active ? "rgba(255,255,255,0.08)" : "none",
        border: active
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid transparent",
        borderRadius: 8,
        padding: "4px 6px 2px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        color: active
          ? "rgba(255,255,255,0.9)"
          : "rgba(255,255,255,0.45)",
        flexShrink: 0,
        minWidth: 34,
      }}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      {children}
      {label && <span className="dock-label">{label}</span>}
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
}

export default function BottomDock({ onGalleryOpen, onConnectOpen }: BottomDockProps) {
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
        background: "#0c0c12",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        gap: 2,
        overflowX: "auto",
        flexShrink: 0,
      }}
    >
      {/* Home */}
      <DockItem label="Home" ariaLabel="Home" active>
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
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

      {/* Left nav arrow */}
      <DockItem ariaLabel="Previous">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path
            d="M8 2L3 7L8 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </DockItem>

      {/* Temperature */}
      <div
        style={{
          fontSize: 17,
          fontWeight: 400,
          color: "rgba(255,255,255,0.6)",
          padding: "0 6px",
          letterSpacing: "-0.01em",
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
          fontFamily:
            "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        }}
      >
        72°
      </div>

      {/* Right nav arrow */}
      <DockItem ariaLabel="Next">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path
            d="M4 2L9 7L4 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </DockItem>

      {/* Divider */}
      <div
        role="separator"
        style={{
          width: 1,
          height: 24,
          background: "rgba(255,255,255,0.06)",
          margin: "0 4px",
          flexShrink: 0,
        }}
      />

      {/* Phone — Call Us */}
      <DockItem
        label="Call Us"
        ariaLabel="Call Us"
        onClick={() => {
          dockSounds.phone();
          window.location.href = "tel:+18085551234";
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
          router.push("/events");
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
          router.push("/pricing");
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
          router.push("/artist");
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

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right nav arrow */}
      <DockItem ariaLabel="More">
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
