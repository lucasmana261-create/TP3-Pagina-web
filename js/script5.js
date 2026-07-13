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

  // =========================================
  // Animación de scroll — sección "3 pasos"
  // Cada bloque (imagen + contenido) se reduce suavemente al salir
  // de la pantalla y recupera su tamaño original al volver a estar visible.
  // =========================================
  const pasos = document.querySelectorAll('.paso');

  if (pasos.length) {
    const MIN_SCALE = 0.88;
    const MIN_OPACITY = 0.45;

    let ticking = false;

    function updatePasos() {
      const vh = window.innerHeight;

      pasos.forEach(paso => {
        const rect = paso.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, vh);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const ratio = rect.height > 0 ? Math.min(1, visibleHeight / rect.height) : 1;

        const scale = MIN_SCALE + (1 - MIN_SCALE) * ratio;
        const opacity = MIN_OPACITY + (1 - MIN_OPACITY) * ratio;

        paso.style.transform = `scale(${scale})`;
        paso.style.opacity = opacity;
      });

      ticking = false;
    }

    function requestPasosUpdate() {
      if (!ticking) {
        window.requestAnimationFrame(updatePasos);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestPasosUpdate, { passive: true });
    window.addEventListener('resize', requestPasosUpdate);

    // Estado inicial al cargar la página
    updatePasos();
  }

  // =========================================
  // Sección Características — hotspots interactivos
  // Al hacer click en un círculo celeste, se despliega la línea
  // y aparece el rectángulo con el nombre de la pieza.
  // =========================================
  const hotspots = document.querySelectorAll('.hotspot');

  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', () => {
      const isOpen = hotspot.classList.toggle('is-open');
      hotspot.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // =========================================
  // Sección Accesorios — carrusel navegable con flechas
  // =========================================
  const track = document.getElementById('accesorios-track');
  const prevBtn = document.getElementById('accesorios-prev');
  const nextBtn = document.getElementById('accesorios-next');

  if (track && prevBtn && nextBtn) {
    const items = Array.from(track.children);
    let index = 0;

    function getVisibleCount() {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 1000) return 2;
      return 3;
    }

    function updateCarousel() {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, items.length - visible);
      index = Math.min(index, maxIndex);

      const itemRect = items[0].getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      const offset = index * (itemRect.width + gap);

      track.style.transform = `translateX(-${offset}px)`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === maxIndex;
    }

    prevBtn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, items.length - visible);
      index = Math.min(maxIndex, index + 1);
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }

  // =========================================
  // Sección Modelos — selector de color
  // Al elegir un color, ese circulito se agranda y los otros se achican,
  // cambia el fondo de la tarjeta y el texto tileado de fondo.
  // =========================================
  const modelosCard = document.querySelector('.modelos__card');
  const modelosSwatches = document.querySelectorAll('.modelos__swatch');
  const modelosColorName = document.querySelector('.modelos__color-name');
  const modelosPatternSpans = document.querySelectorAll('.modelos__pattern-row span');

  if (modelosCard && modelosSwatches.length) {
    modelosSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        const color = swatch.dataset.color;

        modelosSwatches.forEach(s => {
          const isActive = s === swatch;
          s.classList.toggle('is-active', isActive);
          s.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        modelosCard.dataset.color = color;

        const label = color.toUpperCase();
        if (modelosColorName) modelosColorName.textContent = label;
        modelosPatternSpans.forEach(span => { span.textContent = label; });
      });
    });
  }
});
