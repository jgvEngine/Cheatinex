// Seleccionar todos los elementos con la clase "enlace-principal"
const enlacesPrincipales = document.querySelectorAll('.enlace-principal');

// Agregar un evento de clic a cada enlace principal
enlacesPrincipales.forEach(enlace => {
    enlace.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado de los enlaces
        Swal.fire({
            title: '!Espera crack!',
            text: 'Usamos publicidad para mantener el canal, por favor desactiva tu bloqueador de anuncios. Espero lo puedas entender :(',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = this.href; // Redirigir al enlace
            }
        });
    });
});

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
