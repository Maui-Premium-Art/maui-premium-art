# Git Policy — Maui Premium Art

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production — always deployable, always on Vercel |
| `dev`  | Active development — all new work goes here |

**Workflow:** `dev` → test → merge to `main` → auto-deploys to Vercel

## Tags (Checkpoints)

Tag format: `vX.Y` — increment Y for features, X for major overhauls.

| Tag | State |
|-----|-------|
| v0.1 | Initial scaffold |
| v0.2 | CT dashboard shell — splash, console, widgets |
| v0.3 | Artists spotlight section |
| v0.4 | Artists redesign — Juan anchors top |

**Rule:** Tag before any major redesign or structural change.

## To Restore a Prior State

```bash
# View all checkpoints
git tag

# Preview what v0.2 looked like
git checkout v0.2

# Return to active dev
git checkout dev
```

## Commit Convention

```
feat:   new feature or page
fix:    bug fix
style:  visual/CSS only
chore:  deps, config, cleanup
docs:   documentation only
```

## Tagging New Checkpoints

```bash
# After significant work lands on main:
git tag -a v0.5 -m "Short description of state"
git push origin --tags
```
