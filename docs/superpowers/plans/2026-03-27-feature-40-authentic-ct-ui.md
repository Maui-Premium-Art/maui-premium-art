# Feature #40: Authentic CT UI Layout — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild homepage visual layer to match real Cybertruck touchscreen: background color, typography, reusable line-connector labels, upgraded grid floor, and media player proportion fixes.

**Architecture:** Add CT theme CSS custom properties to globals.css. Create reusable CTLineLabel component. Update background colors across all chrome. Upgrade grid floor in HeroArea3D. Adjust CTMediaPlayer proportions to match reference photos.

**Tech Stack:** React, TypeScript, Tailwind CSS, CSS custom properties (no new deps)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/globals.css` | Modify | Add CT theme custom properties, update --bg-primary |
| `src/components/console/CTLineLabel.tsx` | Create | Reusable line-connector label (bold italic + vertical line) |
| `src/components/console/HeroArea3D.tsx` | Modify | Replace hardcoded labels with CTLineLabel, upgrade grid floor |
| `src/app/page.tsx` | Modify | Update background color, pass onClick handlers to HeroArea3D labels |
| `src/components/console/CTMediaPlayer.tsx` | Modify | Proportion adjustments to match CT reference |
| `src/components/console/StatusBar.tsx` | Modify | Background color update |
| `src/components/console/BottomDock.tsx` | Modify | Background color update |

---

### Task 1: CT Theme CSS Custom Properties

**Files:**
- Modify: `src/app/globals.css:1-15`

- [ ] **Step 1: Update CSS custom properties**

In `src/app/globals.css`, replace the existing `:root` block (lines 3-15) with updated CT-authentic values:

```css
:root {
  /* CT-authentic colors (Phase 1 — Feature #40) */
  --bg-primary: #0a0a0f;
  --bg-surface: #0c0c14;
  --bg-widget: #0c0c14;
  --border-subtle: rgba(255,255,255,0.08);
  --text-primary: rgba(255,255,255,0.85);
  --text-secondary: rgba(255,255,255,0.55);
  --text-dim: rgba(255,255,255,0.30);
  --accent-blue: rgba(74,158,255,0.7);
  --accent-blue-bg: rgba(74,158,255,0.10);
  --grid-dark: #080810;
  --dock-bg: #08080e;

  /* CT glass panel */
  --ct-glass: rgba(10,10,18,0.85);
  --ct-glass-border: rgba(255,255,255,0.08);
  --ct-glass-blur: blur(16px);

  /* CT typography */
  --ct-font-display: -apple-system, 'SF Pro Display', system-ui, sans-serif;
  --ct-font-text: -apple-system, 'SF Pro Text', system-ui, sans-serif;
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build. Existing components using old hex values (`#14141e`, `#0c0c12`) still work — those were only referenced via variables.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(#40): update CSS custom properties to CT-authentic palette"
```

---

### Task 2: Create CTLineLabel Component

**Files:**
- Create: `src/components/console/CTLineLabel.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/console/CTLineLabel.tsx`:

```tsx
"use client";

interface CTLineLabelProps {
  label: string;
  sublabel?: string;
  lineHeight?: number;
  position?: "top" | "bottom";
  onClick?: () => void;
  active?: boolean;
}

export default function CTLineLabel({
  label,
  sublabel = "Open",
  lineHeight = 50,
  position = "top",
  onClick,
  active = false,
}: CTLineLabelProps) {
  const textColor = active
    ? "var(--accent-blue)"
    : "rgba(255,255,255,0.6)";
  const sublabelColor = active
    ? "rgba(74,158,255,0.5)"
    : "rgba(255,255,255,0.35)";
  const lineColor = active
    ? "rgba(74,158,255,0.3)"
    : "rgba(255,255,255,0.15)";

  const labelContent = (
    <>
      {sublabel && (
        <span
          style={{
            fontSize: 9,
            fontWeight: 400,
            fontStyle: "italic",
            color: sublabelColor,
            display: "block",
            marginBottom: 1,
            fontFamily: "var(--ct-font-text)",
            transition: "color 0.2s ease",
          }}
        >
          {sublabel}
        </span>
      )}
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          fontStyle: "italic",
          color: textColor,
          fontFamily: "var(--ct-font-display)",
          letterSpacing: "0.01em",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </span>
    </>
  );

  const line = (
    <div
      style={{
        width: 1,
        height: lineHeight,
        background: lineColor,
        transition: "background 0.2s ease",
      }}
    />
  );

  const inner = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {position === "top" && labelContent}
      {line}
      {position === "bottom" && labelContent}
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        aria-label={label}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          pointerEvents: "auto",
        }}
      >
        {inner}
      </button>
    );
  }

  return inner;
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build. Component is created but not yet used.

- [ ] **Step 3: Commit**

```bash
git add src/components/console/CTLineLabel.tsx
git commit -m "feat(#40): add reusable CTLineLabel component"
```

---

### Task 3: Replace Hardcoded Labels in HeroArea3D + Upgrade Grid Floor

**Files:**
- Modify: `src/components/console/HeroArea3D.tsx:1-244`

