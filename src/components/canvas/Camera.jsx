import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScrollStore } from '../../store/scroll'
import { useMouseStore } from '../../store/mouse'
import * as THREE from 'three'

export default function Camera() {
  const cameraRef = useRef()
  const progress = useScrollStore((s) => s.progress)
  const { x: mouseX, y: mouseY } = useMouseStore((s) => ({ x: s.x, y: s.y }))
  const { camera, viewport } = useThree()

  // Responsive camera distance based on viewport
  const isMobile = viewport.width < 768
  const baseRadius = isMobile ? 6.5 : 5.5
  const fov = isMobile ? 50 : 45

  useFrame((_, delta) => {
    if (!cameraRef.current) return

    // Update FOV responsively
    camera.fov = fov
    camera.updateProjectionMatrix()

    // Camera position based on scroll progress
    // Creates a subtle orbit effect around the phone
    const scrollAngle = progress * Math.PI * 0.5
    const targetX = Math.cos(scrollAngle) * 0.8
    const targetZ = baseRadius + progress * 0.5

    // Add mouse parallax to camera
    const mouseInfluence = isMobile ? 0.3 : 0.6
    const cameraX = targetX + mouseX * mouseInfluence * 0.5
    const cameraZ = targetZ + mouseY * mouseInfluence * 0.3

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraX, delta * 2)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ, delta * 2)

    // Subtle tilt based on progress
    const tiltAmount = isMobile ? 0.04 : 0.08
    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z,
      Math.sin(progress * Math.PI) * tiltAmount + mouseX * 0.03,
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
