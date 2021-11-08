let disponibilidad = document.getElementById("disponibilidad");
let respuesta = document.createElement("h3");
fetch('https://intranetjacaranda.es/Ejercicios/Ejercicio1/servidor/compruebaDisponibilidad.php')
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    .catch(error => {
        console.log("Error: ", error)
    })
    .then(datos => {
        if (datos == "si") {
            respuesta.textContent = "Lo sentimos. El usuario ya está registrado.";
        } else {
            respuesta.textContent = "OK. El usuario no está registrado.";
        }
        disponibilidad.appendChild(respuesta);
    })