//EJERCICIO 6 - OBJETOS NATIVOS

//Crea un ejemplo que nos permita navegar por el historial con el objeto history, 
//para ello deberás realizar varias páginas y navegar entre ellas haciendo uso de este objeto.

//Obtenemos los botones que hemos creado en el html 
var atras = document.getElementById("atras").addEventListener("click", verPaginaAnterior);
var delante = document.getElementById("delante").addEventListener("click", verPaginaSiguiente);


//Creamos las funciones a las que las hemos asociado utilizando window.history
function verPaginaAnterior(){
   window.history.back();
}


function verPaginaSiguiente(){
    window.history.forward();
}

