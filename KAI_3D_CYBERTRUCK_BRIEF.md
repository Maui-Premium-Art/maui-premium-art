# KAI — 3D CYBERTRUCK IMPLEMENTATION BRIEF
**From:** Nalu Strategy
**Date:** March 14, 2026
**Priority:** CRITICAL — this replaces the static image approach entirely
**Save to:** project root AND ~/.openclaw/workspace-kai/

---

## THE SHIFT

Skip the static image entirely. Go straight to 3D. The CT display shows a 3D model — our site should too. This is the permanent solution, not a stepping stone.

---

## THE MODEL

### Primary: Mapro Design Cybertruck (Boss's pick)
- **URL:** https://sketchfab.com/3d-models/tesla-cybertruck-76032fd41ceb48c290ff0f3820835466
- **Creator:** Mapro Design (@maprodesign)
- **Formats:** .blend, .obj, .fbx, .stl
- **Triangles:** 545.9k | Vertices: 269.2k
- **License:** Check Sketchfab — likely CC Attribution
- **Key feature:** Tailgate is a SEPARATE object (1 of 11 total objects). This means we can texture the tailgate independently with our art.

### Model structure (11 objects):
- 4 Doors (with handles)
- 4 Wheels (with wheels and linings)
- 1 Rear cover (with light and glass) ← THIS IS THE TAILGATE
- 1 Glass section of the rear case
- 1 Body

### Why this model:
- Modeled to actual dimensions
- Tailgate separable = easy art mapping
- Doors can open (70° on Z axis)
- Tailgate can open (80.7° on X axis)
- Clean topology, no subdivision needed

---

## IMPLEMENTATION

### Tech: Three.js (already in your available libraries)

Three.js is available in React artifacts via `import * as THREE from 'three'`. For Next.js, use `@react-three/fiber` (React Three Fiber) + `@react-three/drei` for helpers.

```bash
pnpm add three @react-three/fiber @react-three/drei
pnpm add -D @types/three
```

### Loading the model:

1. **Download** the model from Sketchfab in GLTF/GLB format
   - If only .blend/.obj/.fbx available, convert to GLB using Blender or https://gltf.report/
   - GLB is preferred (single binary file, includes textures)

2. **Place** the GLB file in `public/models/cybertruck.glb`

3. **Load** with React Three Fiber:

```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

function Cybertruck() {
  const { scene } = useGLTF('/models/cybertruck.glb')
  
  // Find the tailgate mesh and apply our art texture
  scene.traverse((child) => {
    if (child.isMesh && child.name.includes('rear_cover')) {
      // Apply Mahalo Bird texture to tailgate
      const texture = new THREE.TextureLoader().load('/images/mahalo-bird-wrap.png')
      child.material = new THREE.MeshStandardMaterial({ map: texture })
    }
  })
  
  return <primitive object={scene} />
}

export default function HeroArea() {
  return (
    <Canvas camera={{ position: [0, 2, -6], fov: 45 }}>
      {/* Dark environment matching CT display */}
      <color attach="background" args={['#0a0a0f']} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, -5]} intensity={0.8} />
      
      {/* The truck — camera positioned at rear */}
      <Cybertruck />
      
      {/* Grid floor matching CT display */}
      <gridHelper args={[50, 50, '#1a1a2e', '#1a1a2e']} />
      
      {/* User can rotate */}
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={12}
        target={[0, 1, 0]}
      />
    </Canvas>
  )
}
```

### Camera position:
- Position behind and slightly above the truck
- Looking at the rear tailgate
- `camera={{ position: [0, 2, -6], fov: 45 }}` as starting point
- OrbitControls for user rotation (drag to spin)

---

## THE ENVIRONMENT (CT Display Style)

The real CT display shows the truck on a dark grid with mountainous terrain. Recreate this:

### Grid floor:
```tsx
<gridHelper args={[50, 50, '#1a1a2e', '#1a1a2e']} position={[0, 0, 0]} />
```
- Very subtle grid lines on near-black
- Slight reflectivity (use `<ContactShadows>` from drei)

### Dark terrain/mountains:
- Simple dark silhouette mesh behind the truck
- Or use a dark HDRI environment map
- drei has `<Environment preset="night" />` which gives dark ambient lighting
- The key: dark, moody, minimal — NOT a bright showroom

### Lighting:
- Low ambient (0.2-0.3)
- One directional light from above-right
- Subtle rim light to highlight the CT's angular edges
- The stainless steel body should have subtle reflections

