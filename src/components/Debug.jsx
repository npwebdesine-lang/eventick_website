import { useScrollStore } from '../store/scroll'

export default function Debug() {
  const progress = useScrollStore((s) => s.progress)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#6366f1',
        padding: '12px 16px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 9999,
        pointerEvents: 'none',
        border: '1px solid #6366f1',
      }}
    >
      <div>Scroll Progress: {progress.toFixed(2)}</div>
      <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.6 }}>
        Phone Rotation Y: {(progress * Math.PI * 1.5).toFixed(2)} rad
      </div>
    </div>
  )
}
