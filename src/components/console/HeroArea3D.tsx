"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  ContactShadows,
  Grid,
} from "@react-three/drei";
import * as THREE from "three";

/*
 * Cybertruck 3D model by onurpearl (Sketchfab)
 * https://sketchfab.com/onurpearl
 * Licensed under CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
 * Attribution required.
 */
function CybertruckModel() {
  const { scene } = useGLTF("/models/tesla_cybertruck.glb");
  const texture = useTexture("/images/mahalo-bird/wrap-2.jpg");

  useEffect(() => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const matName =
          child.material instanceof THREE.Material
            ? child.material.name
            : "";
        const nodeName = child.name.toLowerCase();

        if (matName === "Base") {
          // Stainless steel body
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#8a8a92"),
            metalness: 0.85,
            roughness: 0.15,
            envMapIntensity: 1.2,
          });
        } else if (matName === "TeslaRearLight") {
          // Rear LED light bar — emissive red
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#ff2020"),
            emissive: new THREE.Color("#ff2020"),
            emissiveIntensity: 1.5,
            metalness: 0.3,
            roughness: 0.4,
          });
        } else if (matName === "TeslaFrontLight") {
          // Front light bar — subtle white glow
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#e0e0e8"),
            emissive: new THREE.Color("#c0c0d0"),
            emissiveIntensity: 0.5,
            metalness: 0.3,
            roughness: 0.3,
          });
        } else if (matName === "TeslaBlack") {
          // Dark trim, tires, accents
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#111118"),
            metalness: 0.2,
            roughness: 0.8,
          });
        } else if (
          matName === "Material.004" ||
          matName === "Material.001"
        ) {
          // Glass / secondary materials
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#1a2030"),
            metalness: 0.1,
            roughness: 0.1,
            transparent: true,
            opacity: 0.5,
          });
        }

        // Try to identify tailgate by node position (rear-facing large flat mesh)
        // Apply art to Object_5 which is typically the tailgate panel area
        if (
          nodeName.includes("object_5") ||
          nodeName.includes("rear") ||
          nodeName.includes("tailgate")
        ) {
          child.material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.3,
            roughness: 0.5,
          });
        }

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, texture]);

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

// Preload model
useGLTF.preload("/models/tesla_cybertruck.glb");

/* ── Procedural CT (fallback while model loads or if missing) ── */
function ProceduralCybertruck() {
  const meshRef = useRef<THREE.Group>(null);

  // Stainless steel material
  const bodyMat = new THREE.MeshStandardMaterial({
    color: "#8a8a92",
    metalness: 0.85,
    roughness: 0.15,
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: "#1a1a2e",
    metalness: 0.5,
    roughness: 0.6,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: "#1a2030",
    metalness: 0.3,
    roughness: 0.1,
    transparent: true,
    opacity: 0.4,
  });

  const lightMat = new THREE.MeshStandardMaterial({
    color: "#ff2020",
    emissive: "#ff2020",
    emissiveIntensity: 2,
  });

  return (
    <group ref={meshRef} rotation={[0, Math.PI, 0]} position={[0, 0.6, 0]}>
      {/* Main body — angular wedge shape */}
      <mesh material={bodyMat} castShadow>
        <boxGeometry args={[2.2, 0.9, 5.8]} />
      </mesh>

      {/* Roof taper — the CT slope */}
      <mesh material={bodyMat} position={[0, 0.65, -0.6]} castShadow>
        <boxGeometry args={[2.1, 0.4, 3.8]} />
      </mesh>

      {/* Windshield angle piece */}
      <mesh material={glassMat} position={[0, 0.7, 1.2]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[2.0, 0.02, 1.5]} />
      </mesh>

      {/* Rear tailgate — flat panel */}
      <mesh material={bodyMat} position={[0, 0.1, -2.9]}>
        <boxGeometry args={[2.1, 0.8, 0.05]} />
      </mesh>

      {/* LED light bar */}
      <mesh material={lightMat} position={[0, 0.48, -2.92]}>
        <boxGeometry args={[2.0, 0.04, 0.02]} />
      </mesh>

      {/* Wheels */}
      {[
        [-0.95, -0.35, 1.6],
        [0.95, -0.35, 1.6],
        [-0.95, -0.35, -1.8],
        [0.95, -0.35, -1.8],
      ].map((pos, i) => (
        <mesh
          key={i}
          material={darkMat}
          position={pos as [number, number, number]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.38, 0.38, 0.25, 16]} />
        </mesh>
      ))}

      {/* Bed walls */}
      <mesh material={bodyMat} position={[-1.05, 0.3, -1.5]}>
        <boxGeometry args={[0.05, 0.5, 2.2]} />
      </mesh>
      <mesh material={bodyMat} position={[1.05, 0.3, -1.5]}>
        <boxGeometry args={[0.05, 0.5, 2.2]} />
      </mesh>
    </group>
  );
}

