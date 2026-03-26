"use client";

import { useState, useEffect } from "react";

const MAUI_LAT = 20.7644;
const MAUI_LON = -156.4450;
const EARTH_RADIUS_MILES = 3959;
const MAX_DISTANCE = 8000;
const TOTAL_MARKS = 10;
const CACHE_KEY = "miles-to-maui";

export function milesToMaui(lat: number, lon: number): number {
  const dLat = ((MAUI_LAT - lat) * Math.PI) / 180;
  const dLon = ((MAUI_LON - lon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat * Math.PI) / 180) *
      Math.cos((MAUI_LAT * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return Math.round(
    EARTH_RADIUS_MILES * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
}

export function calculateLitMarks(distance: number): number {
  return Math.max(1, Math.round((1 - distance / MAX_DISTANCE) * TOTAL_MARKS));
}

export function formatDistance(miles: number): string {
  return miles.toLocaleString("en-US");
}

export interface UseMilesToMauiReturn {
  distance: number | null;
  litMarks: number;
  loading: boolean;
  error: boolean;
}

export function useMilesToMaui(): UseMilesToMauiReturn {
  const [state, setState] = useState<UseMilesToMauiReturn>({
    distance: null,
    litMarks: 10,
    loading: true,
    error: false,
  });

  useEffect(() => {
    // Check sessionStorage cache
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { distance, litMarks } = JSON.parse(cached);
        setState({ distance, litMarks, loading: false, error: false });
        return;
      }
    } catch {
      // sessionStorage unavailable (incognito) — continue to fetch
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        const { latitude, longitude } = data;
        if (typeof latitude !== "number" || typeof longitude !== "number") {
          throw new Error("Missing coordinates");
        }
        const distance = milesToMaui(latitude, longitude);
        const litMarks = calculateLitMarks(distance);

        // Cache result
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ distance, litMarks, timestamp: Date.now() })
          );
        } catch {
          // sessionStorage write failed — continue without caching
        }

        setState({ distance, litMarks, loading: false, error: false });
      })
      .catch(() => {
        setState({ distance: null, litMarks: 10, loading: false, error: true });
      })
      .finally(() => {
        clearTimeout(timeout);
      });

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  return state;
}
