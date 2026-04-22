import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Features() {
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
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      }
    )
  }, { scope: ref })

  return (
    <section className="features-section" ref={ref} style={{ pointerEvents: 'auto' }}>
      <div className="container">
        <div className="section-tag reveal">קטגוריות מודולים</div>
        <h2 className="section-title reveal">
          התאימו את המודולים<br />
          <span className="gradient-text">בדיוק לצרכים שלכם.</span>
        </h2>

        <div className="features-grid">
          <div className="feature-card feature-wide reveal">
            <div className="cat-badge cat-afteruse">AFTERUSE</div>
            <span className="feature-icon">📸</span>
            <h3>פוטוסטרים חי וזיכרונות</h3>
            <p>
              מודול שמבטיח שלא תצאו בידיים ריקות. כל הרגעים הכי יפים נאספים
              אוטומטית. מקבלים את הכל בסוף האירוע בקליק אחד.
            </p>
            <ul className="feature-list">
              <li>העלאה בזמן אמת לכל האורחים</li>
              <li>סינון AI חכם ומיון אוטומטי</li>
              <li>הורדת אלבום מלא בסיום האירוע לתמיד</li>
            </ul>
          </div>

          <div className="feature-card reveal">
            <div className="cat-badge cat-ste">STE (Start To End)</div>
            <span className="feature-icon">💌</span>
            <h3>הזמנות ואישורי הגעה</h3>
            <p>ניהול מלא משלב השליחה ועד התודה שאחרי.</p>
            <ul className="feature-list">
              <li>הזמנה מעוצבת תואמת</li>
              <li>מערכת אישורי הגעה חכמה</li>
              <li>תזכורות אוטומטיות ב-SMS</li>
            </ul>
          </div>

          <div className="feature-card reveal">
            <div className="cat-badge cat-main">MAIN (באירוע בלבד)</div>
            <span className="feature-icon">💘</span>
            <h3>Daitline</h3>
            <p>הכירו אנשים מעניינים בצורה דיסקרטית בזמן האירוע.</p>
            <ul className="feature-list">
              <li>התאמה הדדית בלבד</li>
              <li>צ'אט פרטי ומוגן בתוך האולם</li>
            </ul>
          </div>

          <div className="feature-card reveal">
            <div className="cat-badge cat-main">MAIN (באירוע בלבד)</div>
            <span className="feature-icon">🎯</span>
            <h3>שובר קרח</h3>
            <p>משחקים קבוצתיים שגורמים לאורחים לצחוק ולהכיר.</p>
            <ul className="feature-list">
              <li>טריוויה מותאמת אישית</li>
              <li>בינגו חברתי וחידות</li>
            </ul>
          </div>

          <div className="feature-card reveal">
            <div className="cat-badge cat-ste">STE (Start To End)</div>
            <span className="feature-icon">🚗</span>
            <h3>לוח טרמפים חכם</h3>
            <p>מתחיל לפני האירוע, מסתיים בהורדה בטוחה בבית.</p>
            <ul className="feature-list">
              <li>תיאום נסיעות נוח מראש</li>
              <li>בטוח - רק לאורחי האירוע</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
