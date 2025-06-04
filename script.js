document.addEventListener('DOMContentLoaded', () => {
  // Menú hamburguesa
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const userActions = document.querySelector('.user-actions');
  const header = document.querySelector('.header');

  const handleUserActionsPosition = () => {
    if (window.innerWidth <= 768) {
      if (navMenu && userActions && userActions.parentElement !== navMenu) {
        navMenu.appendChild(userActions);
      }
    } else {
      if (navMenu && userActions && userActions.parentElement === navMenu) {
        header.appendChild(userActions);
      }
    }
  };

  handleUserActionsPosition();
  window.addEventListener('resize', handleUserActionsPosition);

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    userActions.classList.toggle('active');
  });

  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      userActions.classList.remove('active');
    });
  });

  // Botón flotante y pop-up de contacto
  const floatingButton = document.getElementById('floatingButton');
  const contactPopup = document.getElementById('contactPopup');
  const closeContactPopup = document.getElementById('closeContactPopup');

  floatingButton.addEventListener('click', () => {
    contactPopup.style.display = contactPopup.style.display === 'block' ? 'none' : 'block';
  });

  closeContactPopup.addEventListener('click', () => {
    contactPopup.style.display = 'none';
  });

  // Cerrar pop-up de contacto al hacer clic fuera de él
  document.addEventListener('click', (e) => {
    if (!contactPopup.contains(e.target) && !floatingButton.contains(e.target)) {
      contactPopup.style.display = 'none';
    }
  });

  // Banner de cookies
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookies = document.getElementById('acceptCookies');
  const rejectCookies = document.getElementById('rejectCookies');

  console.log('Cookies aceptadas:', localStorage.getItem('cookiesAccepted')); // Depuración

  if (!localStorage.getItem('cookiesAccepted')) {
    console.log('Mostrando banner de cookies'); // Depuración
    cookieBanner.style.display = 'block';
  }

  acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
  });

  rejectCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'false');
    cookieBanner.style.display = 'none';
  });

  // Pop-up de registro
  const popupOverlay = document.getElementById('popupOverlay');
  const closePopup = document.getElementById('closePopup');
  const registerButton = document.querySelector('.register-button');

  console.log('Pop-up cerrado previamente:', localStorage.getItem('popupClosed')); // Depuración

  setTimeout(() => {
    if (!localStorage.getItem('popupClosed')) {
      console.log('Mostrando pop-up de registro'); // Depuración
      popupOverlay.style.display = 'flex';
    }
  }, 2000);

  closePopup.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
    localStorage.setItem('popupClosed', 'true');
  });

  // Cerrar pop-up al hacer clic fuera del contenido
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.style.display = 'none';
      localStorage.setItem('popupClosed', 'true');
    }
  });

  // Lógica básica para el botón de registro (simulación)
  registerButton.addEventListener('click', () => {
    const name = document.querySelector('.form-container input[type="text"]').value;
    const email = document.querySelector('.form-container input[type="email"]').value;
    const password = document.querySelector('.form-container input[type="password"]').value;

    if (name && email && password) {
      alert('Registro simulado con éxito!\nNombre: ' + name + '\nCorreo: ' + email);
      popupOverlay.style.display = 'none';
      localStorage.setItem('popupClosed', 'true');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  });
});