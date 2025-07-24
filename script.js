const paginas = document.querySelectorAll('.pagina');
let paginaActual = 0;

// Mostrar la primera
paginas[paginaActual].classList.add('visible');

function mostrarPagina(nuevaPagina, direccion = 'adelante') {
  if (nuevaPagina === paginaActual || nuevaPagina < 0 || nuevaPagina >= paginas.length) return;

  const anterior = paginas[paginaActual];
  const siguiente = paginas[nuevaPagina];

  // Animaciones según dirección
  const salida = direccion === 'adelante' ? 'slide-out-left' : 'slide-out-right';
  const entrada = direccion === 'adelante' ? 'slide-in-right' : 'slide-in-left';

  anterior.classList.remove('visible');
  anterior.classList.add(salida);

  setTimeout(() => {
    anterior.classList.remove(salida);
    siguiente.classList.add('visible', entrada);

    setTimeout(() => {
      siguiente.classList.remove(entrada);
    }, 500);

    paginaActual = nuevaPagina;
  }, 500);
}

function avanzarPagina() {
  mostrarPagina(paginaActual + 1, 'adelante');
}

function retrocederPagina() {
  mostrarPagina(paginaActual - 1, 'atras');
}

let startX = 0;

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (deltaX > 50) {
    retrocederPagina(); // swipe derecha
  } else if (deltaX < -50) {
    avanzarPagina(); // swipe izquierda
  }
});

//Efecto música

const botonMusica = document.getElementById('boton-musica');
const musica = document.getElementById('musica-fondo');

botonMusica.addEventListener('click', () => {
  if (musica.paused) {
    musica.play();
    botonMusica.classList.add('reproduciendo');
    botonMusica.textContent = '⏸️';
  } else {
    musica.pause();
    botonMusica.classList.remove('reproduciendo');
    botonMusica.textContent = '🎵';
  }
});
