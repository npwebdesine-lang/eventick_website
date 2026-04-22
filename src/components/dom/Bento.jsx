import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Bento() {
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
    <section className="bento-section" ref={ref} style={{ pointerEvents: 'auto' }}>
      <div className="container">
        <div className="section-tag reveal">מבט על המערכת</div>
        <h2 className="section-title reveal">הרכיבו אירוע מנצח</h2>

        <div className="bento-grid">
          <div className="bento-card reveal" data-module="photos">
            <div className="cat-badge cat-afteruse" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
              AFTERUSE
            </div>
            <div className="bento-bg-glow bg-indigo"></div>
            <div className="bento-icon-big">📸</div>
            <h3>פוטוסטרים חי</h3>
            <p>
              אלבום משותף בזמן אמת — מצלמים באירוע, יוצאים עם תקיית תמונות לכל
              החיים.
            </p>
            <div className="bento-price">₪299</div>
          </div>

          <div className="bento-card reveal" data-module="dating">
            <div className="cat-badge cat-main" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
              MAIN
            </div>
            <div className="bento-bg-glow bg-pink"></div>
            <div className="bento-icon-big">💘</div>
            <h3>Daitline</h3>
            <p>היכרויות דיסקרטיות ובטוחות בין אורחי האירוע בזמן אמת.</p>
            <div className="bento-price">₪150</div>
          </div>

          <div className="bento-card reveal" data-module="icebreaker">
            <div className="cat-badge cat-main" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
              MAIN
            </div>
            <div className="bento-bg-glow bg-amber"></div>
            <div className="bento-icon-big">🎯</div>
            <h3>שובר קרח</h3>
            <p>משחקים חברתיים אינטראקטיביים שיוצרים אווירה היסטרית.</p>
            <div className="bento-price">₪99</div>
          </div>

          <div className="bento-card reveal" data-module="rideshare">
            <div className="cat-badge cat-ste" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
              STE
            </div>
            <div className="bento-bg-glow bg-green"></div>
            <div className="bento-icon-big">🚗</div>
            <h3>טרמפים לאירוע</h3>
            <p>תיאום נסיעות חכם בין אורחים. מתחילים את האירוע בנסיעה משותפת.</p>
            <div className="bento-price">₪99</div>
          </div>

          <div className="bento-card reveal" data-module="seating">
            <div className="cat-badge cat-main" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
              MAIN
            </div>
            <div className="bento-bg-glow bg-teal"></div>
            <div className="bento-icon-big">💺</div>
            <h3>מפת הושבה</h3>
            <p>
              תכנון ושיבוץ מושבים חכם. QR code שמציג לאורח איפה הוא יושב מיד
              בכניסה.
            </p>
            <div className="bento-price">₪199</div>
          </div>

          <div className="bento-card reveal" data-module="messages">
            <div className="cat-badge cat-ste" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
              STE
            </div>
            <div className="bento-bg-glow bg-purple"></div>
            <div className="bento-icon-big">📬</div>
            <h3>ספר ברכות דיגיטלי</h3>
            <p>כל אורח משאיר ברכה או ביחסו אישי. אתם מקבלים את הכל בקובץ PDF.</p>
            <div className="bento-price">₪99</div>
          </div>
        </div>

        <div className="pricing-bundle reveal" style={{ pointerEvents: 'auto' }}>
          <div className="bundle-badge">חבילה משכללת</div>
          <h3>חבילת Premium Full</h3>
          <p>כל המודולים ביחד, בהנחה משמעותית</p>
          <div className="bundle-price">₪799 <span className="bundle-original">₪1,299</span></div>
          <a href="/contact.html" className="btn btn-primary">
            בחרו חבילה זו
          </a>
        </div>
      </div>
    </section>
  )
}
