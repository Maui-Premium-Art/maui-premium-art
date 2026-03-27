# Feature #40: Authentic CT UI Layout — Phase 1

## Summary

Rebuild the homepage layout to closely mirror the real Cybertruck touchscreen UI. This is a visual/layout overhaul — no new features, just making existing components look and feel like the actual CT console. Phase 2 (pixel-perfect from maintenance cable captures) is future work.

## Current State

The site already has CT-inspired components (StatusBar, BottomDock, CTMediaPlayer, CTNavigateWidget, VehicleControls, line-connector labels). But they don't match the real CT proportions, typography, or spacing. Key gaps:

- Typography is system fallback (`-apple-system`), not bold italic CT style throughout
- Line-connector labels are hardcoded in HeroArea3D with magic percentages
- No consistent glass panel styling system
- Media player doesn't match CT reference photos (proportions, layout)
- Grid floor and terrain don't match CT's reflective ground plane
- No unified spacing/proportion system based on CT's 2200x1300 display

## Reference Material

- `CT_DISPLAY_SOURCE_BRIEF.md` — authoritative source doc for UI recreation
- `/public/images/ct-ui-reference/media-player-full-display.png` — CT media player reference
- `/public/images/ct-ui-reference/media-player-closeup.png` — CT media player detail
- CT display specs: 18.5" diagonal, 2200x1300px, ~1.69:1 aspect ratio, dark background ~#0a0a0f

## Scope — Phase 1 Only

### In Scope

1. **Typography overhaul** — Bold italic CT-style headings throughout. Define CSS custom properties for consistent font sizes/weights. Use SF Pro Display (system-ui fallback) with bold italic as the signature style.

2. **Line-connector label component** — Extract hardcoded labels from HeroArea3D into a reusable `CTLineLabel` component. Props: `label`, `sublabel`, `position` (top/bottom), `lineHeight`, `style overrides`. Labels become clickable where appropriate (Browse Gallery opens gallery, See Editions opens pricing, Tailgate Art opens newsletter).

3. **Media player proportions** — Adjust CTMediaPlayer to match reference photo proportions: larger album art, different control layout, CT-authentic sizing. Reference photos available for comparison.

4. **Reflective grid floor** — Upgrade current grid floor (48px squares, `rotateX(62deg)`) to match CT's reflective ground plane. Subtle reflection effect under truck, tighter grid lines, perspective depth matching CT screenshots.

5. **Background color** — Shift from `#0a1628` (current blue-tint) to `#0a0a0f` (CT's near-black) across all components. Update StatusBar, dock, and panel backgrounds to match.

6. **Spacing and proportion pass** — Align component sizes to CT's layout grid. StatusBar height, dock height, widget sizes should reference CT's 2200x1300 proportions scaled to viewport.

### Not In Scope (Phase 2 / Future)

- Pixel-perfect recreation from maintenance cable captures
- Custom Tesla font (not available, continue with SF Pro)
- Speed readout, turn signals, climate controls
- Full center console layout (HVAC, seat controls)
- Layout responsive breakpoints (current mobile-first approach stays)

## Architecture

### CSS Custom Properties (new)

Add to `src/app/globals.css` or a new `src/styles/ct-theme.css`:

```css
:root {
  --ct-bg: #0a0a0f;
  --ct-surface: rgba(255,255,255,0.04);
  --ct-glass: rgba(12,12,20,0.85);
  --ct-glass-border: rgba(255,255,255,0.08);
  --ct-text-primary: rgba(255,255,255,0.85);
  --ct-text-secondary: rgba(255,255,255,0.55);
  --ct-text-tertiary: rgba(255,255,255,0.30);
  --ct-label-bold: 700 italic 11px / 1.2 -apple-system, 'SF Pro Display', system-ui, sans-serif;
  --ct-label-light: 400 italic 9px / 1.2 -apple-system, 'SF Pro Text', system-ui, sans-serif;
  --ct-accent: rgba(74,158,255,0.7);
  --ct-glass-blur: blur(16px);
}
```

### Component Changes

| Component | Change |
|-----------|--------|
| `globals.css` | Add CT theme CSS custom properties |
| `page.tsx` | Update background from `#0a1628` to `var(--ct-bg)` |
| `CTLineLabel.tsx` | **New** — reusable line-connector label component |
| `HeroArea3D.tsx` | Replace hardcoded labels with `CTLineLabel`, upgrade grid floor |
| `CTMediaPlayer.tsx` | Proportion/layout adjustments to match reference |
| `StatusBar.tsx` | Background color update, typography consistency |
| `BottomDock.tsx` | Background color update |

### CTLineLabel Component

```typescript
interface CTLineLabelProps {
  label: string;
  sublabel?: string;       // "Open" text above label
  lineHeight?: number;     // vertical connector line height (px)
  position?: "top" | "bottom";  // line above or below label
  onClick?: () => void;
  active?: boolean;
}
```

Renders: sublabel (light italic) + label (bold italic) + vertical line. When `onClick` is provided, the whole label is a button with hover state. When `active`, uses accent color.

## Constraints

- Must work with existing Three.js truck model and art texture system
- Must integrate with existing dock, media player, StatusBar, Miles to Maui
- Monochrome base, color only from art
- No new dependencies
- No heavy assets that slow page load
- Mobile (375px) must not break

## Test Checklist

1. Background color is `#0a0a0f` across all chrome (StatusBar, dock, page)
2. CSS custom properties load correctly
3. CTLineLabel renders with correct typography (bold italic 11px)
4. CTLineLabel onClick triggers associated panel (gallery, pricing, newsletter)
5. HeroArea3D labels use CTLineLabel component
6. Grid floor has updated reflective styling
7. Media player proportions closer to reference photo
8. All existing interactions still work (gallery, connect, pricing, etc.)
9. Mobile viewport (375px) — no overflow, readable
10. Build clean, no TypeScript errors
11. No visual regressions on existing functionality
