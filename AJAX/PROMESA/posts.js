const tabla = document.getElementById("tabla");
const SERVER = 'http://localhost:3000';


//API FETCH CON PROMESA

const verificarEstado = response => {
    // Comprobamos si hemos recibido un código de error
    if (response.ok) { //entre 200 - 300 --> true
        return response;
    }

    // Devolvemos un error
    const error = new Error(response.statusText);
    return Promise.reject(error);
}

const transformarRespuesta = response => response.json();






//función para la creación de tablas
const crearTablas = posts => { //aqui ya no es una promesa, sino que es json(data = posts)

    let no = 1;

    posts.forEach(post => {
        let fila = tabla.insertRow(-1);
        let celda = fila.insertCell(0);
        fila.setAttribute("padding", "2em ")
        celda.textContent = no; //introducimos el número del posts
        no++;

        celda = fila.insertCell(1);
        celda.textContent = post.title;

        celda = fila.insertCell(2);
        celda.textContent = post.author;

        //crear botones
        //VER            
        let enlace = document.createElement("a");
        enlace.setAttribute("class", "ver");
        let ver = document.createTextNode("VER");
        enlace.appendChild(ver);
        enlace.setAttribute("href", 'post.html?idPost=' + post.id); //necesario colocar así el href para poder obtener los datos en la url
        celda = fila.insertCell(3);
        celda.appendChild(enlace);


        //BORRAR
        let enlace2 = document.createElement("a");
        enlace2.setAttribute("class", "borrar");
        let borrar = document.createTextNode("BORRAR");
        enlace2.appendChild(borrar);
        enlace2.setAttribute("id", post.id);
        celda = fila.insertCell(3);
        enlace2.setAttribute("href", post.id);
        enlace2.addEventListener("click", borrar);
        celda.appendChild(enlace2);


    });
    const borrarElements = document.querySelectorAll('.borrar');
    for (let i = 0; i < borrarElements.length; i++) {
        const element = borrarElements[i];
        element.addEventListener('click', borrar);

    }
}






// Iniciamos la petición y la hacemos y pintamos con un fetch -- GET
fetch(SERVER + '/posts')
    .then(verificarEstado)
    .catch(error => { //solo para promesas. despues se transforma en json
        console.log('Error en la petición', error);
    })
    .then(transformarRespuesta)
    .then(crearTablas); //then --> metodo solo para promesas







//BORRADO DE POST -- DELETE
function borrar(e) {
    e.preventDefault(); //Es necesario porque de otra manera, irá a un enlace inexistente y solo queremos que borre el post
    fetch(SERVER + '/posts/' + e.target.id, {
            method: 'DELETE',
        })
        .then(verificarEstado(response))
        .catch(error => { //solo para promesas. despues se transforma en json
            console.log('Error en la petición', error);
        })

    .then(transformarRespuesta())
        .then(location.reload())
        .then(date =>
            console.log(date))
}