- [ ] **Step 1: Add CTLineLabel import**

At top of `src/components/console/HeroArea3D.tsx`, add:

```typescript
import CTLineLabel from "@/components/console/CTLineLabel";
```

- [ ] **Step 2: Add label callback props to StaticHero**

Update the StaticHero function signature (line 27) to accept label click handlers:

```typescript
function StaticHero({
  artImage,
  startReveal,
  onBrowseGallery,
  onSeeEditions,
  onTailgateArt,
}: {
  artImage: string;
  startReveal: boolean;
  onBrowseGallery?: () => void;
  onSeeEditions?: () => void;
  onTailgateArt?: () => void;
}) {
```

- [ ] **Step 3: Replace hardcoded labels with CTLineLabel**

Replace lines 206-241 (the entire CT-style line connector labels section) with:

```tsx
{/* CT-style line connector labels */}
<div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
  {/* Left: "Browse Gallery" — connects to front */}
  <div style={{ position: "absolute", left: "22%", top: "18%" }}>
    <CTLineLabel
      label="Browse Gallery"
      lineHeight={50}
      position="top"
      onClick={onBrowseGallery}
    />
  </div>

  {/* Center: "See Editions" — connects to tonneau */}
  <div style={{ position: "absolute", left: "52%", top: "14%" }}>
    <CTLineLabel
      label="See Editions"
      lineHeight={60}
      position="top"
      onClick={onSeeEditions}
    />
  </div>

  {/* Right: "Tailgate Art" — connects to rear */}
  <div style={{ position: "absolute", right: "18%", top: "16%" }}>
    <CTLineLabel
      label="Tailgate Art"
      lineHeight={55}
      position="top"
      onClick={onTailgateArt}
    />
  </div>

  {/* Bottom-left: "Art Scale" */}
  <div style={{ position: "absolute", left: "30%", bottom: "18%" }}>
    <CTLineLabel
      label="Art Scale"
      sublabel="Medium"
      lineHeight={30}
      position="bottom"
    />
  </div>
</div>
```

- [ ] **Step 4: Upgrade grid floor**

Replace the grid floor div (lines 171-193) with a tighter, more CT-authentic version:

```tsx
{/* Grid floor — CT-authentic reflective ground plane */}
<div
  style={{
    position: "absolute",
    bottom: 0,
    left: "-30%",
    right: "-30%",
    height: "45%",
    zIndex: 1,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: "36px 36px",
    transform: "perspective(400px) rotateX(65deg)",
    transformOrigin: "bottom center",
    maskImage:
      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
    pointerEvents: "none",
  }}
/>
```

Changes: grid from 48px→36px (tighter), opacity 0.07→0.05 (subtler), perspective 300→400 (deeper), rotateX 62→65 (steeper), mask fade adjusted for more depth.

- [ ] **Step 5: Update HeroArea3D main export to pass label handlers**

Add new props to HeroArea3DProps interface and pass them through:

```typescript
interface HeroArea3DProps {
  artImage?: string;
  startReveal?: boolean;
  artworkTitle?: string;
  artworkIndex?: number;
  artworkCount?: number;
  onPrevArt?: () => void;
  onNextArt?: () => void;
  onBrowseGallery?: () => void;
  onSeeEditions?: () => void;
  onTailgateArt?: () => void;
}
```

Update the function signature and pass handlers to StaticHero:

```tsx
<StaticHero
  artImage={artImage}
  startReveal={startReveal}
  onBrowseGallery={onBrowseGallery}
  onSeeEditions={onSeeEditions}
  onTailgateArt={onTailgateArt}
/>
```

- [ ] **Step 6: Verify build**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build. Labels render identically to before (same fonts, sizes, positions) but now use the shared component.

- [ ] **Step 7: Commit**

```bash
git add src/components/console/HeroArea3D.tsx
git commit -m "feat(#40): replace hardcoded labels with CTLineLabel, upgrade grid floor"
```

---

### Task 4: Wire Label Clicks in page.tsx + Update Background

**Files:**
- Modify: `src/app/page.tsx:62-68,104`

- [ ] **Step 1: Update page background color**

In `src/app/page.tsx`, change the main element background (line 67):

```typescript
// Change:
background: "#0a1628",
// To:
background: "var(--bg-primary)",
```

Also update the header background (line 95):

```typescript
// Change:
background: "#0a1628",
// To:
background: "var(--bg-primary)",
```

- [ ] **Step 2: Pass label handlers to HeroArea**

Update the HeroArea component (line 104) to pass onClick handlers. The "Tailgate Art" label already has `handleTailgateArtClick` — add gallery and pricing:

```tsx
<HeroArea
  artImage={heroArtImage}
  startReveal={splashDone}
  onBrowseGallery={openGallery}
  onSeeEditions={openPricing}
  onTailgateArt={handleTailgateArtClick}
/>
```

Note: These props will combine with the Feature #48 props (artworkTitle, artworkIndex, etc.) when both features are merged. For now, wire just the label handlers.

- [ ] **Step 3: Remove the standalone "Tailgate Art" button from page.tsx**

