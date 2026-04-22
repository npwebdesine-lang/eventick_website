import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Stats() {
  const ref = useRef()
  const [counters, setCounters] = useState({ events: 0, users: 0, satisfaction: 0 })

  useGSAP(() => {
    const stats = [
      { selector: '.stat-card:nth-child(1)', target: 500, label: 'אירועים', suffix: '+' },
      { selector: '.stat-card:nth-child(2)', target: 50000, label: 'אורחים', suffix: '+' },
      { selector: '.stat-card:nth-child(3)', target: 4.9, label: 'דירוג', suffix: '★' },
    ]

    stats.forEach((stat, idx) => {
      const card = ref.current.querySelector(stat.selector)
      if (card) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.from({ val: 0 }, {
              val: stat.target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                const val = stat.target === 4.9
                  ? this.targets()[0].val.toFixed(1)
                  : Math.floor(this.targets()[0].val)
                const display = stat.target > 100
                  ? val >= 1000 ? (val / 1000).toFixed(0) + 'K' : val
                  : val
                card.querySelector('.stat-value').textContent = display + stat.suffix
              },
            })
          },
        })
      }
    })
  }, { scope: ref })

  return (
    <section className="stats-section" ref={ref} style={{ pointerEvents: 'auto' }}>
      <div className="container">
        <div className="stats-header reveal">
          <h2 className="section-title reveal">
            קצת על ההצלחה שלנו<br />
            <span className="gradient-text">בספרות.</span>
          </h2>
        </div>

        <div className="stats-grid">
          <div className="stat-card reveal">
            <div className="stat-value">0+</div>
            <div className="stat-name">אירועים מנוהלים</div>
            <div className="stat-detail">בחודש שלפחות</div>
          </div>

          <div className="stat-card reveal">
            <div className="stat-value">0+</div>
            <div className="stat-name">אורחים מחוברים</div>
            <div className="stat-detail">בזמן סימולטני</div>
          </div>

          <div className="stat-card reveal">
            <div className="stat-value">0★</div>
            <div className="stat-name">דירוג על App Store</div>
            <div className="stat-detail">מ-1,200+ ביקורות</div>
          </div>
        </div>
      </div>
    </section>
  )
}
