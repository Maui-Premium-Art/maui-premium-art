# KAI — CRITICAL DESIGN RESET: Pixel-Perfect CT Display

**From:** Boss + Nalu Strategy
**Priority:** URGENT
**Save this file to your project root AND ~/.openclaw/workspace-kai/**

---

## THE PROBLEM

The current site uses a PHOTO of the CT display embedded in the hero area. This is wrong. Photos are lossy — reflections, compression, moiré artifacts. CT owners will instantly see it's a screenshot, not a real interface. We need to go from "photo of a screen" to "this IS the screen."

## THE FIX

**Every single UI element must be recreated in code.** No photos of the display. No screenshots. The entire CT console experience must be built in React/Tailwind as native HTML/CSS/SVG components.

## WHAT THE CT DISPLAY ACTUALLY LOOKS LIKE (from Boss's truck)

The CT has an 18.5" touchscreen at 2200x1300 resolution. When parked with Controls open, it shows:

### Layout (recreate ALL of this in code):

**Top-left:**
- Battery bar icon (5 bars) + "123 mi" range text
- "Start Self-Driving" button (blue border, rounded, transparent fill)

**Top-center:**
- Row of status icons: user profile, WiFi, "LTE", signal bars, sync icon

**Top-right:**
- Time: "7:31" (large, white)
- Weather: cloud icon + "78°F"
- Mini compass/map widget (small square, red triangle indicator)

**Left side (floating over the dark background):**
- Door icon + "Close Door" text
- Autopilot icon (steering wheel)
- EQ/audio icon

**Center (THE HERO — biggest area):**
- Dark background with subtle grid/checkerboard floor
- Dark mountainous terrain silhouette on the horizon
- 3D Cybertruck model sitting on the grid — REAR TAILGATE facing the viewer
- Art displayed on the tailgate (Mahalo Bird)
- "MAHALO BIRD · EDITION I" text below the truck
- "● 3 / 10 available" below that

**Bottom-left widget:**
- "CHOOSE MEDIA SOURCE" header
- "Slack Key Sessions" title
- "Keola Beamer · Hawaiian Slack Key" subtitle
- Progress bar
- Transport controls: skip back, play, skip forward, EQ, search icons

**Bottom-right widget:**
- "NAVIGATE" header
- Search input: "Search destination"
- Two buttons: "Home" (pin icon) + "Work" (building icon)
- "Kihei, Maui · Hawaii" text
- "ETA — ∞ mi · Aloha"

**Bottom dock (full width):**
- Car icon, left arrow, "72°", right arrow
- Row of app icons: WiFi, phone, gallery, calendar, pin, person, forward arrows, key, globe, settings
- Right arrow at far right

### Colors (exact):
- Background: #0a0a0f (near black)
- Widget backgrounds: #1a1a2e (dark gray-blue)
- Widget borders: #2a2a3e (subtle border)
- Text primary: #ffffff
- Text secondary: #888899
- Self-Driving button border: #3b82f6 (blue)
- Accent: #3b82f6
- Grid lines: #1a1a2e (very subtle)

### Typography:
- Clean sans-serif (use Inter or similar)
- Time: ~32px bold
- Range: ~16px medium
- Widget headers: ~12px uppercase tracking-wide
- Widget content: ~14px regular

## FOR THE TRUCK IN THE CENTER

Do NOT use a photo. Options in order of preference:

1. **SVG illustration** of the CT rear tailgate view — clean, scalable, precise. You already built an SVG truck in a previous commit. Refine it to be more accurate.

2. **Three.js with a community 3D model** from Sketchfab (sketchfab.com/tags/tesla-cybertruck). Load a GLTF model, position camera at rear, apply our art as a texture.

3. **Tesla's official UV template** from github.com/teslamotors/custom-wraps — this gives you the exact panel geometry to map art onto.

## CRITICAL RULES

1. **ZERO photos of displays in the final site.** Every pixel is code.
2. **The site IS the CT display** — not a picture of one.
3. **Test at 2200x1300** to match the real CT screen resolution.
4. **Dark theme is not optional** — the background must be near-black, not gray.
5. **The grid floor and mountain horizon** are essential — they ground the truck in the CT's visual language.
6. **CT owners are the target audience** — they look at this display every day. If anything feels "off" they'll notice instantly.

## DEFINITION OF DONE

- [ ] All UI chrome (status bar, widgets, dock) is React/Tailwind components — no images
- [ ] SVG or 3D truck in the center, rear tailgate view, with Mahalo Bird art
- [ ] Dark grid landscape with mountain horizon behind the truck
- [ ] Looks identical to the real CT display at any screen size
- [ ] No photos of displays anywhere on the page
- [ ] Passes the "CT owner test" — would a real owner double-take thinking it's their truck?

---

**This is THE task. Everything else waits until this is right. Ship it, Kai. 🤙🌺**
