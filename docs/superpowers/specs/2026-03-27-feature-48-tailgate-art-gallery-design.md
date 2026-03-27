# Feature #48: Tailgate Art Gallery on 3D Truck

## Summary

Add prev/next art navigation controls to the 3D truck hero area. When the cinematic reveal finishes (tailgate faces camera), users cycle through all 9 art pieces using arrow buttons. Each selection updates the Three.js tailgate texture in real time. Art title and pagination update dynamically.

## Current State

- Art texture swap already works (Feature #37): `heroArtImage` in page.tsx → HeroArea3D → CybertruckThreeViewer → TextureLoader applies to SolarTexture/SolarTextureWIP materials
- `artworks.ts` has 10 artworks with `tailgateImage` paths in `/images/tailgate-art/`
- GalleryCarousel can change art via `onArtImageChange` callback
- HeroArea3D caption is hardcoded ("Mahalo Bird - Edition I", "3 of 10")
- No prev/next controls exist on the hero area

## Architecture

### Approach: Lift art index to page.tsx, add arrow controls to HeroArea3D

State lives in page.tsx (already owns heroArtImage). HeroArea3D receives callbacks + metadata. No new components needed.

### Data Flow

```
User clicks prev/next arrow
  -> page.tsx cycles heroArtIndex (wraps 0-9)
  -> derives heroArtImage from artworks[index].tailgateImage
  -> HeroArea3D receives new artImage + metadata props
  -> CybertruckThreeViewer TextureLoader swaps texture
  -> Caption + pagination update
```

## Changes

### 1. page.tsx — State refactor

- Replace `heroArtImage: string` state with `heroArtIndex: number` (default 0)
- Derive `heroArtImage` from `artworks[heroArtIndex].tailgateImage`
- Add `prevArt` callback: `setHeroArtIndex(i => (i - 1 + artworks.length) % artworks.length)`
- Add `nextArt` callback: `setHeroArtIndex(i => (i + 1) % artworks.length)`
- Pass to HeroArea3D: `artImage`, `artworkTitle`, `artworkIndex`, `artworkCount`, `onPrevArt`, `onNextArt`
- GalleryCarousel `onArtImageChange` becomes `onArtIndexChange(index: number)` so gallery and hero arrows stay in sync

### 2. HeroArea3D.tsx — New props + dynamic UI

**New props:**
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

**Arrow controls:**
- Positioned on a `pointerEvents: "none"` overlay div at zIndex 4 (above labels at zIndex 3)
- Left arrow: absolute, left 8%, vertically centered
- Right arrow: absolute, right 8%, vertically centered
- Each button: `pointerEvents: "auto"` so clicks register without blocking OrbitControls drag
- Styling: simple `<` `>` SVG chevrons, 40x40px tap target
- Color: `rgba(255,255,255,0.3)` default, `rgba(255,255,255,0.6)` hover
- Transition: 0.2s ease on color
- Monochrome CT aesthetic, no background fill

**Dynamic caption (replaces hardcoded):**
- Title: `artworkTitle` (e.g., "Mahalo Bird - Edition I")
- Pagination dots: render `artworkCount` dots, active dot at `artworkIndex`
- Counter: `"{index + 1} of {count} - @Maui_PremiumArt"`

### 3. GalleryCarousel.tsx — Sync with index

- Change `onArtImageChange` prop to `onArtIndexChange: (index: number) => void`
- When user selects art in gallery, find its index in artworks array and call `onArtIndexChange(index)`
- This keeps gallery and hero arrows in sync

### 4. CybertruckThreeViewer.tsx — No changes

Texture loading already responds to `artImage` prop changes. No modifications needed.

## Styling

- Arrows: monochrome, CT dashboard aesthetic
- No background panels or cards on the arrows
- Match existing label opacity levels (0.3 idle, 0.6 active)
- SF Pro Display / system-ui font stack for caption
- All transitions 0.2-0.3s ease

## Accessibility

- Arrow buttons: `aria-label="Previous artwork"` / `"Next artwork"`
- Pagination dots container: `role="tablist"`, each dot `role="tab"` with `aria-selected`
- Caption region: `aria-live="polite"` for screen reader announcements on art change
- Minimum 44px tap target on arrows (WCAG 2.5.5)

## Not In Scope

- Touch swipe gestures (Lono confirmed: "nice but not required")
- Auto-play / slideshow mode
- Keyboard arrow key navigation
- Animated texture transitions (instant swap is fine)
- Preloading all 10 textures (load on demand)

## Test Checklist

1. Arrows cycle through all 10 artworks (forward + backward)
2. Index wraps: last -> first, first -> last
3. Tailgate texture updates on each click
4. Caption title updates to match current artwork
5. Pagination dots reflect current position
6. Gallery carousel selection syncs hero index
7. Hero arrow selection syncs if gallery is reopened
8. Arrows don't interfere with OrbitControls drag-rotate
9. OrbitControls drag doesn't trigger arrow clicks
10. Arrows visible and tappable on mobile (375px)
11. aria-labels present on all interactive elements
12. Build clean, no TypeScript errors
13. No console errors during art cycling