/* ── Dark terrain background (SVG hills behind the 3D scene) ── */
function TerrainBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Sky gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #050508 0%, #08080c 35%, #0a0a0f 55%, #08080c 100%)",
        }}
      />
      {/* Craggy terrain */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "60%",
        }}
        viewBox="0 0 2000 500"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <path
          d="M0 500 L0 180 L30 165 L60 178 L90 155 L130 170 L160 148 L200 165 L240 140 L280 158 L320 135 L360 155 L400 138 L440 158 L480 132 L520 150 L560 135 L600 158 L640 140 L680 120 L720 142 L760 128 L800 148 L840 125 L880 145 L920 118 L960 138 L1000 122 L1040 142 L1080 128 L1120 148 L1160 132 L1200 155 L1240 138 L1280 120 L1320 142 L1360 128 L1400 148 L1440 132 L1480 152 L1520 135 L1560 155 L1600 140 L1640 158 L1680 142 L1720 125 L1760 145 L1800 132 L1840 152 L1880 138 L1920 160 L1960 145 L2000 155 L2000 500 Z"
          fill="#161620"
        />
        <path
          d="M0 180 L30 165 L60 178 L90 155 L130 170 L160 148 L200 165 L240 140 L280 158 L320 135 L360 155 L400 138 L440 158 L480 132 L520 150 L560 135 L600 158 L640 140 L680 120 L720 142 L760 128 L800 148 L840 125 L880 145 L920 118 L960 138 L1000 122 L1040 142 L1080 128 L1120 148 L1160 132 L1200 155 L1240 138 L1280 120 L1320 142 L1360 128 L1400 148 L1440 132 L1480 152 L1520 135 L1560 155 L1600 140 L1640 158 L1680 142 L1720 125 L1760 145 L1800 132 L1840 152 L1880 138 L1920 160 L1960 145 L2000 155"
          stroke="#222230"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M0 500 L0 280 L25 268 L55 278 L80 258 L115 272 L145 252 L180 268 L210 248 L245 262 L275 242 L310 258 L340 240 L375 256 L405 236 L440 252 L470 238 L505 256 L535 242 L568 225 L600 245 L635 232 L668 250 L700 228 L735 248 L768 225 L800 245 L835 230 L868 250 L900 232 L935 252 L968 238 L1000 255 L1035 240 L1068 258 L1100 242 L1135 225 L1168 248 L1200 232 L1235 252 L1268 238 L1300 258 L1335 242 L1368 225 L1400 248 L1435 232 L1468 252 L1500 235 L1535 255 L1568 240 L1600 258 L1635 242 L1668 228 L1700 248 L1735 235 L1768 255 L1800 240 L1835 258 L1868 242 L1900 262 L1940 248 L2000 255 L2000 500 Z"
          fill="#12121a"
        />
        <path
          d="M0 280 L25 268 L55 278 L80 258 L115 272 L145 252 L180 268 L210 248 L245 262 L275 242 L310 258 L340 240 L375 256 L405 236 L440 252 L470 238 L505 256 L535 242 L568 225 L600 245 L635 232 L668 250 L700 228 L735 248 L768 225 L800 245 L835 230 L868 250 L900 232 L935 252 L968 238 L1000 255 L1035 240 L1068 258 L1100 242 L1135 225 L1168 248 L1200 232 L1235 252 L1268 238 L1300 258 L1335 242 L1368 225 L1400 248 L1435 232 L1468 252 L1500 235 L1535 255 L1568 240 L1600 258 L1635 242 L1668 228 L1700 248 L1735 235 L1768 255 L1800 240 L1835 258 L1868 242 L1900 262 L1940 248 L2000 255"
          stroke="#1e1e28"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M0 500 L0 360 L20 350 L45 358 L70 342 L100 354 L130 338 L165 350 L195 334 L230 346 L260 330 L295 344 L325 328 L360 342 L390 326 L425 340 L455 324 L490 338 L520 322 L555 336 L585 318 L620 334 L650 316 L685 332 L715 314 L750 330 L780 312 L815 328 L845 310 L880 326 L910 308 L945 324 L975 310 L1010 326 L1040 312 L1075 328 L1105 315 L1140 330 L1170 318 L1205 334 L1235 320 L1270 336 L1300 322 L1335 338 L1365 325 L1400 340 L1435 328 L1468 342 L1500 330 L1535 346 L1568 332 L1600 348 L1635 334 L1668 350 L1700 336 L1735 352 L1768 338 L1800 355 L1835 340 L1868 358 L1900 342 L1935 360 L1968 346 L2000 355 L2000 500 Z"
          fill="#0e0e16"
        />
        <path
          d="M0 360 L20 350 L45 358 L70 342 L100 354 L130 338 L165 350 L195 334 L230 346 L260 330 L295 344 L325 328 L360 342 L390 326 L425 340 L455 324 L490 338 L520 322 L555 336 L585 318 L620 334 L650 316 L685 332 L715 314 L750 330 L780 312 L815 328 L845 310 L880 326 L910 308 L945 324 L975 310 L1010 326 L1040 312 L1075 328 L1105 315 L1140 330 L1170 318 L1205 334 L1235 320 L1270 336 L1300 322 L1335 338 L1365 325 L1400 340 L1435 328 L1468 342 L1500 330 L1535 346 L1568 332 L1600 348 L1635 334 L1668 350 L1700 336 L1735 352 L1768 338 L1800 355 L1835 340 L1868 358 L1900 342 L1935 360 L1968 346 L2000 355"
          stroke="#1a1a24"
          strokeWidth="0.7"
          fill="none"
        />
      </svg>
    </div>
  );
}

