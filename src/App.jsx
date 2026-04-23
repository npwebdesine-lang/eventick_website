import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollStore } from './store/scroll'
import { useMouseStore } from './store/mouse'
import { useReducedMotion } from './hooks/useReducedMotion'
import Scene from './components/canvas/Scene'
import Navbar from './components/dom/Navbar'
import Hero from './components/dom/Hero'
import Journey from './components/dom/Journey'
import Features from './components/dom/Features'
import Bento from './components/dom/Bento'
import Stats from './components/dom/Stats'
import CTA from './components/dom/CTA'
import Footer from './components/dom/Footer'
import SectionDivider from './components/dom/SectionDivider'
import Debug from './components/Debug'

export default function App() {
  const mainRef = useRef()
  const setProgress = useScrollStore((s) => s.setProgress)
  const setMouse = useMouseStore((s) => s.setMouse)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMouse(x, y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [setMouse])

  useGSAP(
    () => {
      // Master scroll timeline — maps entire page scroll to 3D animation
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: prefersReduced ? 0.1 : 0.6, // Faster response if user prefers reduced motion
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
    { dependencies: [setProgress, prefersReduced] }
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
        <SectionDivider id="hero-journey" />
        <Journey />
        <SectionDivider id="journey-features" />
        <Features />
        <SectionDivider id="features-bento" />
        <Bento />
        <SectionDivider id="bento-stats" />
        <Stats />
        <SectionDivider id="stats-cta" />
        <CTA />
        <Footer />
      </main>

      {/* Debug Panel */}
      <Debug />
    </div>
  )
}
