const boton = document.getElementById("boton").addEventListener("click",sumaDiasAFecha);
const meses = ['enero',
'febrero',
'marzo',
'abril',
'mayo',
'junio',
'julio',
'agosto',
'septiembre',
'octubre',
'noviembre',
'diciembre'];

function sumaDiasAFecha(){
    const div = document.getElementById("contenedor");
    const fecha = document.getElementById("fecha").value;
    const dias = document.getElementById("numRetraso").value;

    let resul = new Date(fecha);


    let newFecha = new Date(resul);

    newFecha.setDate(resul.getDate() + parseInt(dias));

    div.textContent = "La fecha resultante es: " + newFecha.toLocaleDateString();

    //toLocaleDateString() --> para que imprima la fecha en formate --/--/--

    
}