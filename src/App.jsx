import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollStore } from './store/scroll'
import Scene from './components/canvas/Scene'
import Navbar from './components/dom/Navbar'
import Hero from './components/dom/Hero'
import Journey from './components/dom/Journey'
import Features from './components/dom/Features'
import Bento from './components/dom/Bento'
import Stats from './components/dom/Stats'
import CTA from './components/dom/CTA'
import Footer from './components/dom/Footer'
import Debug from './components/Debug'

export default function App() {
  const mainRef = useRef()
  const setProgress = useScrollStore((s) => s.setProgress)

  useGSAP(
    () => {
      // Master scroll timeline — maps entire page scroll to 3D animation
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6, // Smooth ease between scroll and animation
        onUpdate: (st) => {
          // Progress: 0 (top) → 1 (bottom)
          setProgress(st.progress)
        },
      })

      // Refresh on window resize
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { dependencies: [setProgress] }
  )

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Layer 1: Fixed 3D Canvas */}
      <Scene />

      {/* Layer 2: DOM Overlay */}
      <main
        ref={mainRef}
        style={{
          position: 'relative',
          zIndex: 1,
          pointerEvents: 'none',
          backgroundColor: 'var(--bg, #05050f)',
          color: 'var(--text, #ffffff)',
        }}
      >
        <Navbar />
        <Hero />
        <Journey />
        <Features />
        <Bento />
        <Stats />
        <CTA />
        <Footer />
      </main>

      {/* Debug Panel */}
      <Debug />
    </div>
  )
}
