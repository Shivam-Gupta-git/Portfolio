import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

function Model({ bloomMeshName = null, matcapTexture, scale = 1, ...props }) {
  const { scene, nodes } = useGLTF("/animeCharacter/cute_cartoon_girl_character.glb");
  const bloomRef = useRef();

  // Apply custom material safely
  if (matcapTexture && nodes.body1_blinn1_0) {
    nodes.body1_blinn1_0.material = new THREE.MeshPhongMaterial({ map: matcapTexture });
  }

  return (
    <group {...props} scale={scale} dispose={null}>
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

useGLTF.preload("/animeCharacter/cute_cartoon_girl_character.glb");

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

  // Responsive model scaling
  const modelScale = isMobile ? 0.7 : isTablet ? 0.85 : 1;

  // Responsive camera settings
  const cameraFov = isMobile ? 50 : isTablet ? 48 : 45;
  const cameraPosition = isMobile ? [0, 0, 2.5] : isTablet ? [0, 0, 2.8] : [0, 0, 3];

  return (
    <Canvas 
      camera={{ position: cameraPosition, fov: cameraFov }}
      gl={{ preserveDrawingBuffer: true }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
    >
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <hemisphereLight intensity={0.15} groundColor="black" />
      <directionalLight
       position={[5, 10, 5]}
       intensity={1}
       castShadow
       shadow-mapSize-width={isMobile ? 1024 : 2048}
       shadow-mapSize-height={isMobile ? 1024 : 2048}
       shadow-bias={-0.0005}
      />
      <spotLight
          position={[-10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={0.7}
          castShadow
          shadow-mapSize-width={isMobile ? 512 : 1024}
          shadow-mapSize-height={isMobile ? 512 : 1024}
      />
      <pointLight intensity={0.5} />
      
      <Model bloomMeshName="emis_lambert1_0" scale={modelScale} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}