Delete the entire "Tailgate Art label — opens newsletter signup" section (lines 114-199). This functionality is now handled by the CTLineLabel inside HeroArea3D via the `onTailgateArt` callback.

However, keep the newsletter modal — move it to render at the root level of the content zone, triggered by `newsletterOpen` state:

```tsx
{/* Newsletter signup modal — triggered by Tailgate Art label */}
{newsletterOpen && (
  <div
    role="dialog"
    aria-label="Newsletter signup"
    style={{
      position: "absolute",
      right: 40,
      top: "20%",
      zIndex: 30,
      width: 280,
      background: "var(--ct-glass)",
      backdropFilter: "var(--ct-glass-blur)",
      WebkitBackdropFilter: "var(--ct-glass-blur)",
      border: "1px solid var(--ct-glass-border)",
      borderRadius: 14,
      padding: "20px 16px 16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}
  >
    <button
      onClick={() => setNewsletterOpen(false)}
      aria-label="Close"
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        background: "none",
        border: "none",
        color: "rgba(255,255,255,0.3)",
        fontSize: 16,
        cursor: "pointer",
        padding: "2px 6px",
        lineHeight: 1,
      }}
    >
      x
    </button>
    <div style={{ fontSize: 14, fontWeight: 500, color: "#ffffff", marginBottom: 4, fontFamily: "var(--ct-font-display)" }}>
      Stay in the loop
    </div>
    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 14, lineHeight: 1.5, fontFamily: "var(--ct-font-text)" }}>
      New editions, wrap reveals, and studio drops. No spam.
    </div>
    <NewsletterSignup source="tailgate-art-label" compact />
  </div>
)}
```

- [ ] **Step 4: Verify build**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build. Labels are now interactive — clicking "Browse Gallery" opens gallery, "See Editions" opens pricing, "Tailgate Art" opens newsletter.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(#40): wire label clicks, update background to CT-authentic color"
```

---

### Task 5: Media Player Proportion Adjustments

**Files:**
- Modify: `src/components/console/CTMediaPlayer.tsx:29-60`

- [ ] **Step 1: Update glass panel styling to use CT variables**

Update the outer div style (lines 29-43):

```typescript
// Replace these values:
background: "rgba(12, 26, 46, 0.85)",  // -> "var(--ct-glass)"
backdropFilter: "blur(12px)",           // -> "var(--ct-glass-blur)"
WebkitBackdropFilter: "blur(12px)",     // -> "var(--ct-glass-blur)"
border: "1px solid rgba(255, 255, 255, 0.1)", // -> "1px solid var(--ct-glass-border)"
fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif", // -> "var(--ct-font-text)"
```

- [ ] **Step 2: Increase album art size**

Update the album art img (lines 46-60). Change dimensions from 65x65 to 72x72 to better match CT reference proportions:

```typescript
// Lines 49-50: width/height attributes
width={72}
height={72}

// Lines 53-55: inline styles
width: 72,
minWidth: 72,
height: 72,
```

- [ ] **Step 3: Verify build**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build.

- [ ] **Step 4: Commit**

```bash
git add src/components/console/CTMediaPlayer.tsx
git commit -m "feat(#40): update media player to CT glass styling + larger album art"
```

---

### Task 6: StatusBar + BottomDock Background Updates

**Files:**
- Modify: `src/components/console/StatusBar.tsx`
- Modify: `src/components/console/BottomDock.tsx`

- [ ] **Step 1: Update StatusBar background**

In StatusBar.tsx, find the outer container background color and update any hardcoded `#0a1628` or `#0c0c12` references to `var(--bg-primary)` or `var(--dock-bg)`.

- [ ] **Step 2: Update BottomDock background**

In BottomDock.tsx, find the outer container background and update hardcoded color values to use CSS custom properties (`var(--dock-bg)` or `var(--bg-primary)`).

- [ ] **Step 3: Verify build**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build. All chrome uses unified CT-dark background.

- [ ] **Step 4: Commit**

```bash
git add src/components/console/StatusBar.tsx src/components/console/BottomDock.tsx
git commit -m "feat(#40): unify StatusBar + BottomDock backgrounds to CT palette"
```

---

### Task 7: Integration Test

- [ ] **Step 1: Full visual verification**

Run: `pnpm dev`

Open `http://localhost:3000` and verify:

1. Background is near-black `#0a0a0f` (not blue-tinted)
2. StatusBar, dock, and panels all use unified dark background
3. Line-connector labels render with bold italic typography
4. "Browse Gallery" label click opens gallery panel
5. "See Editions" label click opens pricing panel
6. "Tailgate Art" label click opens newsletter
7. Grid floor is tighter (36px) with more depth perspective
8. Media player album art is larger (72px)
9. Media player uses glass styling (no blue tint)
10. Mobile viewport (375px) — no overflow, labels don't overlap
11. All existing interactions still work (dock, panels, splash, truck rotation)

- [ ] **Step 2: Build verification**

Run: `pnpm build 2>&1 | tail -5`

Expected: Clean build, no warnings.

- [ ] **Step 3: Final commit if any tweaks needed**

```bash
git add -A
git commit -m "feat(#40): authentic CT UI layout — Phase 1 complete"
```
