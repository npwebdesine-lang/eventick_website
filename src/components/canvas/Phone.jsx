import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { useScrollStore } from '../../store/scroll'
import * as THREE from 'three'

export default function Phone() {
  const ref = useRef()
  const progress = useScrollStore((s) => s.progress)

  useFrame((_, delta) => {
    if (!ref.current) return

    const targetRotY = progress * Math.PI * 1.5
    const targetY = Math.sin(progress * Math.PI) * 0.8
    const targetScale = 1 - progress * 0.3

    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, delta * 3)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, delta * 3)
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, delta * 3))
  })

  return (
    <group ref={ref}>
      <RoundedBox args={[1.2, 2.4, 0.12]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.15} />
      </RoundedBox>
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[1.0, 2.0]} />
        <meshStandardMaterial color="#0d0d1a" emissive="#6366f1" emissiveIntensity={0.1} />
      </mesh>
    </group>
  )
}
