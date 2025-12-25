import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ScrollControls } from "@react-three/drei";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

import MacContainer from "./MacContainer";
import MacContainerMobile from "./MacContainerMobile";

/* ------------------------
   Particles Component
------------------------ */
function Particles({ count = 200, isMobile = false }) {
  const meshRef = useRef();

  const positions = useMemo(() => {
    const temp = [];
    const range = isMobile ? 250 : 400;
    for (let i = 0; i < count; i++) {
      temp.push(
        (Math.random() - 0.5) * range,
        (Math.random() - 0.5) * range,
        (Math.random() - 0.5) * range
      );
    }
    return new Float32Array(temp);
  }, [count, isMobile]);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.0005;
    meshRef.current.rotation.x += 0.0003;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 1 : 1.5}
        color="#06b6d4"
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------
   Mack Page Component
------------------------ */
function Mack() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const [homeSettings, setHomeSettings] = useState({
    heroTitle: "Hi, I'm Ritu Kumari",
    heroSubtitle: "I'm a creative video editor and 3D artist",
    heroDescription:
      "who specializes in crafting cinematic visuals, realistic 3D models, and engaging motion stories.",
  });

  /* ---------- Refs for GSAP ---------- */
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);

  /* ---------- Responsive Check ---------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ---------- Load Home Settings ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("homeSettings");
    if (saved) setHomeSettings(JSON.parse(saved));
  }, []);

  /* ---------- GSAP Hero Animation ---------- */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      )
      .fromTo(
        subtitleRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.4"
      )
      .fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.4"
      );
  }, []);

  /* ---------- Camera Settings ---------- */
  const cameraFov = isMobile ? 20 : window.innerWidth < 1024 ? 15 : 12;
  const cameraPosition = isMobile
    ? [0, -3, 150]
    : window.innerWidth < 1024
    ? [0, -4, 180]
    : [0, -5, 220];

  return (
    <div className="w-full h-screen relative">
      {/* ---------- Hero Text ---------- */}
      <div
        ref={heroRef}
        className="w-full absolute flex flex-col items-center text-white top-18 sm:top-10 md:top-20 left-1/2 -translate-x-1/2 font-['Halvetica_Now_Display'] px-4 sm:px-6 z-10 opacity-0"
      >
        <h3
          ref={titleRef}
          className="mac-glow-text text-3xl xs:text-5xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter font-bold text-center leading-tight"
        >
          {homeSettings.heroTitle}
        </h3>

        <div className="w-full sm:w-[90%] md:w-[75%] max-w-2xl mt-2 sm:mt-3">
          <h5
            ref={subtitleRef}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-center leading-relaxed"
          >
            {homeSettings.heroSubtitle}
          </h5>

          <p
            ref={descRef}
            className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] text-center mt-2 leading-relaxed px-2"
          >
            {homeSettings.heroDescription}
          </p>
        </div>
      </div>

      {/* ---------- 3D Canvas ---------- */}
      <Canvas
        key={`canvas-${location.pathname}`}
        camera={{ fov: cameraFov, position: cameraPosition }}
        gl={{ preserveDrawingBuffer: true }}
        style={{ touchAction: isMobile ? "auto" : "none" }}
      >
        <OrbitControls enableZoom={false} enableRotate={false} />
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr" />

        <Particles count={isMobile ? 150 : 300} isMobile={isMobile} />

        {isMobile ? (
          <MacContainerMobile />
        ) : (
          <ScrollControls pages={1} damping={0.25}>
            <MacContainer />
          </ScrollControls>
        )}
      </Canvas>
    </div>
  );
}

export default Mack;