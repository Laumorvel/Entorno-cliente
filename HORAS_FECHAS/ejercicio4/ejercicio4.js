let boton = document.getElementById("boton").addEventListener("click",parar);

function parar(){
    let ahora = new Date();
    let h = ahora.getHours();
    let m = ahora.getMinutes();
    let s = ahora.getSeconds();

    let print = document.getElementById("result");
    print.textContent += "\n \r Hoy es " + ahora.toLocaleDateString() + " y son las " + h + ":" + m + ":" + s + " horas";
}