/* ── Loading fallback ───────────────────────────────────────── */
function LoadingFallback() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#888899",
        fontSize: 12,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      Loading Cybertruck...
    </div>
  );
}

/* ── Scene content inside Canvas ───────────────────────────── */
function Scene({ hasModel }: { hasModel: boolean }) {
  return (
    <>
      {/* Background color */}
      <color attach="background" args={["#0a0a0f"]} />

      {/* Lighting — dark, moody, CT display style */}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[5, 8, -5]}
        intensity={0.9}
        color="#e8e8f0"
        castShadow
      />
      {/* Rim light — highlights angular edges */}
      <directionalLight
        position={[-3, 4, 3]}
        intensity={0.3}
        color="#6688aa"
      />
      {/* Subtle fill from below */}
      <directionalLight
        position={[0, -2, -4]}
        intensity={0.1}
        color="#334455"
      />

      {/* The truck */}
      {hasModel ? <CybertruckModel /> : <ProceduralCybertruck />}

      {/* Grid floor — matches CT display */}
      <Grid
        args={[60, 60]}
        position={[0, -0.01, 0]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#1a1a2e"
        sectionSize={5}
        sectionThickness={0.8}
        sectionColor="#2a2a3e"
        fadeDistance={40}
        fadeStrength={1.5}
        infiniteGrid
      />

      {/* Contact shadows for grounding */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={6}
        color="#000000"
      />

      {/* Orbit controls — drag to rotate */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate={false}
        minDistance={4}
        maxDistance={14}
        minPolarAngle={0.4}
        maxPolarAngle={1.5}
        target={[0, 0.6, 0]}
      />
    </>
  );
}

/* ── Main export ────────────────────────────────────────────── */
export default function HeroArea3D() {
  const [hasModel, setHasModel] = useState(false);

  // Check if GLB model exists
  useEffect(() => {
    fetch("/models/tesla_cybertruck.glb", { method: "HEAD" })
      .then((res) => setHasModel(res.ok))
      .catch(() => setHasModel(false));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {/* Terrain behind the 3D canvas */}
      <TerrainBackground />

      {/* 3D Canvas */}
      <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 1 }}>
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 2.5, -6], fov: 42 }}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 0.8,
            }}
            style={{ background: "transparent" }}
          >
            <Scene hasModel={hasModel} />
          </Canvas>
        </Suspense>
      </div>

      {/* Art label overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "#888899",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Mahalo Bird · Edition I
        </span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              opacity: 0.8,
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: "#888899",
              letterSpacing: "0.1em",
              opacity: 0.7,
            }}
          >
            3 / 10 available
          </span>
        </div>
        <a
          href="https://sketchfab.com/onurpearl"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 9,
            color: "#505068",
            letterSpacing: "0.05em",
            marginTop: 2,
            textDecoration: "none",
            pointerEvents: "auto",
          }}
        >
          3D model by onurpearl · CC BY 4.0
        </a>
      </div>
    </div>
  );
}
