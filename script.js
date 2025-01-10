// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function () {
  // Année dans le footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Gestion du menu hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Animation du texte (si présent sur la page)
  const typed = document.querySelector('.text');
  if (typed) {
    new Typed('.text', {
      strings: ['Développeur Frontend', 'Développeur Backend', 'Développeur Fullstack'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    });
  }
});

// Ajouter un indicateur de chargement
window.addEventListener('load', function () {
  document.body.classList.remove('loading');
});
