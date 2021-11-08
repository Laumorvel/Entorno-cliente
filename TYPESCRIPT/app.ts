
// Uso de Let y Const
let nombre = "Ricardo Tapia";
let edad = 23;

const PERSONAJE = {
  nombre: nombre,
  edad: edad
};


// Cree una interfaz que sirva para validar el siguiente objeto
var batman = {
  nombre: "Bruno Díaz",
  artesMarciales: ["Karate","Aikido","Wing Chun","Jiu-Jitsu"]
}

interface SuperHeroe{
  nombre: string,
  poderes: string[];
}

function imprimeHeroe(heroe : SuperHeroe){
  console.log("Mi nombre de heroe es" + heroe.nombre + " y tengo las siguientes habilidades: " + heroe.poderes);
}

// Convertir esta funcion a una funcion de flecha
function resultadoDoble( a, b ){
  return (a + b) * 2
}

const resultadoDobleFlecha = ( (a, b) => {
  return (a + b) * 2;
})

// Función con parametros obligatorios, opcionales y por defecto
// donde NOMBRE = obligatorio
//       PODER  = opcional
//       ARMA   = por defecto = "arco"
function getAvenger( nombre: string, poder?:string, arma:string = "arco"){
  var mensaje:string;
  if( poder ){
     mensaje = nombre + " tiene el poder de: " + poder + " y un arma: " + arma;
  }else{
     mensaje = nombre + " tiene un " + poder
  }
  return mensaje;
};

// Cree una clase que permita manejar la siguiente estructura
// La clase se debe de llamar rectangulo,
// debe de tener dos propiedades:
//   * base
//   * altura
// También un método que calcule el área  =  base * altura,
// ese método debe de retornar un numero.
class Rectangulo{
  base:number;
  altura:number;

  area:number;

  constructor(base:number, altura:number){
    this.base = base;
    this.altura = altura;
    this.area = calculaArea(base, altura);
  }
}

function calculaArea( base:number, altura:number):number{
  this.area = base * altura;
  return this.area;
  }
