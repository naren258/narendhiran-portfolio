// ==========================================================================
// Mobile navigation menu
// Toggles the nav links open/closed, and closes them again once a link
// inside the menu is clicked (so it doesn't stay open after navigating).
// ==========================================================================

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

// ==========================================================================
// Scroll reveal animation
// Fades and slides each card/section into view the first time it enters
// the viewport, using IntersectionObserver so we're not listening to
// scroll events directly.
// ==========================================================================

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

        // Only need to animate an element once.
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  revealTargets.forEach((el) => {
    // Start hidden/offset, then let the observer reveal it on scroll.
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    observer.observe(el);
  });
}

initMobileMenu();
initScrollReveal();
