import { useGLTF, useScroll, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

function MacContainer() {
  const model = useGLTF("./mac.glb")
  const image = useTexture('./image3.webp')
  const data = useScroll()
  const [isMobile, setIsMobile] = useState(false)

  // Check screen size for responsive scaling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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

  useFrame((state, delta) => {
    if (meshes.screen && data) {
      meshes.screen.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90)
    }
  })

  // Responsive positioning and scaling
  const position = isMobile ? [0, -3, 15] : [0, -12, 20]
  const scale = isMobile ? 0.6 : 1

  return (
    <group position={position} scale={scale}>
      <primitive object={model.scene}></primitive>
    </group>
  )
} 

export default MacContainer 