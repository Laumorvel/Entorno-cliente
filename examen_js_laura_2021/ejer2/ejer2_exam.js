const form = document.getElementById("form");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const login = document.getElementById("login");
const password = document.getElementById("password");
const nacimiento = document.getElementById("nacimiento");
const edad = document.getElementById("edad");
const infoUserDiv = document.getElementById("infoUser");

//VALIDACIONES ________________________________________________________________________________
form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
})

const FormIsValid = {
    nombre: false,
    apellidos: false,
    login: false,
    password: false,
    nacimiento: false,
    edad: false //debe tener 18 mínimo. Se comprueba por el nacimiento
}

const validateForm = () => {
    calculaEdad();
    const formValues = Object.values(FormIsValid);
    const valid = formValues.findIndex(value => value == false);
    if (valid == -1) {
        creaNewuser();
        //Como se pide que no se mande el formulario, no he añadido un submit
    } else alert("FORMULARIO INVÁLIDO");
}

nombre.addEventListener("change", (e) => {
    let div = document.getElementById("list");
    while (div.firstChild) { //añadido este while para ir borrando la sugerencias
        div.removeChild(div.firstChild);
    }
    fetch('https://intranetjacaranda.es/pruebaJS/arrayNombres.php?nombre=' + e.target.value)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            return Promise.reject(response);
        })
        .catch(error => {
            console.log('Error en la petición', error);
        })
        .then(datos => {
            let sugerencias = datos.split(",");
            let list = document.getElementById("list");
            for (let i = 0; i < sugerencias.length; i++) {
                let sugerencia = document.createElement("li");
                sugerencia.textContent = sugerencias[i];
                list.appendChild(sugerencia);
            }
        })
    FormIsValid.nombre = true;
})


apellidos.addEventListener("change", (e) => {
    const apellidosRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    if (apellidosRegex.test(e.target.value)) FormIsValid.apellidos = true;
    else {
        alert("Apellidos inválidos");
    }
})

login.addEventListener("change", (e) => {
    let formData = new FormData();
    formData.append('login', login.value);
    let disponibilidad = document.getElementById("disponibilidad");
    fetch('https://intranetjacaranda.es/pruebaJS/checkLogin.php', {
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
            const parser = new DOMParser();
            const xml = parser.parseFromString(datos, "application/xml");
            let resp = xml.getElementsByTagName('disponible')[0].textContent;
            if (resp == "si") {
                FormIsValid.login = true;
            } else {
                const parser = new DOMParser();
                const xml = parser.parseFromString(datos, "application/xml");
                let alternativas = xml.getElementsByTagName('login');
                /*let valor = document.getElementById("login").value;
                document.getElementById("login").value = valor;*/

                for (let i = 0; i < alternativas.length; i++) {
                    let alternativa = alternativas[i];
                    let alternativaList = document.createElement('li');
                    alternativaList.textContent = alternativa.textContent;
                    disponibilidad.appendChild(alternativaList);
                }
            }
        })
        .catch(response => {
            console.log("Error: " + response.error)
        })
})

//He usado una de las expresiones regulares que aparecen en el doc de moodle
password.addEventListener("change", (e) => {
    //Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
    const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
    if ((passwordRegex.test(e.target.value))) FormIsValid.password = true;
    else {
        alert("la contraseña debe terner 1 minúscula, 1 mayúscula, 1 número y 8 caracteres mínimo en total");
    }
})

nacimiento.addEventListener("change", (e) => {
    if (calculaEdad()) {
        FormIsValid.nacimiento = true;
    }
})

function calculaEdad() {
    let mayorEdad = false;
    let actualFecha = new Date();
    let fechanacimiento = new Date(nacimiento.value);

    var edadActual = actualFecha.getFullYear() - fechanacimiento.getFullYear();
    if (edadActual >= 18) {
        FormIsValid.nacimiento = true;
        FormIsValid.edad = true;
        mayorEdad = true;
        indicaEdad(edadActual);
    } else {
        alert("Debe ser mayor de edad");
    }
}

function indicaEdad(edadActual) {
    edad.value = edadActual;
}

//GUARDADO DE DATOS EN LOCALSTORAGE________________________________________________________________

function creaNewuser() {
    const NewUser = {
        nombre: nombre.value,
        apellidos: apellidos.value,
        login: document.getElementById("login").value,
        password: password.value,
        edad: edad.value,
        fechaAlta: new Date()
    }

    const peticion3 = new XMLHttpRequest();
    peticion3.open('POST', 'http://localhost:3000/comments/');
    peticion3.setRequestHeader('Content-type', 'application/json');
    peticion3.send(JSON.stringify(NewUser));
    peticion3.addEventListener('load', function() {

    })

}

const borrar = document.getElementById("borrar").addEventListener("click", () => {
    localStorage.clear();
})


const consultaUsuario = document.getElementById("consulta").addEventListener("click", () => {
    if (infoUserDiv.children.length != 0) {
        infoUserDiv.removeChild(firstChild);
    }

    const User = localStorage.getItem(login.value);
    let user = JSON.parse(User);
    //Crear tabla y encabezados
    let table = document.createElement("table");
    table.setAttribute("border", "1px");

    let row = table.insertRow(-1);
    row.insertCell(0).textContent = "Nombre";
    row.insertCell(1).textContent = "Apellidos";
    row.insertCell(2).textContent = "Login";
    row.insertCell(3).textContent = "Password";
    row.insertCell(4).textContent = "Edad";
    row.insertCell(5).textContent = "Fecha de alta";

    //Introducir info
    let row2 = table.insertRow(-1);
    row2.insertCell(0).textContent = user.nombre;
    row2.insertCell(1).textContent = user.apellidos;
    row2.insertCell(2).textContent = login.value;
    row2.insertCell(3).textContent = user.password;
    row2.insertCell(4).textContent = user.edad;
    row2.insertCell(5).textContent = user.fechaAlta;

    infoUserDiv.appendChild(table);
})


const ultimoLogin = document.getElementById("ultimoLogin").addEventListener("click", () => {

    let listaAltas = [];

    for (let i = 0; i < localStorage.length; i++) {
        const user = localStorage.key(i);
        let userObject = JSON.parse(localStorage.getItem(user));
        listaAltas.push(userObject);
    }
    const sortedAltas = listaAltas.sort((a, b) => a.fechaAlta - b.fechaAlta);
    let userKey = sortedAltas[-1];

    if (infoUserDiv.children.length != 0) {
        infoUserDiv.removeChild(infoUserDiv.firstChild);
    }
    //Crear texto con nombre y apellidos del último user
    let textoInfo = document.createElement("p");
    textoInfo.textContent = userKey.nombre + " " + userKey.apellidos;
    infoUserDiv.appendChild(textoInfo);

})