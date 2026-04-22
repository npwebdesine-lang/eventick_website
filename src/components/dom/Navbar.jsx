import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Navbar() {
  const navRef = useRef()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useGSAP(() => {
    let proxy = { scroll: 0 },
      proxy2 = { scroll: 0 },
      proxyCallback = function (value) {
        proxy.scroll = value
      },
      clamp = gsap.utils.clamp(0, 1)

    gsap.set(navRef.current, { y: 0 })
    ScrollTrigger.create({
      onUpdate: (self) => {
        proxy2.scroll = clamp(self.getVelocity() / 300)
        proxy.scroll > proxy2.scroll
          ? gsap.to(proxy, {
              scroll: proxy2.scroll,
              onUpdate: proxyCallback,
              duration: 0.8,
              ease: 'power4',
            })
          : gsap.killTweensOf(proxy)

        if (self.getVelocity() < 0 && self.y > 10) {
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        } else if (self.getVelocity() > 50 && self.y < -navRef.current.offsetHeight) {
          gsap.to(navRef.current, {
            y: -navRef.current.offsetHeight - 20,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      },
    })
  }, { scope: navRef })

  return (
    <>
      <nav className="navbar" ref={navRef} style={{ pointerEvents: 'auto' }}>
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <span className="logo-text">
              Event<span className="logo-accent">tick</span>
            </span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="/" className="nav-link active">
                בית
              </a>
            </li>
            <li>
              <a href="/modules.html" className="nav-link">
                מודולים ומחירים
              </a>
            </li>
            <li>
              <a href="/contact.html" className="nav-link">
                צרו קשר
              </a>
            </li>
          </ul>
          <a href="/contact.html" className="nav-cta">
            התחילו עכשיו
          </a>
          <button
            className="nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="פתח תפריט"
            style={{ pointerEvents: 'auto' }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} style={{ pointerEvents: 'auto' }}>
        <ul>
          <li>
            <a href="/" onClick={() => setMobileMenuOpen(false)}>
              בית
            </a>
          </li>
          <li>
            <a href="/modules.html" onClick={() => setMobileMenuOpen(false)}>
              מודולים ומחירים
            </a>
          </li>
          <li>
            <a href="/contact.html" onClick={() => setMobileMenuOpen(false)}>
              צרו קשר
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
