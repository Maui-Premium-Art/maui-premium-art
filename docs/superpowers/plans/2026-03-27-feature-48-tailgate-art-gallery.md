# Feature #48: Tailgate Art Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add prev/next arrow controls on the 3D truck hero area so users can cycle through all art pieces, with dynamic caption and pagination.

**Architecture:** Lift art selection from a string (`heroArtImage`) to an index (`heroArtIndex`) in page.tsx. Derive the image path from `artworks[index]`. Pass index, metadata, and prev/next callbacks to HeroArea3D, which renders arrow buttons and dynamic caption. GalleryCarousel syncs via index instead of image path.

**Tech Stack:** React, TypeScript, Three.js (no new deps)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/page.tsx` | Modify | Replace `heroArtImage` string with `heroArtIndex` number, add prev/next callbacks, update HeroArea + GalleryCarousel props |
| `src/components/console/HeroArea3D.tsx` | Modify | Accept new props, render arrow buttons + dynamic caption/pagination |
| `src/components/console/GalleryCarousel.tsx` | Modify | Change `onArtImageChange` to `onArtIndexChange`, pass index instead of image string |

No new files. No changes to CybertruckThreeViewer (already responds to `artImage` prop changes).

---

### Task 1: Refactor page.tsx — index-based art state

**Files:**
- Modify: `src/app/page.tsx:3,13-14,22,33-34,58-60,104-105`

- [ ] **Step 1: Add artworks import and replace heroArtImage with heroArtIndex**

In `src/app/page.tsx`, add the import and refactor state:

```typescript
// Line 3: add artworks import
import { artworks } from "@/data/artworks";

// Lines 33-34: Replace heroArtImage string state with index
// DELETE:
//   const [heroArtImage, setHeroArtImage] = useState("/images/mahalo-bird/electric-prr-hummingbird.jpg");
// REPLACE WITH:
const [heroArtIndex, setHeroArtIndex] = useState(0);
const heroArtImage = artworks[heroArtIndex].tailgateImage;
```

- [ ] **Step 2: Add prevArt/nextArt callbacks**

Replace the `handleTailgateArtClick` callback (lines 58-60) and add art cycling:

```typescript
// DELETE handleTailgateArtClick (lines 58-60)

// ADD these two callbacks after closeArtZoom:
const prevArt = useCallback(() => {
  setHeroArtIndex((i) => (i - 1 + artworks.length) % artworks.length);
}, []);

const nextArt = useCallback(() => {
  setHeroArtIndex((i) => (i + 1) % artworks.length);
}, []);
```

- [ ] **Step 3: Update HeroArea props**

Change line 104 from:
```tsx
<HeroArea artImage={heroArtImage} startReveal={splashDone} />
```
To:
```tsx
<HeroArea
  artImage={heroArtImage}
  startReveal={splashDone}
  artworkTitle={artworks[heroArtIndex].title}
  artworkIndex={heroArtIndex}
  artworkCount={artworks.length}
  onPrevArt={prevArt}
  onNextArt={nextArt}
/>
```

- [ ] **Step 4: Update GalleryCarousel props**

Change line 105 from:
```tsx
<GalleryCarousel open={galleryOpen} onClose={closeGallery} onArtSelect={handleArtSelect} onArtImageChange={setHeroArtImage} />
```
To:
```tsx
<GalleryCarousel open={galleryOpen} onClose={closeGallery} onArtSelect={handleArtSelect} onArtIndexChange={setHeroArtIndex} />
```

- [ ] **Step 5: Verify build compiles**

Run: `pnpm build 2>&1 | tail -5`

Expected: Build will fail because HeroArea3D and GalleryCarousel don't accept the new props yet. That's fine — confirms page.tsx is wired correctly and the only errors are in downstream components.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(#48): refactor page.tsx to index-based art state with prev/next"
```

---

### Task 2: Update GalleryCarousel — sync via index

**Files:**
- Modify: `src/components/console/GalleryCarousel.tsx:16-41`

- [ ] **Step 1: Change prop from onArtImageChange to onArtIndexChange**

In `src/components/console/GalleryCarousel.tsx`, update the interface and destructuring:

```typescript
// Lines 16-21: Update interface
interface GalleryCarouselProps {
  open: boolean;
  onClose: () => void;
  onArtSelect?: (slug: string) => void;
  onArtIndexChange?: (index: number) => void;
}

// Line 23: Update destructuring
export default function GalleryCarousel({ open, onClose, onArtSelect, onArtIndexChange }: GalleryCarouselProps) {
```

- [ ] **Step 2: Update prev/next callbacks to pass index**

```typescript
// Lines 27-33: Update prev callback
const prev = useCallback(() => {
  setIndex((i) => {
    const newIndex = i === 0 ? GALLERY_ITEMS.length - 1 : i - 1;
    onArtIndexChange?.(newIndex);
    return newIndex;
  });
}, [onArtIndexChange]);

// Lines 35-41: Update next callback
const next = useCallback(() => {
  setIndex((i) => {
    const newIndex = i === GALLERY_ITEMS.length - 1 ? 0 : i + 1;
    onArtIndexChange?.(newIndex);
    return newIndex;
  });
}, [onArtIndexChange]);
```

