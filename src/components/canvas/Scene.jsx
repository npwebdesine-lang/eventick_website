import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Phone from './Phone'
import DynamicLighting from './DynamicLighting'
import Camera from './Camera'

export default function Scene() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: -1 }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        stencil: false,
        depth: true,
        pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x05050f, 0)
        gl.shadowMap.enabled = true
        gl.shadowMap.type = 1 // PCFShadowMap
      }}
    >
      <Suspense fallback={null}>
        <Camera />
        <DynamicLighting />
        <Phone />
      </Suspense>
    </Canvas>
  )
}
