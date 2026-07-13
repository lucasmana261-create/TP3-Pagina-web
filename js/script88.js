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
});
