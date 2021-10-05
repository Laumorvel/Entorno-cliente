//OBJETOS_NATIVOS

//Actividad 1:  Crea un ejemplo de utilización del objeto window, tratando de mover y redimensionar la ventana de diferentes maneras.
//Prueba en 2 navegadores diferentes.
var myWindow = window.open('', '', "width=100", "height=100");

const botonRedi = document.getElementById('redimensionar').addEventListener('click',redimensionar);
const mover1 = document.getElementById('mover').addEventListener('click',mover);
const focus1 = document.getElementById('focus').addEventListener('click',focus);

function redimensionar() {
    myWindow.resizeTo(300, 200);
}

function mover() {
    myWindow.moveBy(20, 30);
}

function focus() {
    myWindow.focus();
}


     