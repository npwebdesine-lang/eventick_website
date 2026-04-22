import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Journey() {
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
    <section className="journey-section" ref={ref} style={{ pointerEvents: 'auto' }}>
      <div className="container">
        <div className="section-tag reveal">המסע שלכם</div>
        <h2 className="section-title reveal">
          תהליך שלם,<br />
          <span className="gradient-text">שמשאיר אתכם בידיים מלאות.</span>
        </h2>
        <p className="section-sub reveal">
          התהליך שאנחנו מעבירים מתחיל לפני האירוע, ממשיך בשיא האנרגיה בזמן
          האירוע, ובסוף - אתם יוצאים עם מזכרות, נתונים ואלבומים לכל החיים.
        </p>

        <div className="journey-grid">
          <div className="journey-step reveal">
            <div className="j-icon">1</div>
            <h3>לפני האירוע</h3>
            <p>
              שליחת הזמנות מעוצבות, איסוף אישורי הגעה (RSVP), ותיאום טרמפים חכם
              בין האורחים שכבר מתחילים להתרגש.
            </p>
          </div>
          <div className="journey-line reveal"></div>
          <div className="journey-step reveal">
            <div className="j-icon" style={{ background: 'var(--primary)' }}>
              2
            </div>
            <h3>בזמן האירוע</h3>
            <p>
              האורחים משחקים ב"שובר קרח", מכירים דרך Daitline, מוצאים את המושב
              שלהם בקלות ומצלמים בלי סוף לפוטוסטרים החי.
            </p>
          </div>
          <div className="journey-line reveal"></div>
          <div className="journey-step reveal">
            <div className="j-icon" style={{ background: 'var(--accent)' }}>
              3
            </div>
            <h3>לאחר האירוע</h3>
            <p>
              אתם לא יוצאים בידיים ריקות. מקבלים אלבום תמונות ענק (ZIP) מכל
              זווית אפשרית, וספר ברכות דיגיטלי מכל האורחים.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
