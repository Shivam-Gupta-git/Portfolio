import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Html } from "@react-three/drei";
import { useLocation } from "react-router-dom";

// ✅ Clean Loader (NO div directly inside Canvas)
const CanvasLoader = () => {
  return (
    <Html center>
      <span style={{ color: "white", fontSize: "16px" }}>Loading...</span>
    </Html>
  );
};

// ✅ 3D Model Component
const Computers = ({ isMobile, isTablet }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  // Responsive scaling and positioning
  const scale = isMobile ? 0.8 : isTablet ? 0.65 : 0.75
  const position = isMobile ? [-1, -0.5, -1] : isTablet ? [0, -2, -1.8] : [0, -1.5, -1.5]

  return (
    <mesh>
      <ambientLight intensity={0.4} color="#ffffff"/>
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

      <pointLight intensity={1} />

      <primitive
        object={computer.scene}
        scale={scale}
        position={position}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

// ✅ Main Canvas Component
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Responsive camera settings
  const cameraFov = isMobile ? 25 : isTablet ? 30 : 22
  const cameraPosition = isMobile ? [15, 12, 4] : isTablet ? [18, 14, 4.5] : [20, 15, 5]

  return (
    <div className="w-full h-full">
      <Canvas
        key={`computers-canvas-${location.pathname}`}
        frameloop="demand"
        shadows
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: cameraPosition, fov: cameraFov }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Computers isMobile={isMobile} isTablet={isTablet} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;

// /homeCharacter/isometric_bedroom.glb