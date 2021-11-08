let boton = document.getElementById("comprobar").addEventListener("click", (e) => {
    e.preventDefault();
    let login = document.getElementById("login").value;
    let formData = new FormData();
    formData.append('login', login);
    let disponibilidad = document.getElementById("disponibilidad");
    let respuesta = document.createElement("h3");
    let lista = document.getElementById("alternativas");
    fetch('https://intranetjacaranda.es/Ejercicios/Ejercicio2/servidor/compruebaDisponibilidadXML.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            return Promise.reject(response);
        })
        .then(datos => {
            //Sacamos la respuesta
            const parser = new DOMParser();
            const xml = parser.parseFromString(datos, "application/xml");
            let resp = xml.getElementsByTagName('disponible')[0].textContent;

            if (resp == "no") {
                //Primero indicamos la respuesta
                respuesta.textContent = "Lo sentimos. El usuario ya está registrado.";

                //Leemos el xml para ofrecer alternativas e ir introduciendolas en la lista
                const parser = new DOMParser();
                const xml = parser.parseFromString(datos, "application/xml");
                let alternativas = xml.getElementsByTagName('login');
                let valor = document.getElementById("login").value;
                document.getElementById("login").value = valor;
                for (let i = 0; i < alternativas.length; i++) {
                    let alternativa = alternativas[i];
                    let alternativaList = document.createElement('li');
                    let enlace = document.createElement('a');
                    enlace.addEventListener("click", cambiarLogin);
                    alternativaList.appendChild(enlace);
                    let nuevoLogin = alternativa.textContent;
                    enlace.textContent = nuevoLogin;
                    lista.appendChild(alternativaList);
                }
            } else {
                respuesta.textContent = "OK. El usuario no está registrado.";
            }
            disponibilidad.appendChild(respuesta);
        })
        .catch(response => {
            console.log("Error: " + response.error)
        })
})

//funcion para que cambie el login seleccionado al clicar
function cambiarLogin(e) {

    document.getElementById("login").value = e.target.innerText;
}