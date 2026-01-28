const navToggle = document.querySelector(".nav-toggle");
const navClose = document.querySelector(".nav-close");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-links a");
const revealTargets = document.querySelectorAll(".reveal");
const smoothLinks = document.querySelectorAll('a[href^="#"]');

const setMenuState = (isOpen) => {
  if (!mobileMenu || !navToggle) return;
  mobileMenu.classList.toggle("is-open", isOpen);
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
};

navToggle?.addEventListener("click", () => setMenuState(true));
navClose?.addEventListener("click", () => setMenuState(false));
mobileMenu?.addEventListener("click", (event) => {
  if (event.target === mobileMenu) {
    setMenuState(false);
  }
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

smoothLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuState(false);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((target) => revealObserver.observe(target));
