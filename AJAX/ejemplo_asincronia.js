const peticion = new XMLHttpRequest();
peticion.open('GET', 'https://jsonplaceholder.typicode.com/users');
peticion.send();
peticion.addEventListener('load', function() {
    if (peticion.status === 200) {
        let usuarios = JSON.parse(peticion.responseText); // Convertirmos los datos JSON a un objeto
        // procesamos los datos que tenemos en usuarios
    } else {
        muestraError();
    }
})
peticion.addEventListener('error', muestraError);
peticion.addEventListener('abort', muestraError);
peticion.addEventListener('timeout', muestraError);

function muestraError() {
    if (this.status) {
        console.log("Error " + this.status + " (" + this.statusText + ") en la petición");
    } else {
        console.log("Ocurrió un error o se abortó la conexión");
    }
}