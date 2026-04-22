import { Canvas } from '@react-three/fiber'
import Phone from './Phone'
import Lighting from './Lighting'

export default function Scene() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: -1 }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
    >
      <Lighting />
      <Phone />
    </Canvas>
  )
}
