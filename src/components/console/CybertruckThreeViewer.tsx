"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface CybertruckModelProps {
  artImage?: string;
  startReveal?: boolean;
}

function CybertruckModel({ artImage, startReveal = false }: CybertruckModelProps) {
  const { scene } = useGLTF("/models/cybertruck.glb");
  const groupRef = useRef<THREE.Group>(null);
  const artPlaneRef = useRef<THREE.Mesh>(null);
  const [revealDone, setRevealDone] = useState(false);
  const revealStartTime = useRef<number | null>(null);

  // Side profile: front facing LEFT with camera on +Z
  // Model front is +X. rotation PI = front points -X = screen LEFT
  const SIDE_PROFILE = Math.PI;
  // Rotate -90deg to show tailgate facing camera (+Z)
  const TAILGATE_REVEAL = SIDE_PROFILE - Math.PI * 0.5;

  // Boost material brightness for stainless steel body
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.metalness = 0.9;
            mat.roughness = 0.3;
            mat.color.setHex(0xc0c8d0);
            mat.needsUpdate = true;
          }
        });
      }
    });
  }, [scene]);

  // Load art texture onto tailgate plane — preserve aspect ratio
  useEffect(() => {
    if (!artImage || !artPlaneRef.current) return;
    const loader = new THREE.TextureLoader();
    loader.load(artImage, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      
      // Cover mode — fill the tailgate plane, crop overflow (like background-size: cover)
      const imgAspect = texture.image.width / texture.image.height;
      const planeAspect = 1.90 / 0.50; // plane width / height = 3.8
      
      if (imgAspect > planeAspect) {
        // Image wider than plane — fit height, crop sides
        const scale = imgAspect / planeAspect;
        texture.repeat.set(1 / scale, 1);
        texture.offset.set((1 - 1 / scale) / 2, 0);
      } else {
        // Image taller than plane — fit width, crop top/bottom
        const scale = planeAspect / imgAspect;
        texture.repeat.set(1, 1 / scale);
        texture.offset.set(0, (1 - 1 / scale) / 2);
      }
      
      if (artPlaneRef.current) {
        const mat = artPlaneRef.current.material as THREE.MeshStandardMaterial;
        mat.map = texture;
        mat.needsUpdate = true;
      }
    });
  }, [artImage]);

  // Cinematic reveal: side profile → rotate to show tailgate
  // Starts when startReveal becomes true (after splash screen)
  useFrame(() => {
    if (revealDone || !groupRef.current) return;

    if (!startReveal) {
      // Hold at side profile until splash is done
      groupRef.current.rotation.y = SIDE_PROFILE;
      return;
    }

    // Record when reveal started
    if (revealStartTime.current === null) {
      revealStartTime.current = performance.now();
    }

    const elapsed = (performance.now() - revealStartTime.current) / 1000;
    const delay = 1.0;
    const duration = 3.0;

    if (elapsed < delay) {
      groupRef.current.rotation.y = SIDE_PROFILE;
    } else if (elapsed < delay + duration) {
      const t = (elapsed - delay) / duration;
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      groupRef.current.rotation.y = SIDE_PROFILE + (TAILGATE_REVEAL - SIDE_PROFILE) * ease;
    } else {
      groupRef.current.rotation.y = TAILGATE_REVEAL;
      setRevealDone(true);
    }
  });

  return (
    <group ref={groupRef} rotation={[0, SIDE_PROFILE, 0]} position={[0, -0.5, 0]}>
      <primitive object={scene} scale={1.8} />
      {/* Art plane on tailgate — coords scaled 1.8x to match primitive */}
      <mesh
        ref={artPlaneRef}
        position={[-3.17, 0.10, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[1.90, 0.50]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.8}
          transparent
          opacity={artImage ? 1 : 0}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}

interface CybertruckThreeViewerProps {
  artImage?: string;
  startReveal?: boolean;
}

export default function CybertruckThreeViewer({
  artImage = "/images/mahalo-bird/electric-prr-hummingbird.jpg",
  startReveal = false,
}: CybertruckThreeViewerProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        touchAction: "none",
      }}
      role="img"
      aria-label="3D Cybertruck model — drag to rotate"
    >
      <Canvas
        camera={{ position: [0, 0.8, 7], fov: 28 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 2.0,
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={2.0} />
        <directionalLight position={[5, 5, 5]} intensity={3.0} color="#ffffff" />
        <directionalLight position={[-5, 3, -3]} intensity={1.5} color="#b0c8e8" />
        <directionalLight position={[0, 8, 0]} intensity={1.0} color="#ffffff" />
        <directionalLight position={[0, 1, 8]} intensity={1.0} color="#d0e0ff" />
        <pointLight position={[-3, 1, 3]} intensity={0.8} color="#4a9eff" />

        <Suspense fallback={null}>
          <CybertruckModel artImage={artImage} startReveal={startReveal} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI * 0.35}
          maxPolarAngle={Math.PI * 0.55}
          autoRotate={false}
          dampingFactor={0.1}
          enableDamping
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/cybertruck.glb");
