import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CTA() {
  const ref = useRef()

  useGSAP(() => {
    gsap.fromTo(
      ref.current.querySelectorAll('.reveal'),
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      }
    )
  }, { scope: ref })

  return (
    <section className="cta-section" ref={ref} style={{ pointerEvents: 'auto' }}>
      <div className="container">
        <div className="cta-bg-glow"></div>
        <div className="cta-content">
          <h2 className="cta-title reveal">
            הגיע הזמן לתחזוקת הפרטים של האירוע שלכם
          </h2>
          <p className="cta-sub reveal">
            הצטרפו ל-500+ אירועים שכבר מנוצלים את Eventick לשיא שלהם.
          </p>
          <a href="/contact.html" className="btn btn-primary btn-large reveal" style={{ pointerEvents: 'auto' }}>
            צרו אירוע עכשיו בחינם
          </a>
        </div>
      </div>
    </section>
  )
}
