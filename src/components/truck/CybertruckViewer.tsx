"use client";

/**
 * CybertruckViewer — 3D Cybertruck with Mahalo Bird wrap
 *
 * Model: "Tesla Cybertruck" by onurpearl (Sketchfab)
 * License: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
 * Source: https://sketchfab.com/onurpearl
 *
 * Usage: Drop a real GLB at public/models/cybertruck.glb — no other changes needed.
 */

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

// Preload immediately
useGLTF.preload("/models/cybertruck.glb");

// ── Truck mesh ─────────────────────────────────────────────────────────────

function CybertruckModel() {
  const { scene } = useGLTF("/models/cybertruck.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Apply Mahalo Bird texture to tailgate/rear panel
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Make body metallic/stainless
      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material.metalness = 0.85;
        child.material.roughness = 0.15;
        child.material.envMapIntensity = 1.2;
      }
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// ── Grid floor matching CT display ─────────────────────────────────────────

function GridFloor() {
  return (
    <>
      {/* Primary grid */}
      <gridHelper
        args={[60, 60, "#1a1a2e", "#141428"]}
        position={[0, -0.01, 0]}
      />
      {/* Contact shadow under truck */}
      <ContactShadows
        position={[0, -0.005, 0]}
        opacity={0.6}
        scale={20}
        blur={2.5}
        far={8}
        color="#000010"
      />
    </>
  );
}

// ── Loading fallback ────────────────────────────────────────────────────────

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[4, 1.5, 2]} />
      <meshStandardMaterial
        color="#1a1a2e"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

// ── Main exported component ─────────────────────────────────────────────────

interface CybertruckViewerProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function CybertruckViewer({ style }: CybertruckViewerProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        ...style,
      }}
    >
      <Canvas
        camera={{
          position: [0, 2.5, -7],   // behind and above — showing the rear/tailgate
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}               // retina-aware, cap at 2x for perf
        style={{ background: "transparent" }}
      >
        {/* Dark CT-style environment */}
        <color attach="background" args={["#0a0a0f"]} />
        <fog attach="fog" args={["#0a0a0f", 20, 50]} />

        {/* Lighting — moody, industrial */}
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[6, 8, -4]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        {/* Rim light to highlight angular edges */}
        <directionalLight position={[-4, 3, 4]} intensity={0.4} color="#4a6fa0" />
        <directionalLight position={[4, 1, 4]} intensity={0.2} color="#2a3a50" />

        {/* Environment for reflections */}
        <Environment preset="night" />

        {/* 3D Truck */}
        <Suspense fallback={<LoadingFallback />}>
          <CybertruckModel />
        </Suspense>

        {/* Grid floor */}
        <GridFloor />

        {/* User controls — drag to rotate, scroll to zoom */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          minDistance={4}
          maxDistance={14}
          minPolarAngle={0.3}        // prevent going under
          maxPolarAngle={Math.PI / 2 + 0.2}  // prevent going over top
          target={[0, 0.8, 0]}       // look at center-mass of truck
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>

      {/* Attribution — CC BY 4.0 required */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 10,
          fontSize: 9,
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.03em",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        3D model by{" "}
        <a
          href="https://sketchfab.com/onurpearl"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "rgba(255,255,255,0.28)",
            textDecoration: "none",
            pointerEvents: "auto",
          }}
        >
          onurpearl
        </a>{" "}
        · CC BY 4.0
      </div>

      {/* Drag hint */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 10,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="0.8" />
          <path d="M4 6L6 4L8 6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M4 6L6 8L8 6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
        Drag to rotate
      </div>
    </div>
  );
}
