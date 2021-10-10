const semana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const div = document.getElementById("result");
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

const boton = document.getElementById("boton").addEventListener("click", consigueFecha);

function consigueFecha(){

    let anyo = document.getElementById("anyo").value;
    let mes = document.getElementById("mes").value;
    let mesFin = meses.indexOf(mes)-1;
       
    const fecha = new Date(anyo, mesFin, 1);
    let auxMes = fecha.getMonth();

    while(fecha.getMonth() == auxMes){
        let numDia = fecha.getDate();
        let nomDia =  fecha.getDay();
        let finNumDia = semana[nomDia];
        div.textContent += " " + numDia + ", " + finNumDia;

        fecha.setDate(fecha.getDate() + 1);
    }

}
