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

export default function App() {
  const mainRef = useRef()
  const setProgress = useScrollStore((s) => s.setProgress)

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (st) => setProgress(st.progress),
      })
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
    </div>
  )
}
