// ===== AREPAS EXPRESS — JAVASCRIPT =====

// --- MENÚ HAMBURGUESA (mobile) ---
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

// Cerrar menú al hacer click fuera
document.addEventListener('click', function(e) {
  const nav = document.querySelector('.nav-inner');
  if (!nav.contains(e.target)) {
    document.querySelector('.nav-links')?.classList.remove('open');
  }
});

// --- POPUPS ---
function openPopup(popupId, itemId) {
  const popup = document.getElementById(popupId);
  if (!popup) return;
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Acá podés actualizar el contenido del popup según el itemId
  // Por ejemplo, cambiar el título, la imagen, etc.
  console.log('Abriendo popup:', popupId, 'para item:', itemId);
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (!popup) return;
  popup.classList.remove('active');
  document.body.style.overflow = '';
}

function closePopupOutside(event, popupId) {
  // Solo cierra si hiciste click en el overlay (no en la caja interior)
  if (event.target.classList.contains('popup-overlay')) {
    closePopup(popupId);
  }
}

// Cerrar con tecla Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.popup-overlay.active').forEach(popup => {
      popup.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

// --- GALERÍA DE FOTOS (navegación en popup) ---
let fotoActual = 0;
const totalFotos = 6; // Cambiá este número según cuántas fotos tengas

function prevFoto() {
  fotoActual = (fotoActual - 1 + totalFotos) % totalFotos;
  updateFotoDisplay();
}

function nextFoto() {
  fotoActual = (fotoActual + 1) % totalFotos;
  updateFotoDisplay();
}

function updateFotoDisplay() {
  const display = document.querySelector('.foto-display');
  const caption = document.querySelector('.popup-foto-caption');
  if (display) {
    display.innerHTML = `<span>Fotografía ${fotoActual + 1} de ${totalFotos}</span>`;
    // Cuando tengas las imágenes reales, reemplazá con:
    // display.innerHTML = `<img src="img/fotos/foto${fotoActual + 1}.jpg" alt="Fotografía ${fotoActual + 1}">`;
  }
  if (caption) {
    caption.textContent = `Descripción de la fotografía ${fotoActual + 1}`;
    // Con contenido real: caption.textContent = fotosData[fotoActual].descripcion;
  }
}

// --- ANIMACIÓN DE ENTRADA (fade in al hacer scroll) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.contenido-card, .barrio-card, .desbloqueo-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});

// --- LOGROS (lógica básica de desbloqueo) ---
// En el futuro podés conectar esto con el juego usando localStorage
function desbloquearLogro(numero) {
  const card = document.querySelectorAll('.desbloqueo-card')[numero - 1];
  if (card) {
    card.classList.remove('locked');
    card.classList.add('unlocked');
    const icon = card.querySelector('.desbloqueo-icon');
    if (icon) icon.textContent = '🏆';
  }
}

// Ejemplo: desbloquearLogro(1) para desbloquear el primer logro
// Lo podés llamar desde el juego si usás localStorage:
/*
  // En el juego (Game Maker, al completar nivel):
  // Guardá en localStorage: localStorage.setItem('logro1', 'true')

  // Acá en el sitio, al cargar:
  if (localStorage.getItem('logro1') === 'true') desbloquearLogro(1);
  if (localStorage.getItem('logro2') === 'true') desbloquearLogro(2);
  if (localStorage.getItem('logro3') === 'true') desbloquearLogro(3);
  if (localStorage.getItem('logro4') === 'true') desbloquearLogro(4);
*/

console.log('🫓 Arepas Express cargado correctamente');
