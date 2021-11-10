"use strict";
exports.__esModule = true;
// Uso de Let y Const
var nombre = "Ricardo Tapia";
var edad = 23;
var PERSONAJE = {
    nombre: nombre,
    edad: edad
};
// Cree una interfaz que sirva para validar el siguiente objeto
var batman = {
    nombre: "Bruno Díaz",
    artesMarciales: ["Karate", "Aikido", "Wing Chun", "Jiu-Jitsu"]
};
function imprimeHeroe(heroe) {
    console.log("Mi nombre de heroe es" + heroe.nombre + " y tengo las siguientes habilidades: " + heroe.poderes);
}
// Convertir esta funcion a una funcion de flecha
function resultadoDoble(a, b) {
    return (a + b) * 2;
}
var resultadoDobleFlecha = (function (a, b) {
    return (a + b) * 2;
});
// Función con parametros obligatorios, opcionales y por defecto
// donde NOMBRE = obligatorio
//       PODER  = opcional
//       ARMA   = por defecto = "arco"
function getAvenger(nombre, poder, arma) {
    if (arma === void 0) { arma = "arco"; }
    var mensaje;
    if (poder) {
        mensaje = nombre + " tiene el poder de: " + poder + " y un arma: " + arma;
    }
    else {
        mensaje = nombre + " tiene un " + poder;
    }
    return mensaje;
}
;
// Cree una clase que permita manejar la siguiente estructura
// La clase se debe de llamar rectangulo,
// debe de tener dos propiedades:
//   * base
//   * altura
// También un método que calcule el área  =  base * altura,
// ese método debe de retornar un numero.
var Rectangulo = /** @class */ (function () {
    function Rectangulo(base, altura) {
        this.base = base;
        this.altura = altura;
    }
    Rectangulo.prototype.calculaArea = function () {
        return this.base * this.altura;
    };
    return Rectangulo;
}());
//crear un modulo de calculo que lo importemos en ts
var modulo_1 = require("./modulo");
var suma = new modulo_1.Calculo(5, 2);
suma.sumar();
suma.restar();
