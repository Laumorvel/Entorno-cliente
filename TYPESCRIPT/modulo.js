"use strict";
exports.__esModule = true;
var Calculo = /** @class */ (function () {
    function Calculo(n1, n2) {
        this.n1 = n1;
        this.n2 = n2;
    }
    Calculo.prototype.sumar = function () {
        console.log(this.n1 + this.n2);
    };
    Calculo.prototype.restar = function () {
        console.log(this.n1 - this.n2);
    };
    Calculo.prototype.multiplicar = function () {
        console.log(this.n1 * this.n2);
    };
    Calculo.prototype.dividir = function () {
        console.log(this.n1 / this.n2);
    };
    return Calculo;
}());
exports.Calculo = Calculo;
