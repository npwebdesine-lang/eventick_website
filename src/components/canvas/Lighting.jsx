export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#6366f1" />
      <pointLight position={[3, -2, 1]} intensity={0.5} color="#f59e0b" />
    </>
  )
}
