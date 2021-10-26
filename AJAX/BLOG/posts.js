const tabla = document.getElementById("tabla");
const SERVER = 'http://localhost:3000';



window.onload = function() {
    const peticion = new XMLHttpRequest();
    peticion.open('GET', 'http://localhost:3000/posts'); //no podemos traernos los dnis
    peticion.send();





    peticion.addEventListener('load', function() {
        let posts = JSON.parse(peticion.responseText);
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


    })
}

function borrar(e) {
    e.preventDefault();
    const peticion = new XMLHttpRequest();
    peticion.open('DELETE', 'http://localhost:3000/posts/' + e.target.id);
    peticion.send();
    peticion.addEventListener('load', function() {
        location.reload();
    })
}