const tablon = document.getElementById("tablon");
let newNota = document.getElementById("newNota");
const hecho = document.getElementById("hecho").addEventListener("click", addNota);
let cont = 0;
let idNota = 0;
const tabla = document.getElementById("table");


/**
 * Object.keys(localStorage) --> para que devuelva todas las keys
 * JSON.parse(getItem)
 */


//RECARGAR TODAS LAS NOTAS GUARDADAS
window.onload = function() {
    for (let index = 0; index < localStorage.length; index++) {
        const element = localStorage.getItem(index);
        anadirNotaTablon(element);
    }
}



//AÑADIR LA NOTA
function addNota(e) {
    e.preventDefault();
    const nota = {
        text: newNota.value,
        name: "nota" + idNota
    }
    idNota++;
    localStorage.setItem(idNota, JSON.stringify(nota));
    anadirNotaTablon(nota);
}




//AÑADIR FILAS Y NOTAS (4 NOTAS POR FILA E IR CAMBIANDO SUS COLORES)
const anadirNotaTablon = nota => {

    let div = document.createElement("div");
    div.setAttribute("class", "notita");
    let a = document.createElement("a");
    div.appendChild(a);
    let texto = document.createTextNode(nota.text);
    a.appendChild(texto);
    tablon.appendChild(div);

    //TACHAR CUANDO SE HAYA CUMPLIDO
    let tacharButton = document.createElement("input");
    tacharButton.type = "button";
    tacharButton.setAttribute("value", "Tachar");
    div.appendChild(tacharButton);
    tacharButton.addEventListener("click", tachar);

    //ELIMINAR 
    let eliminarButton = document.createElement("input");
    eliminarButton.type = "button";
    eliminarButton.setAttribute("value", "Eliminar");
    eliminarButton.setAttribute("id", idNota);
    div.appendChild(eliminarButton);
    eliminarButton.addEventListener("click", eliminar);

}

function tachar(e) {
    let padre = e.target.parentElement; //div notita
    let enlace = padre.children[0];
    enlace.setAttribute("class", "tachar");
}

function eliminar(e) {
    localStorage.removeItem(e.target.id);
    this.parentNode.remove();

}