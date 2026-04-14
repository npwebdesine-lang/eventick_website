/* ============================================================
   Eventick — script.js
   GSAP animations, Lenis scroll, Theme Switcher
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0, 0);

// Nav & Menu
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

if (navToggle) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
}

// Reveal Animations
document.querySelectorAll(".reveal").forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    },
  );
});

// Phone Theme Switcher
const themeBtns = document.querySelectorAll(".theme-btn");
const phoneMockup = document.querySelector(".mockup-phone");

if (themeBtns.length > 0 && phoneMockup) {
  themeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active from all
      themeBtns.forEach((b) => b.classList.remove("active"));
      // Add active to clicked
      btn.classList.add("active");

      // Update CSS variables for phone
      phoneMockup.style.setProperty("--p-bg", btn.dataset.bg);
      phoneMockup.style.setProperty("--p-primary", btn.dataset.primary);
      phoneMockup.style.setProperty("--p-text", btn.dataset.text);
    });
  });
}

// Stats counter
const statCards = document.querySelectorAll(".stat-card[data-count]");
statCards.forEach((card) => {
  const numEl = card.querySelector(".stat-number");
  const target = parseFloat(card.dataset.count);
  const suffix = card.dataset.suffix || "";
  const isRating = card.dataset.decimal === "true";

  ScrollTrigger.create({
    trigger: card,
    start: "top 85%",
    once: true,
    onEnter() {
      gsap.fromTo(
        { val: 0 },
        {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate() {
            if (isRating) {
              numEl.textContent =
                (this.targets()[0].val / 10).toFixed(1) + suffix;
            } else {
              let v = Math.round(this.targets()[0].val);
              numEl.textContent =
                v >= 1000 ? (v / 1000).toFixed(0) + "K" + suffix : v + suffix;
            }
          },
        },
      );
    },
  });
});

// Form Submission (Simulated)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = document.getElementById("submitBtn");
    btn.innerHTML = '<span class="btn-spinner" style="display:block;"></span>';

    setTimeout(() => {
      contactForm.style.display = "none";
      document.getElementById("formSuccess").style.display = "flex";
    }, 1500);
  });
}

// Add advanced animations for buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  gsap.fromTo(
    button,
    { scale: 1 },
    {
      scale: 1.1,
      duration: 0.3,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      paused: true,
    },
  );

  button.addEventListener("mouseenter", () => {
    gsap.to(button, { scale: 1.1, duration: 0.3 });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, { scale: 1, duration: 0.3 });
  });
});
