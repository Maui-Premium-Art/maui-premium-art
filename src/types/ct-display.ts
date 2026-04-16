import type { ReactNode } from "react";

/** A single zone in the CT display manifest */
export interface Zone {
  /** X position as percentage of display width (0-100) */
  x_pct: number;
  /** Y position as percentage of display height (0-100) */
  y_pct: number;
  /** Width as percentage of display width (0-100) */
  w_pct: number;
  /** Height as percentage of display height (0-100) */
  h_pct: number;
  /** Human-readable label (e.g., "Play", "71°", "Open Frunk") */
  title: string;
  /** true = interactive (cursor: pointer), false = decorative */
  pointer: boolean;
  /** Rendering mode. Absent = "hotspot" (invisible overlay). */
  zone_type?: "solid_cutout" | "transparent_cutout" | "hotspot";
}

/** The full manifest — keyed by zone name */
export type CTDisplayManifest = Record<string, Zone>;

/** Handler entry for a single zone */
export interface ZoneHandler {
  /** Click handler — called when zone is clicked */
  onClick?: () => void;
  /** Custom render function — replaces default empty div content */
  render?: (zone: Zone, debug: boolean) => ReactNode;
}

/** Registry mapping zone names to their handlers */
export type ZoneHandlerMap = Record<string, ZoneHandler>;
