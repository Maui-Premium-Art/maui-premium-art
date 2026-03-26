# SKILL: Production Frontend Builder
# Version: 1.0 (Mar 25, 2026)
# Agent: Kai (Website Development Agent, Maui Premium Art Ohana)
# Location: /Users/wizardclaw/Projects/maui-premium-art/SKILL.md

## Purpose
Build pixel-perfect, production-grade frontend features from design specifications.
Execute Hulali Lā's design specs using Superpowers `/execute-plan` for structured, reliable implementation.

## Core Principles
1. **Build from specs, not guesses.** Every feature has a Kūpono tech spec + Hulali Lā design spec. Read both before writing code.
2. **Server Components first.** Default to RSC. Only use `"use client"` when the component needs interactivity, browser APIs, or React hooks.
3. **Tailwind + CSS variables only.** No inline styles, no CSS-in-JS, no hardcoded hex values.
4. **Mobile-first.** Build for 375px first, then scale up. Test at 375, 428, 768, 1024, 1440px.
5. **Accessibility is mandatory.** Every interactive element gets ARIA labels, keyboard support, and focus management.
6. **Small commits, clear messages.** One logical change per commit. Message format: `feat:`, `fix:`, `refactor:`, `style:`.

## Tech Stack
- **Framework:** Next.js 15 App Router / React 19 / TypeScript (strict)
- **Styling:** Tailwind CSS v4 + CSS custom properties (`--color-*`, `--space-*`, `--duration-*`)
- **Animation:** Framer Motion (layout transitions, panels), CSS scroll-driven animations, View Transitions API
- **Components:** shadcn/ui (forms, dialogs, tooltips, toasts)
- **3D:** Three.js + GLTFLoader (cybertruck.glb, 276KB, draco compressed)
- **Images:** Next.js Image component (WebP auto-conversion, responsive srcset, lazy loading)
- **Payments:** Stripe Checkout (test mode)
- **Fonts:** SF Pro / system-ui stack
- **Package manager:** pnpm
- **Deployment:** Vercel (auto-deploy from main)

## Commands

### /execute-plan [feature name]
Use Superpowers `/execute-plan` with Hulali Lā's design spec as input.

**Build sequence:**
1. Read Kūpono's tech spec: `/Users/Shared/KuponoOps/specs/SPEC-[feature].md`
2. Read Hulali Lā's design spec: `/Users/Shared/HulaliLaOps/specs/DESIGN-SPEC-[feature].md`
3. Create feature branch: `git checkout -b feat/[feature-name]`
4. Build components bottom-up: Atoms → Molecules → Organisms → Pages
5. Apply design tokens from spec (CSS variables, Tailwind classes)
6. Implement all interactive states (hover, active, focus, disabled, error)
7. Add motion/animations per spec (with reduced-motion fallbacks)
8. Implement accessibility (ARIA, keyboard nav, focus management)
9. Test build: `pnpm build` (must be clean)
10. Commit, push, post DONE to #website with commit hash

### /fix-bug [bug number]
1. Read bug description from BUG_TRACKER.md
2. Reproduce the issue
3. Identify root cause
4. Fix with minimal changes (don't refactor unrelated code)
5. Verify fix doesn't regress other features
6. `pnpm build` — must be clean
7. Commit with message: `fix: BUG-[number] — [description]`
8. Post DONE to #website: `FIXED — BUG-[number] ([commit hash])`

### /self-qa [before posting DONE]
Pre-submission checklist (run before claiming DONE):
- [ ] `pnpm build` passes with zero errors
- [ ] `pnpm lint` passes
- [ ] Feature matches design spec visually (desktop + mobile)
- [ ] All interactive states work (hover, click, focus, escape)
- [ ] Keyboard navigation works (Tab through all elements)
- [ ] No console errors in browser dev tools
- [ ] No hardcoded values (use CSS variables and Tailwind)
- [ ] No `any` types in TypeScript
- [ ] Responsive at 375px, 768px, 1440px minimum
- [ ] Images optimized (Next.js Image component, <500KB each)
- [ ] Commit message follows convention

## Code Patterns

### Component Structure
```typescript
// Server Component (default — no "use client")
export default function FeatureName() {
  return <div className="...">...</div>;
}

// Client Component (only when needed)
"use client";
import { useState } from "react";
export default function InteractiveFeature() {
  const [state, setState] = useState(initial);
  return <div>...</div>;
}
```

### Design Token Usage
```css
/* Always use CSS variables — never hardcode */
color: var(--color-text-primary);       /* not: #ffffff */
gap: var(--space-4);                    /* not: 16px */
transition-duration: var(--duration-medium); /* not: 300ms */
font-family: var(--font-sans);          /* not: 'SF Pro' */
```

### Animation Pattern
```tsx
// Always include reduced-motion fallback
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="motion-reduce:transform-none motion-reduce:transition-none"
>
```

### Panel Pattern (CT Dashboard UI)
```tsx
// Slide-up panel (from dock)
// Slide-in panel (from right rail)
// Art zoom takeover (fills viewport)
// All panels: backdrop blur, close on Escape, trap focus inside
```

## Anti-Patterns to Avoid
- **Building without a spec:** Always read Kūpono + Hulali Lā specs first
- **Hardcoded values:** Use CSS variables and Tailwind utilities
- **Skipping accessibility:** Every PR needs ARIA, keyboard, focus management
- **Giant commits:** One feature per commit, meaningful messages
- **CSS-in-JS:** Use Tailwind + CSS variables only
- **Ignoring mobile:** Test at 375px FIRST, then scale up
- **`any` type:** Explicitly type all props, state, and data
- **Client Components for static content:** RSC is the default
- **Decorative-only motion:** Every animation serves a UX purpose

## Workflow
1. Receive spec notification from Hulali Lā via Discord #website
2. Read BOTH specs (tech + design)
3. Create feature branch
4. Build with `/execute-plan`
5. Run `/self-qa`
6. Post DONE to #website with commit hash
7. Wait for Nalu QA verdict in #ops
8. If CHANGES NEEDED → fix and re-submit
9. Pick next feature from FEATURE_PIPELINE.md
