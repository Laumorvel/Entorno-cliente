const form = document.getElementById('form');
const enviar = document.getElementById('enviar');
const nombre = document.getElementById('nombre');
const dni = document.getElementById('dni');
const nacido = document.getElementById('nacido');
const hijos = document.getElementById('hijos');
const si = document.getElementById('si');
const no = document.getElementById('no'); 
const numHijos = document.getElementById('numHijos');

const formIsValid = {
    nombre: false,
    dni:false,
    nacido:false,
    sexo:false,
    hijos:false
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
});

nombre.addEventListener('change', (e) => {
    if (e.target.value.trim().length > 0) formIsValid.nombre = true
})

dni.addEventListener('change', (e) => {
    let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
    if (expresion_regular_dni.test(e.target.value.trim())){
         formIsValid.dni = true
    } 
})

nacido.addEventListener('change', (e) => {//compruebo que se rellene (ya compruebo que no pase de la fecha de hoy en el html)
    if (e.target.value.trim().length > 0) formIsValid.nacido = true
 
})

function validarSexo() {//compruebo que al menos se marque una
    if (document.getElementById("hombre").checked){ formIsValid.sexo = true}
    else if(document.getElementById("mujer").checked){formIsValid.sexo = true}
}

hijos.addEventListener('change', (e) => {
    if(e.target.value.trim().length > 0) formIsValid.hijos = true;

    if(e.target.value == "si"){
        var ocultado = document.getElementById("ocultado");
        ocultado.classList.replace('oculto','visible');
    } 
})

const validateForm = () => {
    validarSexo();
    const formValues = Object.values(formIsValid);
    const valid = formValues.findIndex(value => value == false)
    if(valid == -1) form.onSubmit()
    else alert('Formulario inválido')
}


