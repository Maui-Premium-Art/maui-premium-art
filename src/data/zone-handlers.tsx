import type { ZoneHandlerMap, Zone } from "@/types/ct-display";
import type { UseHawaiianRadioReturn } from "@/hooks/useHawaiianRadio";

const CT_CUTOUT_BG = "var(--ct-cutout-bg)";

interface HandlerDeps {
  radio: UseHawaiianRadioReturn;
  setEqOpen: (open: boolean) => void;
  setTrackListOpen: (open: boolean) => void;
}

export function createZoneHandlers(deps: HandlerDeps): ZoneHandlerMap {
  const { radio, setEqOpen, setTrackListOpen } = deps;

  return {
    media_album_art: {
      onClick: radio.togglePlay,
      render: (_zone: Zone, _debug: boolean) => (
        <img
          src={radio.currentTrack.artworkImage}
          alt={radio.currentTrack.title}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", borderRadius: 2, display: "block",
          }}
        />
      ),
    },
    media_title: {
      render: (_zone: Zone, _debug: boolean) => (
        <div style={{
          width: "100%", height: "100%",
          background: CT_CUTOUT_BG,
          display: "flex", flexDirection: "column",
          justifyContent: "center", gap: "0.3%",
          overflow: "hidden", paddingLeft: 8, paddingRight: 6,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#3b82f6", flexShrink: 0,
            }} />
            <span style={{
              color: "#fff",
              fontSize: "clamp(9px, 1.1vw, 14px)",
              fontFamily: "'Blender-TSL Medium', system-ui, sans-serif",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {radio.currentTrack.title}
            </span>
          </div>
          <span style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "clamp(7px, 0.85vw, 11px)",
            fontFamily: "'Blender-TSL Medium', system-ui, sans-serif",
            whiteSpace: "nowrap", paddingLeft: 13,
          }}>
            {radio.currentTrack.artist}
          </span>
        </div>
      ),
    },
    media_prev: { onClick: radio.prevTrack },
    media_play: {
      onClick: radio.togglePlay,
      render: (zone: Zone) => (
        radio.isPlaying ? (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: CT_CUTOUT_BG,
          }}>
            <svg
              width={`${Math.min(zone.w_pct * 0.4, 1.8)}vw`}
              height={`${Math.min(zone.h_pct * 0.5, 2.2)}vh`}
              viewBox="0 0 12 14"
              fill="rgba(255,255,255,0.6)"
            >
              <rect x="1" y="1" width="3.5" height="12" rx="0.8" />
              <rect x="7.5" y="1" width="3.5" height="12" rx="0.8" />
            </svg>
          </div>
        ) : null
      ),
    },
    media_next: { onClick: radio.nextTrack },
    media_eq: { onClick: () => setEqOpen(true) },
    media_search: { onClick: () => setTrackListOpen(true) },
    dock_vol_dn: { onClick: radio.volumeDown },
    dock_vol_up: { onClick: radio.volumeUp },
  };
}
