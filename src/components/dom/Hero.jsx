import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero() {
  const ref = useRef()
  const phoneRef = useRef()
  const [phoneTheme, setPhoneTheme] = useState({
    bg: '#13131f',
    primary: '#6366f1',
    text: '#ffffff',
  })

  useGSAP(() => {
    gsap.fromTo(
      ref.current.querySelectorAll('.reveal'),
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      }
    )
  }, { scope: ref })

  const themes = [
    { bg: '#13131f', primary: '#6366f1', text: '#ffffff', label: 'קלאסי כהה' },
    { bg: '#fff8e7', primary: '#4e342e', text: '#4e342e', label: 'קפוצ\'ינו' },
    { bg: '#a8d8c8', primary: '#003f5c', text: '#003f5c', label: 'מי ים' },
    { bg: '#ffbcc2', primary: '#7a2e00', text: '#7a2e00', label: 'יונה מדברית' },
    { bg: '#d0f0c0', primary: '#1e4d2b', text: '#1e4d2b', label: 'היער הקסום' },
    { bg: '#ffd1e8', primary: '#7a0050', text: '#7a0050', label: 'לוליפופ' },
    { bg: '#c87740', primary: '#2e1f26', text: '#2e1f26', label: 'קרמל מלוח' },
  ]

  const handleThemeChange = (theme) => {
    setPhoneTheme(theme)
    if (phoneRef.current) {
      gsap.to(phoneRef.current, {
        '--p-bg': theme.bg,
        '--p-primary': theme.primary,
        '--p-text': theme.text,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }

  return (
    <section className="hero" ref={ref} style={{ pointerEvents: 'auto' }}>
      <div className="hero-orb orb-1"></div>
      <div className="hero-orb orb-2"></div>
      <div className="hero-orb orb-3"></div>

      <div className="hero-content">
        <div className="hero-badge reveal">
          <span className="badge-dot"></span>
          <span>חדש: מערכת אישורי הגעה שודרגה</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-line-1">חווית האירוע</span>
          <br />
          <span className="hero-line-2 gradient-text">מוגדרת מחדש</span>
        </h1>

        <p className="hero-sub reveal">
          Eventick מלווה אתכם מתחילת התכנונים ועד שאתם יוצאים בידיים מלאות.
          הופכים כל אירוע לחוויה חברתית בלתי נשכחת.
        </p>

        <div className="hero-actions reveal">
          <a href="/contact.html" className="btn btn-primary btn-large" style={{ pointerEvents: 'auto' }}>
            <span>צרו אירוע עכשיו</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </a>
          <a href="/modules.html" className="btn btn-ghost" style={{ pointerEvents: 'auto' }}>
            גלו את המודולים
          </a>
        </div>

        <div className="hero-stats reveal">
          <div className="hero-stat">
            <span className="stat-num">500+</span>
            <span className="stat-label">אירועים</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="stat-num">50K+</span>
            <span className="stat-label">אורחים מחוברים</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="stat-num">4.9★</span>
            <span className="stat-label">דירוג ממוצע</span>
          </div>
        </div>
      </div>

      <div className="hero-mockup-wrapper">
        <div className="hero-mockup">
          <div
            className="mockup-phone"
            ref={phoneRef}
            style={{
              '--p-bg': phoneTheme.bg,
              '--p-primary': phoneTheme.primary,
              '--p-text': phoneTheme.text,
            }}
          >
            <div className="phone-screen">
              <div className="phone-header">
                <div className="phone-avatar"></div>
                <span>חתונת שרה ודוד ✨</span>
                <span className="phone-live">LIVE</span>
              </div>
              <div className="phone-feed">
                <div className="feed-photo photo-1"></div>
                <div className="feed-photo photo-2"></div>
                <div className="feed-photo photo-3"></div>
              </div>
              <div className="phone-actions">
                <div className="action-btn">📸 צלמו</div>
                <div className="action-btn">💘 הכירו</div>
                <div className="action-btn">🎯 שחקו</div>
              </div>
            </div>
          </div>
        </div>

        <div className="theme-selector reveal">
          <div className="theme-title">מגוון עיצובים לאירוע שלכם</div>
          <div className="theme-buttons">
            {themes.map((theme, idx) => (
              <button
                key={idx}
                className={`theme-btn ${theme.bg === phoneTheme.bg ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme)}
                title={theme.label}
                style={{ pointerEvents: 'auto' }}
              >
                <span className="c-bg" style={{ background: theme.bg }}></span>
                <span className="c-pr" style={{ background: theme.primary }}></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
