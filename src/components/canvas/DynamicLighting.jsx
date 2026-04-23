import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScrollStore } from '../../store/scroll'
import * as THREE from 'three'

export default function DynamicLighting() {
  const keyLightRef = useRef()
  const fillLightRef = useRef()
  const accentLightRef = useRef()
  const progress = useScrollStore((s) => s.progress)

  useFrame((_, delta) => {
    if (!keyLightRef.current || !fillLightRef.current || !accentLightRef.current) return

    // Dynamic intensity based on scroll
    // Peaks during middle sections (features, bento)
    const intensityPulse = 0.4 + Math.sin(progress * Math.PI * 2) * 0.15

    // Key light intensity increases mid-scroll
    const keyIntensity = 1.2 + (Math.sin(progress * Math.PI) * 0.3)
    keyLightRef.current.intensity = THREE.MathUtils.lerp(
      keyLightRef.current.intensity,
      keyIntensity,
      delta * 2
    )

    // Fill light responds to progress
    const fillIntensity = 0.6 + progress * 0.3
    fillLightRef.current.intensity = THREE.MathUtils.lerp(
      fillLightRef.current.intensity,
      fillIntensity,
      delta * 2
    )

    // Accent light pulses throughout scroll
    accentLightRef.current.intensity = THREE.MathUtils.lerp(
      accentLightRef.current.intensity,
      1.2 + intensityPulse,
      delta * 2
    )

    // Subtle color shift based on scroll section
    // Warmer in early sections, cooler in later sections
    const colorShift = progress * 0.1
    const warmth = new THREE.Color('#f59e0b').multiplyScalar(1 - colorShift)
    const coolness = new THREE.Color('#6366f1').multiplyScalar(colorShift)
    warmth.add(coolness)

    fillLightRef.current.color = warmth
  })

  return (
    <>
      <directionalLight
        ref={keyLightRef}
        position={[8, 6, 5]}
        intensity={1.4}
        color="#ffffff"
        castShadow
      />
      <directionalLight ref={fillLightRef} position={[-6, 3, -2]} color="#f59e0b" />
      <pointLight
        ref={accentLightRef}
        position={[-4, 1, 4]}
        color="#6366f1"
        distance={15}
        decay={2}
      />
    </>
  )
}
