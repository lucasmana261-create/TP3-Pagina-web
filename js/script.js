// Marca como activo el link del menú correspondiente a la sección visible.
// Preparado para cuando agregues las secciones Beneficios, 3 pasos, Modelos, etc.

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  });

  // --- "Tus recuerdos" / "en tus manos": aparecen al hacer scroll ---
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // --- Selector de color en "Explorá los modelos" ---
  const colorButtons = document.querySelectorAll('.models__color');

  colorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedColor = button.dataset.color;

      colorButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');

      document.querySelectorAll('[data-color-target]').forEach(el => {
        el.hidden = el.dataset.colorTarget !== selectedColor;
      });
    });
  });
});
