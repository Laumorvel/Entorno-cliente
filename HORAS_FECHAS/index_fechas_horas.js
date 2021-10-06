
let boton = document.getElementById("boton").addEventListener("click", indicaFecha);
let resul = document.getElementById("result");

const days = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado'
  ];

  const months = [
    'enero',
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
    'diciembre'
  ];

 //Hoy es martes, 28 de Febrero de 2018 y son las 14:32 horas.
function indicaFecha(){
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    const date = new Date(fecha);

    let fechaFinal = "Hoy es ";
    let diaHoy = days[date.getDay()];
    let diaNum = date.getDate();
    let mes = months[date.getMonth() - 1];
    let anyo = date.getFullYear();

    resul.textContent = fechaFinal.concat(diaHoy).concat(", ").concat(diaNum).concat( " de ") + mes + " de " + anyo + " y son las " + hora;

}
