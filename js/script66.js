// Marca como activo el link del menú correspondiente a la sección visible
// y desplaza suavemente la línea indicadora entre las opciones.

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav__link');
  const navList = document.querySelector('.nav__list');
  const indicator = document.getElementById('nav-indicator');

  function moveIndicatorTo(link) {
    if (!indicator || !link || !navList) return;
    const listRect = navList.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    indicator.style.width = `${linkRect.width - 36}px`;
    indicator.style.left = `${linkRect.left - listRect.left + 18}px`;
  }

  function setActive(link) {
    navLinks.forEach(l => l.classList.remove('is-active'));
    link.classList.add('is-active');
    moveIndicatorTo(link);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => setActive(link));
  });

  // Posiciona el indicador debajo del link activo al cargar la página
  const initialActive = document.querySelector('.nav__link.is-active') || navLinks[0];
  if (initialActive) {
    // Se espera a que las fuentes/layout terminen de aplicarse para medir bien
    window.requestAnimationFrame(() => moveIndicatorTo(initialActive));
  }

  // Reubica el indicador si cambia el tamaño de la ventana
  window.addEventListener('resize', () => {
    const current = document.querySelector('.nav__link.is-active');
    if (current) moveIndicatorTo(current);
  });
});
