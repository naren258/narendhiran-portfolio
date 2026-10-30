
function initMobileMenu() {
  const menuButton = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('#navLinks');

  if (!menuButton || !navLinks) return;

  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}


function initScrollReveal() {
  const revealTargets = document.querySelectorAll(
    '.skill-card, .project-card, .experience-card, .about-grid'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    observer.observe(el);
  });
}

function initExperienceParallax() {
  const card = document.querySelector('.experience-card');
  if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let frameRequested = false;

  const updateParallax = () => {
    const bounds = card.getBoundingClientRect();
    const offset = (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.08;
    card.style.setProperty('--parallax-offset', `${offset}px`);
    frameRequested = false;
  };

  const requestUpdate = () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updateParallax);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  updateParallax();
}

initMobileMenu();
initScrollReveal();
initExperienceParallax();
