//Obtenemos el valor de la id que aparece en la url
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let idPost = urlParams.get('idPost');

//Conseguir los datos a partir de la id
const peticion = new XMLHttpRequest();
peticion.open('GET', 'http://localhost:3000/posts/' + idPost);
peticion.setRequestHeader('Content-type', 'application/json');
peticion.send();

let texto;
let autor;
let titulo;

peticion.addEventListener('load', function() {
    // procesamos los datos
    let peti = JSON.parse(peticion.responseText);
    texto = peti.text;
    autor = peti.author;
    titulo = peti.title;

    let tituloPost = document.getElementById("title").innerHTML = titulo;

    let contenidoPost = document.getElementById("content").textContent = texto;

    let autorPost = document.getElementById("author").textContent += autor;

})


//AÑADIR COMENTARIOS
//creación de otra tabla para añadirlos dejabo del post
let tablaComments = document.createElement("table");
tablaComments.setAttribute("class", "tabla2");
let fila = tablaComments.insertRow(-1);
let celda = fila.insertCell(0);
celda.textContent = "COMENTARIOS";

let div = document.getElementById("contenedor");
div.appendChild(tablaComments);

//recuperar los comentario para que se carguen al cargar la pagina
const peticion3 = new XMLHttpRequest();
peticion3.open('GET', 'http://localhost:3000/comments?idPost=' + idPost);
peticion3.send();
peticion3.addEventListener('load', function() {
    let comments = JSON.parse(peticion3.responseText);

    for (let index = 0; index < comments.length; index++) {
        const comment = comments[index];
        //crear nueva fila para añadir el comentario
        let nuevaFil = tablaComments.insertRow(-1);
        let casilla = nuevaFil.insertCell(0);
        casilla.textContent = "Autor: " + comment.autor;
        let casilla2 = nuevaFil.insertCell(1);
        casilla2.textContent = comment.texto;
    }

})


//botón para enviar comentario
celda = fila.insertCell(1);
let enlace2 = document.createElement("input");
enlace2.type = "button";
enlace2.setAttribute("value", "CREAR COMENTARIO")
enlace2.setAttribute("class", "borrar");
enlace2.addEventListener("click", publicaComentarios);
celda.appendChild(enlace2);



//fila = tablaComments.insertRow(-1);
let celda2 = fila.insertCell(1);

//creo el select
let select = document.createElement("select");

//consigo los autores y los añado al select
const peticion2 = new XMLHttpRequest();
peticion2.open('GET', 'http://localhost:3000/users');
peticion2.send();
peticion2.addEventListener('load', function() {
    let users = JSON.parse(peticion2.responseText);
    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        let opcion = document.createElement("option");
        opcion.textContent = element.nombre;
        select.appendChild(opcion);
    }
    //añado el select a la segunda celda creada
    celda2.appendChild(document.createTextNode("Autor del nuevo comentario: "));
    celda2.appendChild(select);
})


//CREAR UN NUEVO COMENTARIO
//Creación del área de texto
celda = fila.insertCell(2);
let textarea = document.createElement("textArea");
textarea.textContent = "Escriba el nuevo comentario";
celda.appendChild(textarea);


//publicar comentario y subirlo a la bbdd
function publicaComentarios(e) {
    let text = document.getElementsByTagName("textArea")[0].value;
    let author = document.getElementsByTagName("select")[0].value;

    const newComment = {
        autor: author,
        texto: text,
        idPost: idPost
    }

    const peticion3 = new XMLHttpRequest();
    peticion3.open('POST', 'http://localhost:3000/comments/');
    peticion3.setRequestHeader('Content-type', 'application/json');
    peticion3.send(JSON.stringify(newComment));
    peticion3.addEventListener('load', function() {

    })




}