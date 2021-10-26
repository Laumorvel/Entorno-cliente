const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apell");
const dni = document.getElementById("dni");
const direccion = document.getElementById("direccion");
const tlf = document.getElementById("tlf");
const nacimiento = document.getElementById("nacimiento");
const sexoA = document.getElementById("hombre");
const sexoB = document.getElementById("mujer");
const form = document.getElementById("addUser");
let x = "";
const SERVER = 'http://localhost:3000';

//1 - VALIDAMOS LOS DATOS INTRODUCIDOS

const formIsValid = {
    nombre: false,
    apellidos: false,
    dni: false,
    direccion: false,
    tlf: false,
    nacimiento: true,
    sexo: false
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm(); //En este método daré paso a enviar la petición solo si los datos son válidos
});

nombre.addEventListener('change', (e) => {
    if (e.target.value.trim().length > 0) formIsValid.nombre = true;
});

apellidos.addEventListener('change', (e) => {
    if (e.target.value.trim().length > 0) formIsValid.apellidos = true;
})

dni.addEventListener('change', (e) => {
    let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
    if (expresion_regular_dni.test(e.target.value.trim())) formIsValid.dni = true;
    if (compruebaDnis(dni.value)) formIsValid.dni = false;
})

direccion.addEventListener('change', (e) => {
    if (e.target.value.trim().length > 0) formIsValid.direccion = true;
})

tlf.addEventListener('change', (e) => {
    let expresion_only_numbers = /^\d+$/; //con esta expresión ya estamos validando que la longitud sea mayor que 0.
    if (expresion_only_numbers.test(e.target.value.trim())) formIsValid.tlf = true;
})

function validarSexo() { //compruebo que al menos una esté marcada

    if (sexoA.checked) {
        formIsValid.sexo = true;
        x = 'hombre'
    } else if (sexoB.checked) {
        formIsValid.sexo = true;
        x = 'mujer'
    }

}



const validateForm = () => {
    validarSexo();
    const formValues = Object.values(formIsValid);
    const valid = formValues.findIndex(value => value == false)

    if (valid == -1) {
        //form.onsubmit = alert("Usuario añadido con éxito");
        alert("Usuario añadido con éxito");
        enviarPeticion(); //PASO A ENVIAR LA PETICIÓN 
        //return true;

    } else {
        alert('Formulario inválido');
        return false;
    }

}

//2 - LO ENVIAMOS A NUESTRO SERVIDOR EN FORMATO JSON
//CREO EL PRODUCTO SOLO CUANDO HA SIDO VALIDADO
function enviarPeticion() {
    const newProduct = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apell").value,
        dni: document.getElementById("dni").value,
        direccion: document.getElementById("direccion").value,
        tlf: document.getElementById("tlf").value,
        sexo: x
    }


    fetch(SERVER + '/users', {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(data => console.log(data))
        .catch(error => {
            console.log('Error en la petición ' + error.message);
        })
}



//GET para adquirir datos del nuevo usuario
fetch(SERVER + '/users')
    .then(response => {
        //compruebo que el dni no esté registrado
        if (!compruebaDnis(response)) {
            return Promise.reject(response);
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    })
    .catch(error => {
        console.log('Error en la petición ' + error.message);
    })



//Método para comprobar si el dni se encuentra registrado o no. Devuelve true o false
function compruebaDnis(response) {
    let resul = false;
    response.forEach(user => {
        if (user.dni == dniUser) resul = true;
        alert('El dni ya se ha introducido');
    });
    return resul;
}