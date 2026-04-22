import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { useScrollStore } from '../../store/scroll'
import * as THREE from 'three'

export default function Phone() {
  const ref = useRef()
  const screenRef = useRef()
  const progress = useScrollStore((s) => s.progress)

  useFrame(({ clock }, delta) => {
    if (!ref.current) return

    const time = clock.getElapsedTime()
    const targetRotY = progress * Math.PI * 1.5
    const targetY = Math.sin(progress * Math.PI) * 0.8
    const targetScale = 1 - progress * 0.3

    // Main animations driven by scroll
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, delta * 3)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, delta * 3)
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, delta * 3))

    // Idle floating animation when scroll is idle
    const idleFloat = Math.sin(time * 0.5) * 0.05
    ref.current.position.z += idleFloat * delta

    // Screen glow pulse
    if (screenRef.current) {
      const glowIntensity = 0.15 + Math.sin(time * 2) * 0.08
      screenRef.current.material.emissiveIntensity = glowIntensity
    }
  })

  return (
    <group ref={ref}>
      {/* Phone body with enhanced material */}
      <RoundedBox args={[1.2, 2.4, 0.12]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.85}
          roughness={0.12}
          envMapIntensity={1.2}
        />
      </RoundedBox>

      {/* Phone bezels */}
      <RoundedBox args={[1.18, 2.38, 0.14]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color="#4f46e5"
          metalness={0.9}
          roughness={0.08}
          envMapIntensity={1.3}
        />
      </RoundedBox>

      {/* Screen with glow */}
      <mesh position={[0, 0, 0.075]} ref={screenRef}>
        <planeGeometry args={[1.0, 2.0]} />
        <meshStandardMaterial
          color="#0d0d1a"
          emissive="#6366f1"
          emissiveIntensity={0.15}
          toneMapped={false}
        />
      </mesh>

      {/* Screen inner glow */}
      <mesh position={[0, 0, 0.076]}>
        <planeGeometry args={[0.95, 1.95]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.08}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
