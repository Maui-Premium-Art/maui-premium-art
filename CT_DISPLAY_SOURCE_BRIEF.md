# CT DISPLAY SOURCE FILES — Research Brief for Kai
**From:** Nalu 🌊 (Campaign Ops)
**Date:** March 12, 2026
**Priority:** HIGH — current photos are too lossy for pixel-perfect replication

---

## THE PROBLEM

Photos of the CT touchscreen are lossy — reflections, moiré, compression artifacts. CT owners will immediately notice if the UI doesn't feel exact. We need source-quality assets, not photographs.

---

## SOLUTION 1: BUILT-IN SCREENSHOT FEATURE (Boss can do this TODAY)

Tesla's Owner's Manual confirms the Cybertruck has a built-in bug report feature that captures screen screenshots at native resolution:

**Method:** Say "Bug Report" or "Report" followed by any comment via voice command. The Cybertruck takes a snapshot of its systems including **screen captures of the touchscreen** at native resolution (2200x1300 on the 18.5" display).

**The catch:** These screenshots are sent to Tesla internally — they're not saved to USB. However, this confirms the system CAN capture the screen digitally.

**Alternative screenshot method (try this):** Long-press the car icon in the bottom-left corner of the touchscreen. Some Tesla models save screenshots to internal storage. Or try holding both scroll wheels — some owners report this captures screenshots.

**Boss: Try all three in your CT and let us know what happens. Even if we can't access the files directly, knowing the capability exists opens doors.**

---

## SOLUTION 2: TESLA'S OFFICIAL 3D MODEL + UV TEMPLATES (BEST SOURCE)

**Tesla has an official GitHub repo:** https://github.com/teslamotors/custom-wraps

This contains:
- Official UV mapping templates for the Cybertruck (1024x768 PNG)
- The template shows the exact panel geometry of the CT body
- Used by Tesla's Paint Shop feature (Toybox → Paint Shop → Wraps)
- This is the SAME 3D model Tesla uses in the vehicle's own display

**What this means for us:**
- The 3D Cybertruck model in the CT's UI is Tesla's own asset
- The community has been extracting and reverse-engineering these models
- Sites like tesla-wrap.design and teslawrapgallery.com have working 3D CT visualizers

**Action for Kai:**
1. Clone https://github.com/teslamotors/custom-wraps
2. Study the Cybertruck UV template — this IS the source geometry
3. Check tesla-wrap.design — they have a browser-based 3D CT renderer
4. The 3D model from the CT's own display may be extractable from the Tesla app/firmware

---

## SOLUTION 3: COMMUNITY 3D MODELS

Multiple high-quality Cybertruck 3D models available:

- **Sketchfab:** sketchfab.com/tags/tesla-cybertruck — free downloadable 3D models
- **GrabCAD:** grabcad.com/library/tag/cybertruck — CAD-quality models
- **Tesla Wrap Gallery:** teslawrapgallery.com/visualizer/ — browser-based 3D preview with Tesla's UV mapping
- **tesla-wrap.design** — another 3D visualizer using Tesla's geometry

These can be loaded into Three.js (which is in Kai's tech stack) for the website.

---

## SOLUTION 4: RECREATE THE UI CHROME IN CODE (RECOMMENDED FOR UI ELEMENTS)

For the dashboard UI elements (status bar, dock, media player, nav widget, etc.), photos are the WRONG reference method entirely. These are simple UI components:

- Text (fonts, sizes, colors)
- Icons (SVG)
- Borders and backgrounds (CSS)
- Layout (flexbox/grid)

**Kai should recreate every UI element in React/Tailwind.** This will be sharper than any photo at any resolution. The photos serve as DESIGN REFERENCE only — not as image assets.

For exact measurements:
- CT display: 18.5" diagonal, 2200x1300 pixels
- Aspect ratio: ~1.69:1 (close to 16:9)
- Dark theme: background approximately #0a0a0f
- Text: white/light gray, clean sans-serif (likely a custom Tesla font similar to Inter or Gotham)

---

## SOLUTION 5: BOSS'S CT + USB CUSTOM WRAP METHOD (Bonus)

Boss owns a Cybertruck. We can use the Paint Shop feature to test our art ON THE ACTUAL CT DISPLAY:

1. Create a custom wrap using Tesla's template from the GitHub repo
2. Apply Mahalo Bird art to the template
3. Load onto USB drive in a `/Wraps` folder
4. Plug into CT, navigate to Toybox → Paint Shop → Wraps
5. Apply the wrap to the 3D model on the CT's actual screen

**This doubles as a marketing asset** — we can photograph/video our actual art displayed on the CT's own screen using its own 3D model. This is product-market fit validation in real-time.

---

## RECOMMENDED APPROACH FOR KAI

1. **UI chrome (status bar, dock, widgets):** Recreate entirely in code using React/Tailwind. Don't use images. Reference the photos for layout/proportions only.

2. **3D Cybertruck model:** Use Three.js with a community 3D model from Sketchfab or GrabCAD. For v1 (static), a high-quality SVG or PNG render of the rear tailgate view is fine.

3. **Art on the truck:** Use Tesla's official UV template from the custom-wraps GitHub repo to map our art accurately onto the CT body geometry.

4. **Dark grid landscape:** Recreate in CSS/Three.js — it's a simple checkerboard pattern with a dark gradient horizon.

5. **For exact pixel reference:** Boss will attempt the built-in screenshot methods from the CT.

---

## KEY LINKS

| Resource | URL |
|----------|-----|
| Tesla Custom Wraps (official) | https://github.com/teslamotors/custom-wraps |
| Tesla Wrap Gallery (3D visualizer) | https://teslawrapgallery.com/visualizer/ |
| Tesla Wrap Designer | https://tesla-wrap.design/ |
| Sketchfab CT models | https://sketchfab.com/tags/tesla-cybertruck |
| GrabCAD CT models | https://grabcad.com/library/tag/cybertruck |
| CT display specs | 18.5", 2200x1300, ~1.69:1 aspect ratio |
| CT Owner's Manual (touchscreen) | https://www.tesla.com/ownersmanual/cybertruck/en_us/GUID-9A3B88F2-55FA-46C7-9ACA-6236EB8487F8.html |

---

**Bottom line: Don't try to pixel-match from photos. Recreate the UI in code, use Tesla's own 3D assets for the truck, and use the official UV templates for art mapping. That's how we get 100%, not 90%.** 🤙🌺
