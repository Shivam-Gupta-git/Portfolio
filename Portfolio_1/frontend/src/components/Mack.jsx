import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, ScrollControls } from '@react-three/drei';
import MacContainer from './MacContainer';
import { useLocation } from 'react-router-dom';


function Particles({ count = 200, isMobile = false }) {
  const meshRef = useRef();
  
  const positions = useMemo(() => {
    const temp = [];
    const range = isMobile ? 250 : 400;
    for (let i = 0; i < count; i++) {
      temp.push(
        (Math.random() - 0.5) * range,  // x
        (Math.random() - 0.5) * range,  // y
        (Math.random() - 0.5) * range   // z
      );
    }
    return new Float32Array(temp);
  }, [count, isMobile]);

  // Animate particles (rotate slowly)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={isMobile ? 1 : 1.5} color="#06b6d4" sizeAttenuation />
    </points>
  );
}

// ------------------------
// Mack Page Component
// ------------------------
function Mack() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive camera settings
  const cameraFov = isMobile ? 20 : window.innerWidth < 1024 ? 15 : 12
  const cameraPosition = isMobile ? [0, -3, 150] : window.innerWidth < 1024 ? [0, -4, 180] : [0, -5, 220]

  return (
    <>
      <div className="w-full h-screen relative ">
        {/* Text overlay */}
        <div className="w-full absolute flex flex-col items-center text-white top-18 sm:top-10 md:top-20 left-1/2 -translate-x-1/2 font-['Halvetica_Now_Display'] px-4 sm:px-6">
          <h3 className="mac-glow-text text-3xl xs:text-5xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter font-bold text-center leading-tight">
            Hi, I'm Ritu Kumari
          </h3>
          <div className="w-full sm:w-[90%] md:w-[75%] max-w-2xl mt-2 sm:mt-3">
            <h5 className="text-xs sm:text-sm md:text-base lg:text-lg text-center leading-relaxed">I'm a creative video editor and 3D artist</h5>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] text-center mt-2 sm:mt-2 leading-relaxed px-2">
              who specializes in crafting cinematic visuals, realistic 3D models, and engaging motion stories.
            </p>
          </div>
        </div>

        {/* Canvas with animated background */}
        <Canvas
          key={`canvas-${location.pathname}`}
          camera={{ fov: cameraFov, position: cameraPosition }}
          gl={{ preserveDrawingBuffer: true }}
        >
          {/* Controls & Environment */}
          <OrbitControls enableZoom={false} autoRotate={false} enableRotate={false} />
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr" />

          {/* Animated Particles in the background */}
          <Particles count={isMobile ? 150 : 300} isMobile={isMobile} />

          {/* Scrollable 3D Content */}
          <ScrollControls pages={1}>
            <MacContainer />
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
}

export default Mack;