- [ ] **Step 3: Verify build compiles**

Run: `pnpm build 2>&1 | tail -5`

Expected: Build may still warn about HeroArea3D props (Task 3 fixes that). GalleryCarousel should compile clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/console/GalleryCarousel.tsx
git commit -m "feat(#48): GalleryCarousel syncs art via index instead of image path"
```

---

### Task 3: Update HeroArea3D — arrow controls + dynamic caption

**Files:**
- Modify: `src/components/console/HeroArea3D.tsx:248-327`

- [ ] **Step 1: Update HeroArea3DProps interface**

Replace lines 248-251:

```typescript
interface HeroArea3DProps {
  artImage?: string;
  startReveal?: boolean;
  artworkTitle?: string;
  artworkIndex?: number;
  artworkCount?: number;
  onPrevArt?: () => void;
  onNextArt?: () => void;
}
```

- [ ] **Step 2: Update component signature**

Replace line 253:

```typescript
export default function HeroArea3D({
  artImage = "/images/mahalo-bird/electric-prr-hummingbird.jpg",
  startReveal = false,
  artworkTitle = "Mahalo Bird",
  artworkIndex = 0,
  artworkCount = 1,
  onPrevArt,
  onNextArt,
}: HeroArea3DProps) {
```

- [ ] **Step 3: Add arrow buttons overlay**

After the `<StaticHero>` component (line 256), add the arrow controls overlay. This sits at zIndex 4, above the labels (zIndex 3). The overlay is `pointerEvents: "none"` so OrbitControls still work, but each button is `pointerEvents: "auto"`.

```tsx
{/* Art navigation arrows */}
{onPrevArt && onNextArt && (
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 4,
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
    }}
  >
    <button
      onClick={onPrevArt}
      aria-label="Previous artwork"
      style={{
        pointerEvents: "auto",
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M12 4L6 10L12 16" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
    <button
      onClick={onNextArt}
      aria-label="Next artwork"
      style={{
        pointerEvents: "auto",
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M8 4L14 10L8 16" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
)}
```

- [ ] **Step 4: Replace hardcoded caption with dynamic content**

Replace the caption section (lines 274-304). The `artworkTitle` prop replaces "Mahalo Bird - Edition I". Pagination dots are generated from `artworkCount`. Counter text is dynamic.

```tsx
{/* Dynamic artwork caption */}
<span
  style={{
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
    fontWeight: 600,
  }}
  aria-live="polite"
>
  {artworkTitle} · Edition I
</span>

{/* Dynamic pagination dots */}
<div style={{ display: "flex", gap: 5, alignItems: "center" }}>
  {Array.from({ length: artworkCount }, (_, i) => (
    <div
      key={i}
      role="tab"
      aria-selected={i === artworkIndex}
      aria-label={`Artwork ${i + 1}`}
      style={{
        width: i === artworkIndex ? 8 : 6,
        height: i === artworkIndex ? 8 : 6,
        borderRadius: "50%",
        background: i === artworkIndex ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
        transition: "all 0.2s ease",
      }}
    />
  ))}
</div>

<span
  style={{
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.08em",
    fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
  }}
>
  {artworkIndex + 1} of {artworkCount} · @Maui_PremiumArt
</span>
```

- [ ] **Step 5: Add hover styles via inline CSS**

Add a `<style>` block inside the component (after the attribution div, before the closing `</div>`) for arrow hover effects:

```tsx
<style>{`
  [aria-label="Previous artwork"]:hover svg path,
  [aria-label="Next artwork"]:hover svg path {
    stroke: rgba(255,255,255,0.6);
  }
  [aria-label="Previous artwork"] svg path,
  [aria-label="Next artwork"] svg path {
    transition: stroke 0.2s ease;
  }
`}</style>
```

- [ ] **Step 6: Build and verify**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build, no TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/console/HeroArea3D.tsx
git commit -m "feat(#48): add art navigation arrows + dynamic caption to HeroArea3D"
```

---

### Task 4: Integration test — full art cycling

- [ ] **Step 1: Manual verification checklist**

Run the dev server and verify each item:

```bash
pnpm dev
```

Open `http://localhost:3000` and check:

1. After splash + reveal, arrows visible on left/right of truck
2. Click right arrow — tailgate texture changes, caption updates, dots shift
3. Click left arrow — cycles backward
4. Click right arrow 10 times — wraps back to first artwork
5. Click left arrow from first artwork — wraps to last
6. Open Gallery panel — select different art — hero updates, arrows still work
7. After gallery selection, arrows continue cycling from that position
8. Drag-rotate truck — arrows don't interfere with OrbitControls
9. Click arrows — they don't trigger drag
10. Mobile viewport (375px) — arrows visible and tappable

- [ ] **Step 2: Build verification**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build, static pages generated, no warnings.

- [ ] **Step 3: Final commit (if any tweaks needed)**

```bash
git add -A
git commit -m "feat(#48): tailgate art gallery — navigation + dynamic caption complete"
```
