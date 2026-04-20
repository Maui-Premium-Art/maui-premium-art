"use client";

import { useCallback } from "react";
import type { CTDisplayManifest, ZoneHandlerMap, Zone } from "@/types/ct-display";

interface CTZoneRendererProps {
  zones: CTDisplayManifest;
  debug: boolean;
  handlers: ZoneHandlerMap;
}

/** Parse manifest — handles both flat format and Zone Editor wrapper { zones, alignGroups } */
export function parseManifest(raw: unknown): CTDisplayManifest {
  if (raw && typeof raw === "object" && "zones" in raw) {
    return (raw as { zones: CTDisplayManifest }).zones;
  }
  return raw as CTDisplayManifest;
}

/** Zones with onClick handlers that get tab stops. media_title has render-only (no onClick), so excluded. */
const HANDLER_ZONE_NAMES = new Set([
  "media_album_art", "media_prev", "media_play", "media_next",
  "media_eq", "media_search", "dock_vol_dn", "dock_vol_up",
]);

function getDebugColor(zone: Zone): { fill: string; outline: string } {
  if (zone.zone_type) {
    return {
      fill: "rgba(34,197,94,0.12)",
      outline: "1px solid rgba(34,197,94,0.7)",
    };
  }
  if (zone.pointer) {
    return {
      fill: "rgba(239,68,68,0.12)",
      outline: "1px solid rgba(239,68,68,0.7)",
    };
  }
  return {
    fill: "rgba(59,130,246,0.12)",
    outline: "1px solid rgba(59,130,246,0.7)",
  };
}

export function CTZoneRenderer({ zones, debug, handlers }: CTZoneRendererProps) {
  const zoneEntries = Object.entries(zones);
  const zoneCount = zoneEntries.length;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, onClick?: () => void) => {
      if (onClick && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick();
      }
    },
    []
  );

  return (
    <>
      {zoneEntries.map(([name, zone], index) => {
        const handler = handlers[name];
        const hasHandler = !!handler?.onClick;
        const isTabStop = HANDLER_ZONE_NAMES.has(name);
        const debugColor = debug ? getDebugColor(zone) : null;

        return (
          <div
            key={name}
            title={zone.title}
            role={hasHandler ? "button" : undefined}
            aria-label={hasHandler ? zone.title : undefined}
            aria-hidden={hasHandler ? undefined : true}
            tabIndex={isTabStop ? 0 : undefined}
            onClick={handler?.onClick}
            onKeyDown={hasHandler ? (e) => handleKeyDown(e, handler.onClick) : undefined}
            style={{
              position: "absolute",
              left: `${zone.x_pct}%`,
              top: `${zone.y_pct}%`,
              width: `${zone.w_pct}%`,
              height: `${zone.h_pct}%`,
              cursor: zone.pointer ? "pointer" : "default",
              zIndex: 5,
              overflow: "hidden",
            }}
          >
            {/* Handler render content */}
            {handler?.render?.(zone, debug)}

            {/* Debug overlay — renders ON TOP of content */}
            {debug && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: debugColor?.fill,
                  outline: debugColor?.outline,
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Debug label — zone name above the zone */}
            {debug && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -14,
                  left: 0,
                  fontSize: 9,
                  fontFamily: "var(--debug-font)",
                  color: "var(--debug-label-text)",
                  background: "var(--debug-label-bg)",
                  padding: "1px 4px",
                  borderRadius: 2,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  lineHeight: 1.3,
                }}
              >
                <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{index + 1}.</span> {name}
              </div>
            )}

          </div>
        );
      })}

      {/* Debug banner */}
      {debug && (
        <div
          role="status"
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            fontSize: 12,
            fontFamily: "var(--debug-font)",
            color: "var(--debug-banner-text)",
            background: "var(--debug-banner-bg)",
            border: "1px solid rgba(239,68,68,0.5)",
            borderRadius: 4,
            padding: "6px 16px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            maxWidth: "calc(100% - 32px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          DEBUG MODE — press D to toggle — {zoneCount} zones mapped
        </div>
      )}

      {/* Screen reader announcement for debug toggle */}
      <div aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
        {debug ? "Debug mode on" : "Debug mode off"}
      </div>
    </>
  );
}
