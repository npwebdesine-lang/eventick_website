// 1. רישום פלאגין הגלילה של GSAP
gsap.registerPlugin(ScrollTrigger);

// 2. הגדרת Lenis - גלילה חלקה
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// סינכרון Lenis ל-ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

// ==========================================
// 3. אנימציות מסך הפתיחה (Hero)
// ==========================================
window.addEventListener("load", () => {
  const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

  tl.to(".char", {
    opacity: 1,
    y: 0,
    rotateX: 0,
    stagger: 0.08,
    duration: 1.5,
    ease: "back.out(1.7)",
  })
    .to(".hero-subtitle-inline", { opacity: 1, y: 0 }, "-=1")
    .to(".cta-button", { opacity: 1, y: 0 }, "-=0.8");
});

// ==========================================
// 4. גלילה אופקית + מנהל המחוות של האיש המארח
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".features-container");

  // אנימציית הליכה קבועה וקלה (לופ)
  const walkCycle = gsap
    .timeline({ repeat: -1 })
    .to(
      ["#leg-front", "#leg-left"],
      {
        rotation: -15,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      },
      0,
    )
    .to(
      ["#leg-back", "#leg-right"],
      {
        rotation: 15,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      },
      0,
    );

  // א. מנוע הגלילה האופקית המרכזי (scrub מופעל)
  let horizontalScroll = gsap.to(container, {
    x: () => container.scrollWidth - window.innerWidth, // מזיז ימינה באתר RTL
    ease: "none",
    scrollTrigger: {
      trigger: ".features-wrapper",
      pin: true, // מקפיא את המסך במקום
      scrub: 1, // מחבר את האנימציה לעכבר
      end: () => "+=" + container.scrollWidth,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // מסובבים את הדמות לפי כיוון הגלילה (כמו ב-image_12.png)
        gsap.to("#interactive-host", {
          scaleX: self.direction === 1 ? -1 : 1,
          duration: 0.2,
        });
        // מהירות הליכה לפי מהירות הגלילה
        walkCycle.timeScale(Math.abs(self.getVelocity() / 300));
      },
    },
  });

  // ==========================================
  // ב. מנהל המחוות (Gesture Manager)
  // ==========================================
  const gestureTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".features-wrapper",
      start: "top top",
      end: () => "+=" + container.scrollWidth,
      scrub: 1, // מסנכרן את המחוות לגלילה
    },
  });

  // מחכים קצת ואז מתחילים
  gestureTL.addLabel("start", "+=0.2");

  // מחוות דמה לדוגמה (שתוכל להפעיל בהמשך):

  // מחווה 1: "מחווה של הצבעה" (לפאנל 1)
  gestureTL
    .to(
      "#arm-left",
      { rotation: 50, duration: 1, ease: "back.out" },
      "start+=0.5",
    ) // מרים יד
    .to("#arm-left-forearm", { rotation: 90, duration: 0.8 }, "<") // מקפל אמה
    // מציג בועת דיבור בתיזום
    .to(
      "#character-speech",
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out" },
      "<+0.5",
    );

  // בועת דיבור נעלמת
  gestureTL.to(
    "#character-speech",
    { opacity: 0, scale: 0.8, y: 20, duration: 0.5 },
    "+=1.5",
  );

  // החזרת היד למצב פרוס (לופ)
  gestureTL
    .to("#arm-left", { rotation: 0, duration: 0.8 }, "+=0.5")
    .to("#arm-left-forearm", { rotation: 0, duration: 0.8 }, "<");

  // מחווה 2: "מחווה של המתנה" (לפאנל 2)
  gestureTL
    .to(["#arm-right", "#arm-left"], { rotation: 0, duration: 1 }, "+=1") // מחזיר ידיים לגוף
    .to(
      ["#arm-right-forearm", "#arm-left-forearm"],
      { rotation: 10, duration: 1 },
      "<",
    ) // מקפל קצת
    .to(
      "#character-speech",
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out" },
      "<+0.5",
    );

  gestureTL.to(
    "#character-speech",
    { opacity: 0, scale: 0.8, y: 20, duration: 0.5 },
    "+=1.5",
  );

  // החזרת ידיים לפרוס (לופ)
  gestureTL
    .to(["#arm-right", "#arm-left"], { rotation: 15, duration: 0.8 }, "+=0.5")
    .to(
      ["#arm-right-forearm", "#arm-left-forearm"],
      { rotation: 0, duration: 0.8 },
      "<",
    );

  // מחווה 3: "מחווה של סריקה" (לפאנל 3)
  gestureTL
    .to("#arm-right", { rotation: -60, duration: 1, ease: "back.out" }, "+=1.5")
    .to("#arm-right-forearm", { rotation: -120, duration: 0.8 }, "<") // מקפל עמוק
    .to(
      "#character-speech",
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out" },
      "<+0.5",
    );

  gestureTL.to(
    "#character-speech",
    { opacity: 0, scale: 0.8, y: 20, duration: 0.5 },
    "+=1.5",
  );

  gestureTL
    .to("#arm-right", { rotation: 15, duration: 0.8 }, "+=0.5")
    .to("#arm-right-forearm", { rotation: 0, duration: 0.8 }, "<");
});
