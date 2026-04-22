import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScrollStore } from '../../store/scroll'
import * as THREE from 'three'

export default function Camera() {
  const cameraRef = useRef()
  const progress = useScrollStore((s) => s.progress)
  const { camera } = useThree()

  useFrame((_, delta) => {
    if (!cameraRef.current) return

    // Camera position based on scroll progress
    // Creates a subtle orbit effect around the phone
    const radius = 5.5
    const scrollAngle = progress * Math.PI * 0.5
    const targetX = Math.cos(scrollAngle) * 0.8
    const targetZ = radius + progress * 0.5

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 2)

    // Subtle tilt based on progress
    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z,
      Math.sin(progress * Math.PI) * 0.08,
      delta * 2
    )

    // Look at the center of the scene slightly offset by progress
    const targetLookAt = new THREE.Vector3(
      Math.sin(progress * Math.PI * 2) * 0.3,
      Math.sin(progress * Math.PI) * 0.5,
      0
    )
    camera.lookAt(targetLookAt)
  })

  return null
}
