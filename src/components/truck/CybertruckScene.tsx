"use client";

/**
 * CybertruckScene — 3D scene, loaded only when WebGL confirmed available
 *
 * 3D model: Tesla Cybertruck by onurpearl (Sketchfab)
 * License: CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
 */

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows, Grid, Environment } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/cybertruck.glb";
useGLTF.preload(MODEL_PATH);

function CybertruckModel() {
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Scale to 5 units wide
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = 5 / maxDim;
    scene.scale.set(s, s, s);

    // Center and sit on ground
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
          metalness: 0,
          roughness: 0.05,
          transmission: 0.7,
          transparent: true,
          opacity: 0.4,
        });
      } else if (name.includes("tire") || name.includes("wheel") || name.includes("black")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#111118",
          metalness: 0.2,
          roughness: 0.9,
        });
      } else if (name.includes("light")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#ff2020",
          emissive: "#ff2020",
          emissiveIntensity: 1.5,
        });
      } else {
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

  return <primitive object={scene} rotation={[0, Math.PI, 0]} />;
}

function LoadingBox() {
  return (
    <mesh position={[0, 0.8, 0]}>
      <boxGeometry args={[4, 1.5, 7]} />
      <meshStandardMaterial color="#1a1a2e" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

export default function CybertruckScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, -9], fov: 40 }}
      shadows
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
      }}
      style={{ background: "#0a0a0f" }}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[6, 8, -4]} intensity={1.4} color="#e8e8f5" castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-4, 3, 4]} intensity={0.45} color="#4a6fa0" />
      <directionalLight position={[0, -1, -4]} intensity={0.15} color="#2a3040" />

      <Environment preset="night" />

      <Suspense fallback={<LoadingBox />}>
        <CybertruckModel />
      </Suspense>

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

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.5}
        scale={20}
        blur={2.5}
        far={6}
        color="#000008"
      />

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
  );
}
