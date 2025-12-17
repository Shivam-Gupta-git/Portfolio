import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useEffect, useState, useRef } from 'react'
import * as THREE from 'three'

function MacContainerMobile() {
  const model = useGLTF("./mac.glb")
  const image = useTexture('./image3.webp')
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef(null)

  // Listen to window scroll instead of ScrollControls
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / (docHeight * 0.1), 1) // Use first 30% of page scroll
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Memoize meshes to avoid recreating on every render
  const meshes = useMemo(() => {
    const meshMap = {}
    if (model?.scene) {
      model.scene.traverse((e) => {
        if (e.name) {
          meshMap[e.name] = e
        }
      })
    }
    return meshMap
  }, [model])

  // Initialize mesh properties once when component mounts or meshes change
  useEffect(() => {
    if (meshes.screen) {
      meshes.screen.rotation.x = THREE.MathUtils.degToRad(180)
    }
    
    if (meshes.matte && meshes.matte.material) {
      meshes.matte.material.map = image
      meshes.matte.material.emissiveIntensity = 0
      meshes.matte.material.metalness = 0
      meshes.matte.material.roughness = 1
      meshes.matte.material.needsUpdate = true
    }
  }, [meshes, image])

  useFrame(() => {
    if (meshes.screen) {
      // Animate screen opening based on scroll progress
      meshes.screen.rotation.x = THREE.MathUtils.degToRad(180 - scrollProgress * 90)
    }
  })

  // Mobile positioning and scaling
  const position = [0, -3, 15]
  const scale = 0.6

  return (
    <group position={position} scale={scale}>
      <primitive object={model.scene}></primitive>
    </group>
  )
} 

export default MacContainerMobile

