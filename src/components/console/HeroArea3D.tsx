"use client";

/**
 * HeroArea3D — Cybertruck 3D hero with CT-style environment
 *
 * 3D model: Tesla Cybertruck by onurpearl (Sketchfab)
 * License: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
 */

import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  Grid,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/cybertruck.glb";

// Preload immediately
useGLTF.preload(MODEL_PATH);

// ── Cybertruck mesh ────────────────────────────────────────────────────────

function CybertruckModel() {
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    // Log model info for debugging
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    console.log("[CT] size:", size, "center:", center);

    // Scale model to fill the hero — target ~5 units wide (car-sized)
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 5;
    const s = targetSize / maxDim;
    scene.scale.set(s, s, s);
    console.log("[CT] scaled by", s, "→ new size:", size.x * s, size.y * s, size.z * s);

    // Center on origin, sit on ground
    box.setFromObject(scene);
    box.getCenter(center);
    scene.position.sub(center);
    scene.position.y = -box.min.y * scene.scale.y;

    // Apply materials
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const mat = child.material;
      const name = (mat instanceof THREE.Material ? mat.name : "").toLowerCase();

      if (name.includes("glass") || name.includes("window")) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#1a2030",
          metalness: 0.0,
          roughness: 0.05,
          transmission: 0.7,
          transparent: true,
          opacity: 0.4,
        });
      } else if (name.includes("light") && name.includes("rear")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#ff2020",
          emissive: "#ff2020",
          emissiveIntensity: 2,
        });
      } else if (name.includes("tire") || name.includes("wheel") || name.includes("black")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#111118",
          metalness: 0.2,
          roughness: 0.9,
        });
      } else {
        // Default: stainless steel body
        child.material = new THREE.MeshStandardMaterial({
          color: "#8a8a92",
          metalness: 0.9,
          roughness: 0.12,
          envMapIntensity: 1.5,
        });
      }

      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      rotation={[0, Math.PI, 0]} // face rear toward camera
    />
  );
}

// ── Loading placeholder inside Canvas ─────────────────────────────────────

function LoadingBox() {
  return (
    <mesh position={[0, 0.8, 0]}>
      <boxGeometry args={[3.5, 1.5, 6]} />
      <meshStandardMaterial
        color="#1a1a2e"
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

// ── Terrain silhouette (HTML layer behind Canvas) ──────────────────────────

function TerrainSVG() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #05050a 0%, #080810 40%, #0a0a0f 100%)",
        }}
      />
      <svg
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "65%" }}
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          d="M0 400 L0 240 L80 200 L160 225 L240 180 L320 205 L400 165 L480 195 L560 155 L640 178 L720 145 L800 168 L880 140 L960 165 L1040 148 L1120 172 L1200 158 L1200 400 Z"
          fill="#10101a"
        />
        <path
          d="M0 400 L0 300 L100 268 L200 285 L300 255 L400 272 L500 245 L600 265 L700 238 L800 258 L900 235 L1000 255 L1100 240 L1200 260 L1200 400 Z"
          fill="#0c0c16"
        />
        <path
          d="M0 400 L0 350 L150 332 L300 342 L450 325 L600 338 L750 322 L900 335 L1050 320 L1200 335 L1200 400 Z"
          fill="#090912"
        />
      </svg>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export default function HeroArea3D() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      {/* Terrain background (HTML, behind Canvas) */}
      <TerrainSVG />

      {/* 3D Canvas — fills the area */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <Canvas
          camera={{ position: [0, 2, -9], fov: 40 }}
          shadows
          gl={{
            antialias: true,
            alpha: true,             // transparent so terrain shows through
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.85,
          }}
          style={{ background: "transparent" }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[6, 8, -4]}
            intensity={1.4}
            color="#e8e8f5"
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-4, 3, 4]} intensity={0.45} color="#4a6fa0" />
          <directionalLight position={[0, -1, -4]} intensity={0.15} color="#2a3040" />

          {/* Environment for reflections on stainless steel */}
          <Environment preset="night" />

          {/* Truck — Suspense INSIDE Canvas (correct pattern) */}
          <Suspense fallback={<LoadingBox />}>
            <CybertruckModel />
          </Suspense>

          {/* Grid floor */}
          <Grid
            args={[60, 60]}
            position={[0, 0, 0]}
            cellSize={1}
            cellThickness={0.4}
            cellColor="#1a1a2e"
            sectionSize={5}
            sectionThickness={0.7}
            sectionColor="#222236"
            fadeDistance={35}
            fadeStrength={2}
            infiniteGrid
          />

          {/* Ground shadow */}
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.5}
            scale={20}
            blur={2.5}
            far={6}
            color="#000008"
          />

          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableDamping
            dampingFactor={0.07}
            minDistance={5}
            maxDistance={20}
            minPolarAngle={0.25}
            maxPolarAngle={Math.PI / 2 + 0.15}
            target={[0, 0.8, 0]}
          />
        </Canvas>
      </div>

      {/* Art label — above Canvas */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Mahalo Bird · Edition I
        </span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#4a9eff", opacity: 0.7 }} />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em" }}>
            3 / 10 available
          </span>
        </div>
      </div>

      {/* CC attribution */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 10,
          fontSize: 9,
          color: "rgba(255,255,255,0.15)",
          letterSpacing: "0.03em",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        3D model by{" "}
        <a
          href="https://sketchfab.com/onurpearl"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none", pointerEvents: "auto" }}
        >
          onurpearl
        </a>
        {" "}· CC BY 4.0
      </div>
    </div>
  );
}
