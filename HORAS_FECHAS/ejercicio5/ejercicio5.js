let posponer = document.getElementById("posponer").addEventListener("click", posponAlarma);
let detener = document.getElementById("detener").addEventListener("click", detenAlarma);

function mueveReloj(){
    let ahora = document.getElementById("ahora");
    let fecha = new Date();
    ahora.value= fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
    setTimeout("mueveReloj()",1000); //para que se llame cada segundo y renueve la hora
    setTimeout("compruebaAlarma()",1000);
}

function compruebaAlarma(){
    let alarm = document.getElementById("alarm").value;
    let fecha2 = new Date();
    let hora = fecha2.getHours() + ":" + fecha2.getMinutes();
    if(alarm == hora){
        let audio = document.getElementById("audio").setAttribute("autoplay", "");
        let div = document.getElementById("resul").classList.replace("oculto", "visible");
        let div2 = document.getElementById("div2");
        div2.textContent = "¡¡ALARMA ACTIVADA!!";
    }
}

function detenAlarma(){
    let audio = document.getElementById("audio").setAttribute("muted", "");
    div2.textContent = "";

}

function posponAlarma() {
    let audio = document.getElementById("audio").setAttribute("autoplay","");
    div2.textContent = "";
   setTimeout("posponAlarma()", 120000);//para que se llame cada dos minutos

}