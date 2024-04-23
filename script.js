// Función para activar la vibración del dispositivo
function vibrarDispositivo() {
    if ("vibrate" in navigator) {
        navigator.vibrate(200); // Vibración durante 200 milisegundos
    }
}

let menuVisible = false;

// Función que oculta o muestra el menú
function mostrarOcultarMenu() {
    if (menuVisible) {
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } else {
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}

function seleccionar() {
    // Ocultar el menú una vez que se selecciona una opción
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

const formularioContacto = document.getElementById('formulario-contacto');

formularioContacto.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const nombre = document.querySelector('input[name="Nombre"]').value;
    const telefono = document.querySelector('input[name="Teléfono"]').value;
    const correo = document.querySelector('input[name="Correo"]').value;
    const tema = document.querySelector('input[name="Tema"]').value;
    const mensaje = document.querySelector('textarea[name="mensaje"]').value;

    const data = {
        Nombre: nombre,
        Teléfono: telefono,
        Correo: correo,
        Tema: tema,
        Mensaje: mensaje
    };

    // Enviar los datos a Formspree mediante AJAX
    fetch('https://formspree.io/f/xrgnroya', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        const tiempoRetraso = 1000;
        if (response.ok) {
            setTimeout(() => {
                Swal.fire({
                    title: '¡Mensaje enviado!',
                    text: 'Tu mensaje ha sido enviado correctamente.',
                    icon: 'success',
                    showConfirmButton: true,
                });
                formularioContacto.reset(); // Limpiar el formulario
            }, tiempoRetraso); // Se utiliza la variable para el retraso
        } else {
            // Mostrar mensaje de error y hacer que el dispositivo vibre
            Swal.fire({
                title: 'Error',
                text: 'Debes llenar todos los campos del formulario.',
                icon: 'error'
            });
            vibrarDispositivo(); // Activar la vibración del dispositivo
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
