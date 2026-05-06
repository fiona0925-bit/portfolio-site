const header = document.querySelector(".site-header");
const currentYear = document.querySelector("#year");
const navLinks = document.querySelectorAll(".nav a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 6);
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", isActive);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-20% 0px -40% 0px"
  }
);

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();
