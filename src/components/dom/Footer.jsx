import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Footer() {
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
        stagger: 0.05,
        scrollTrigger: { trigger: ref.current, start: 'top 95%', once: true },
      }
    )
  }, { scope: ref })

  return (
    <footer className="footer" ref={ref} style={{ pointerEvents: 'auto' }}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section reveal">
            <div className="footer-logo">
              <span className="logo-text">
                Event<span className="logo-accent">tick</span>
              </span>
            </div>
            <p className="footer-description">
              טרנספורמציה דיגיטלית לאירועים בכל גודל. מהזמנה ועד זיכרון לתמיד.
            </p>
          </div>

          <div className="footer-section reveal">
            <h4>ניווט</h4>
            <ul>
              <li><a href="/">בית</a></li>
              <li><a href="/modules.html">מודולים</a></li>
              <li><a href="/contact.html">צרו קשר</a></li>
            </ul>
          </div>

          <div className="footer-section reveal">
            <h4>משפטי</h4>
            <ul>
              <li><a href="#">תנאים</a></li>
              <li><a href="#">פרטיות</a></li>
              <li><a href="#">עוגיות</a></li>
            </ul>
          </div>

          <div className="footer-section reveal">
            <h4>יצור קשר</h4>
            <p>
              <a href="mailto:hello@eventick.co" style={{ pointerEvents: 'auto' }}>hello@eventick.co</a>
            </p>
            <p>
              <a href="tel:+972123456789" style={{ pointerEvents: 'auto' }}>+972 1 2345 6789</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom reveal">
          <p>&copy; 2024 Eventick. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  )
}
