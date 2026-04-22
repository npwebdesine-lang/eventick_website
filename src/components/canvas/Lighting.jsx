export default function Lighting() {
  return (
    <>
      {/* Ambient base light */}
      <ambientLight intensity={0.35} color="#ffffff" />

      {/* Main key light - cool white from top-right */}
      <directionalLight
        position={[8, 6, 5]}
        intensity={1.4}
        color="#ffffff"
        castShadow
      />

      {/* Fill light - from left, warm tint */}
      <directionalLight
        position={[-6, 3, -2]}
        intensity={0.6}
        color="#f59e0b"
      />

      {/* Brand accent light - indigo from front-left */}
      <pointLight
        position={[-4, 1, 4]}
        intensity={1.2}
        color="#6366f1"
        distance={15}
        decay={2}
      />

      {/* Accent light - amber from back-right */}
      <pointLight
        position={[5, -2, -3]}
        intensity={0.8}
        color="#f59e0b"
        distance={12}
        decay={2}
      />

      {/* Rim light - from back, subtle */}
      <pointLight
        position={[0, 0, -6]}
        intensity={0.4}
        color="#a78bfa"
        distance={10}
        decay={2}
      />

      {/* Top accent - for screen glow reflection */}
      <pointLight
        position={[0, 3, 2]}
        intensity={0.6}
        color="#ec4899"
        distance={8}
        decay={2}
      />
    </>
  )
}
