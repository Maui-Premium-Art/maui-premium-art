"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface CybertruckModelProps {
  artImage?: string;
}

function CybertruckModel({ artImage }: CybertruckModelProps) {
  const { scene } = useGLTF("/models/cybertruck.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Apply art texture to the SolarTextureWIP material on the Cube mesh
  useEffect(() => {
    if (!artImage) return;

    const loader = new THREE.TextureLoader();
    loader.load(artImage, (texture) => {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];

          materials.forEach((mat) => {
            if (mat.name === "SolarTextureWIP" || mat.name === "SolarTexture") {
              mat.map = texture;
              mat.needsUpdate = true;
            }
          });
        }
      });
    });
  }, [artImage, scene]);

  return (
    <group ref={groupRef} rotation={[0, Math.PI * 0.5, 0]} position={[0, -0.3, 0]}>
      <primitive object={scene} scale={1.2} />
    </group>
  );
}

interface CybertruckThreeViewerProps {
  artImage?: string;
}

export default function CybertruckThreeViewer({
  artImage = "/images/mahalo-bird/electric-prr-hummingbird.jpg",
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
        camera={{ position: [0, 0.5, 5], fov: 28 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#d0e0f0" />
        <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#80a0c0" />
        <directionalLight position={[0, 5, 0]} intensity={0.6} color="#ffffff" />
        <pointLight position={[-3, 1, 3]} intensity={0.4} color="#4a9eff" />

        <Suspense fallback={null}>
          <CybertruckModel artImage={artImage} />
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

// Preload the model
useGLTF.preload("/models/cybertruck.glb");
