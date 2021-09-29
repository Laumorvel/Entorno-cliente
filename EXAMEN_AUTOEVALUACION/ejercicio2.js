//EJERCICIO 2 (PRIMERA PARTE) - EXAMEN DE AUTOEVALUACIÓN
//INSERTAR UN EMPLEADO NUEVO COMPROBANDO QUE NO SE REPITA SU DNI

let anyadir = document.getElementById("anyadir");
anyadir.addEventListener("click", anyadirEmpleado);


function anyadirEmpleado(e) {
    e.preventDefault();

    var dni = prompt('Dni: ');

    if (compruebaDnis(dni) == false) {
        alert("El dni ya existe");
    } else {
        anyadeATabla(dni);
    }

}

function anyadeATabla(dni) {
    let largo = document.querySelectorAll("tr").length;
    var nombre = prompt("Nombre: ");
    var apellidos = prompt("Apellidos: ");

    let tabla = document.getElementById("tabla");
    let fila = tabla.insertRow(-1);

    let celda = fila.insertCell(0);
    celda.textContent = largo;

    celda = fila.insertCell(1);
    celda.textContent = dni;

    celda = fila.insertCell(2);
    celda.textContent = nombre;

    celda = fila.insertCell(3);
    celda.textContent = apellidos;

}

function compruebaDnis(dni) {
    let resul = true;
    let tds = document.querySelectorAll("td:nth-child(2)"); //Se consiguen todos los td que estén en la segunda fila

    for (var i = 0; i < tds.length; i++) {
        if (dni == tds[i].innerHTML) { //es necesario incluir el innerHTML, porque value solo vale para los insert
            resul = false;
        }
    }
    return resul;
}


//EJERCICIO 2 (SEGUNDA PARTE) 
//BORRAR A UN EMPLEADO Y ACTUALIZAR EL NÚMERO DE EMPLEADOS. EN CASO DE QUE EL EMPLEADO NO EXISTA, SALDRÁ UNA ALERTA

let borrar = document.getElementById("borrar");
borrar.addEventListener("click", borra);

function borra(e) {
    e.preventDefault();

    var dni = prompt('Dni: ');

    if (compruebaDnis(dni)) {
        alert("El dni no existe");
    } else {
        borraEmpleado(dni);
    }

}

function borraEmpleado(dni) {
    let tds = document.querySelectorAll("td:nth-child(2)");

    var j = false;
    var buscado;
    for (var i = 0; i < tds.length; i++) {
        if (dni == tds[i].innerHTML) {
            buscado = tds[i].parentNode;

            j = true;
        } else if (j) {
            var num = document.querySelectorAll("td:nth-child(1)")[i]; //coger el numero del que coincide
            num.innerHTML = num.innerHTML - 1;
        }
    }

    buscado.remove();

}

//EJERCICIO 3 - MODIFICAR UN EMPLEADO
//SI EL EMPLEADO NO EXISTE, MANDARÁ UNA ALERTA

let modificar = document.getElementById("modificar");
modificar.addEventListener("click", modifica);

function modifica(e) {
    e.preventDefault();

    var dni = prompt('Dni: ');

    if (compruebaDnis(dni)) {
        alert("El dni no existe");
    } else {
        modificaEmpleado(dni);
    }
}

function modificaEmpleado(dni) {
    let tds = document.querySelectorAll("td:nth-child(2)");
    var buscado;
    for (var i = 0; i < tds.length; i++) {
        if (dni == tds[i].innerHTML) {
            buscado = tds[i].parentNode;

            var nombre = prompt("Modifica el nombre: ");
            buscado.querySelector("td:nth-child(3)").innerHTML = nombre;

            var apellidos = prompt("Modifica los apellidos: ");
            buscado.querySelector("td:nth-child(4)").innerHTML = apellidos;
        }
    }


}