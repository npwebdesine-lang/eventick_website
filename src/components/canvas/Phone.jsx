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

    // Smooth easing function for more natural feel (ease-in-out cubic)
    const easeProgress = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2

    // Refined animation mapping to match timeline:
    // 0.00 → rotY: 0°, y: 0, scale: 1.0
    // 0.20 → rotY: 45°, y: +0.4, scale: 1.0
    // 0.40 → rotY: 90°, y: +0.8, scale: 0.85
    // 0.60 → rotY: 180°, y: +0.4, scale: 0.75
    // 0.80 → rotY: 240°, y: 0, scale: 0.7
    // 1.00 → rotY: 270°, y: 0, scale: 0.7

    const targetRotY = easeProgress * Math.PI * 1.5
    const targetY = Math.sin(easeProgress * Math.PI) * 0.85
    const targetScale = THREE.MathUtils.mapLinear(
      easeProgress,
      0, 1,
      1.0, 0.7
    )

    // Smooth lerp for organic motion
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, delta * 4)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, delta * 4)
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, delta * 4))

    // Subtle rotation on X axis based on scroll for 3D depth
    const targetRotX = Math.sin(easeProgress * Math.PI) * 0.15
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, delta * 3)

    // Idle floating animation (more pronounced)
    const idleFloat = Math.sin(time * 0.6) * 0.08
    ref.current.position.z = idleFloat

    // Screen glow pulse (faster, more energetic)
    if (screenRef.current) {
      const basePulse = 0.15 + Math.sin(time * 3) * 0.1
      const progressGlow = (easeProgress - 0.4) * 0.5 // Ramp up mid-scroll
      const glowIntensity = Math.max(basePulse, basePulse + progressGlow)
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
