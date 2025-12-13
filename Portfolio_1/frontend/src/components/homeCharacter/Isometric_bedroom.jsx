import React, { useMemo, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// ------------------ MODEL ------------------
function Model({ bloomMeshName = null, isMobile = false, isTablet = false }) {
  const { scene, nodes } = useGLTF("/homeCharacter/isometric_bedroom.glb");
  const { viewport } = useThree();

  // Responsive scale based on screen size and viewport
  const scale = useMemo(() => {
    if (isMobile) {
      return viewport.width < 2 ? 0.06 : 0.08;   // mobile
    }
    if (isTablet) {
      return viewport.width < 8 ? 0.09 : 0.1;    // tablet
    }
    return 0.12;                           // desktop
  }, [viewport.width, isMobile, isTablet]);

  // Responsive positioning
  const position = isMobile ? [0, -6, 0] : isTablet ? [0, -6.5, 0] : [0, -7, 0];

  return (
    <group scale={scale} position={position} rotation={[0, Math.PI * 0.2, 0]}>
      <EffectComposer>
        {bloomMeshName && nodes[bloomMeshName] && (
          <SelectiveBloom
            selection={nodes[bloomMeshName]}
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
        )}
      </EffectComposer>

      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/homeCharacter/isometric_bedroom.glb");

// ------------------ SCENE ------------------
export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Responsive camera settings
  const cameraFov = isMobile ? 75 : isTablet ? 72 : 70;
  const cameraPosition = isMobile ? [0, 2, 18] : isTablet ? [0, 2, 19] : [0, 2, 20];

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: cameraFov }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      {/* LIGHTS */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <hemisphereLight intensity={0.2} groundColor="black" />

      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={isMobile ? 512 : 1024}
        shadow-mapSize-height={isMobile ? 512 : 1024}
        shadow-bias={-0.0005}
      />

      {/* MODEL */}
      <Model bloomMeshName="emis_lambert1_0" isMobile={isMobile} isTablet={isTablet} />

      {/* CONTROLS */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}