### Background:
- Pure dark: `#0a0a0f`
- NOT black (#000000) — slightly warm dark

---

## ART ON THE TAILGATE

### Using Tesla's UV template:
- Download from https://github.com/teslamotors/custom-wraps
- The template shows exactly how art maps to each panel
- For the Mapro model, identify the tailgate mesh name and apply texture

### Texture mapping:
```tsx
// Load the Mahalo Bird art
const texture = useTexture('/images/mahalo-bird-wrap.png')

// Apply to tailgate
scene.traverse((child) => {
  if (child.isMesh && child.name === 'TAILGATE_MESH_NAME') {
    child.material.map = texture
    child.material.needsUpdate = true
  }
})
```

### Art requirements:
- Mahalo Bird image formatted to match the tailgate UV
- High-res PNG (at least 2048x2048 for quality)
- Art should fill the tailgate panel naturally
- Images at: /Users/Shared/Images/MahaloBird/

---

## INTERACTIVE FEATURES (built-in from day 1)

Since we're doing 3D, rotation is FREE — just enable OrbitControls:

```tsx
<OrbitControls 
  enableZoom={true}      // scroll to zoom
  enablePan={false}      // no panning
  enableRotate={true}    // drag to rotate
  autoRotate={false}     // no auto-spin (user controls)
  minDistance={3}         // prevent getting too close
  maxDistance={15}        // prevent getting too far
  minPolarAngle={0.5}    // prevent going under the truck
  maxPolarAngle={1.5}    // prevent going over the top
/>
```

This means v1 ships with rotation. No extra work needed.

---

## PERFORMANCE

545k triangles is moderate. For web performance:

1. **Use GLB** (compressed binary) not GLTF (JSON + separate files)
2. **Add `<Suspense>`** with a loading fallback (the splash screen)
3. **Use `useGLTF.preload()`** to start loading immediately
4. **Consider draco compression** for the GLB: `useGLTF('/models/cybertruck.glb', true)` — the `true` enables draco decoder
5. **Test on mobile** — may need a lower-poly version for phones

```tsx
// Preload the model
useGLTF.preload('/models/cybertruck.glb')

// With Suspense for loading state
<Suspense fallback={<SplashScreen />}>
  <Canvas>
    <Cybertruck />
  </Canvas>
</Suspense>
```

---

## REFERENCE IMPLEMENTATIONS

1. **CodePen — Tesla Cybertruck in Three.js:** https://codepen.io/jkantner/pen/MWYjeWo
   - Full procedural CT built in Three.js (no model loaded — geometry only)
   - Good reference for lighting and environment setup

2. **DEV.to — Drive a Tesla Cybertruck in Three.js:** https://dev.to/jaagrav/drive-a-tesla-cybertruck-or-literally-any-car-on-your-browser-with-threejs-4ila
   - Uses Sketchfab GLTF model in Three.js
   - Shows how to load, position, and interact

3. **Three.js GLTF Loader official example:** https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_gltf.html
   - The canonical way to load GLTF models

4. **Tesla custom-wraps GitHub:** https://github.com/teslamotors/custom-wraps
   - Official UV templates for art mapping

---

## DEFINITION OF DONE

- [ ] 3D Cybertruck model loaded via Three.js (React Three Fiber)
- [ ] Tailgate faces the viewer on initial load
- [ ] Mahalo Bird art applied as texture on the tailgate
- [ ] Dark grid floor matching CT display aesthetic
- [ ] Dark environment/background (#0a0a0f)
- [ ] User can drag to rotate the truck
- [ ] Scroll to zoom in/out
- [ ] Smooth loading with splash screen as fallback
- [ ] Works on mobile (touch to rotate)
- [ ] Metallic/reflective materials on the CT body
- [ ] Performance: 60fps on desktop, 30fps+ on mobile
- [ ] Model attribution in code comments or about page

---

## BONUS: FUTURE FEATURES (free with 3D)

Once the 3D model is working, these features are trivial to add:
- **Design swapping** — change tailgate texture with a click
- **Door opening animation** — model already supports it
- **Tailgate opening** — reveal interior/bed
- **Color variants** — change body material color
- **Environment swapping** — Hawaiian sunset, Maui mountains, night sky
- **AR preview** — Three.js supports WebXR

---

**This is the path. Real 3D, real rotation, real materials. Not a photo, not an SVG — a proper 3D experience that matches what CT owners see on their own screens. Ship it, Kai. 🤙🌺**
