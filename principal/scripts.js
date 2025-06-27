const   btnLeft = document.querySelector(".btn-left"),
        btnRight = document.querySelector(".btn-right"),
        slider = document.querySelector("#slider"),
        sliderSection = document.querySelectorAll(".slider-section");

btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())

setInterval(() => {
    moveToRight()
},4000);

let operacion = 0;
    counter = 0; //Recetiar la cantidad de movimientos
    widthIng = 100 / sliderSection.length; //Ancho de la imagen

function moveToRight() {
    if(counter >= sliderSection.length-1){
        counter = 0;
        operacion = 0;
        slider.style.transform =  `translate(-${operacion}%)`
        slider.style.transform = "none"
        return;
    } 
    counter++;
    operacion = operacion + widthIng;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
}


    function moveToLeft() {
    counter--;
    if(counter < 0){
        counter = sliderSection.length-1;
        operacion = widthIng * (sliderSection.length-1)
        console.log(operacion)
        slider.style.transform =  `translate(-${operacion}%)`
        slider.style.transition = "none";
        return;
    }
    operacion = operacion - widthIng;
    slider.style.transform =  `translate(-${operacion}%)`
    slider.style.transition = "all ease .6s"
}
function abrirModalOlvidoContrasena() {
  const iniciarSesionModalEl = document.getElementById('IniciarSesion');
  const iniciarSesionModal = bootstrap.Modal.getInstance(iniciarSesionModalEl) 
                           || new bootstrap.Modal(iniciarSesionModalEl);
  iniciarSesionModal.hide();

  const modalOlvidoEl = document.getElementById('ContraseñaOlvi');
  const modalOlvido = bootstrap.Modal.getInstance(modalOlvidoEl)
                     || new bootstrap.Modal(modalOlvidoEl);
  modalOlvido.show();
}


function validarRegistro(event) {
  const pass = document.getElementById("registroContra").value.trim();
  const confirmar = document.getElementById("confirmarContra").value.trim();

  if (!pass || !confirmar) {
    alert("Por favor, complete ambos campos de contraseña.");
    event.preventDefault();
    return false;
  }

  if (pass !== confirmar) {
    alert("Las contraseñas no coinciden.");
    event.preventDefault();
    return false;
  }

  return true;
}

function showAlert(message, type = 'success') {
  const alertHTML = `
    <div id="alertaTemporal" class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>`;
  
  const container = document.getElementById('alertContainer');
  if (!container) return;
  container.innerHTML = alertHTML;

  setTimeout(() => {
    const alertElem = document.getElementById('alertaTemporal');
    if (alertElem) {
      alertElem.classList.remove('show');
      alertElem.classList.add('hide');
    }
  }, 3000);
}


document.querySelector('#IniciarSesion form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const modal = bootstrap.Modal.getInstance(document.getElementById('IniciarSesion'));
    modal.hide();
  showAlert('Inicio de sesión exitoso.');
});

document.querySelector('#ContraseñaOlvi form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const modal = bootstrap.Modal.getInstance(document.getElementById('ContraseñaOlvi'));
    modal.hide();
  showAlert('Se envió un enlace de restablecimiento a su correo.');
});

document.querySelector('#CrearCuentaModal form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  if (validarRegistro(e)) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('CrearCuentaModal'));
    modal.hide();
    showAlert('Cuenta registrada con éxito.');
  }
});

/*********** ***script para el modal de registro ************/
document.addEventListener('DOMContentLoaded', () => {
  // 1) Creamos un contenedor vacío dentro del body
  const container = document.getElementById('modals-container');

  // 2) Cargamos el login.html
  fetch('../login.html')
    .then(resp => {
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return resp.text();
    })
    .then(html => {
      // 3) Parseamos ese HTML en un template
      const tmp = document.createElement('template');
      tmp.innerHTML = html;

      // 4) Extraemos todos los divs con class="modal" y los pegamos al container
      tmp.content.querySelectorAll('.modal').forEach(modal => {
        container.appendChild(modal);
      });
    })
    .catch(err => {
      console.error('No se pudo cargar el modal de login:', err);
    });
});

