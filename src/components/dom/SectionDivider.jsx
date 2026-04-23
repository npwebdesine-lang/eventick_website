import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SectionDivider({ id }) {
  const ref = useRef()

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, scaleX: 0 },
      {
        opacity: 1,
        scaleX: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      }
    )
  }, { scope: ref })

  return (
    <div
      ref={ref}
      style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
        margin: '4rem 0',
        opacity: 0.5,
        transformOrigin: 'left',
      }}
    />
  )
}
