export class Calculo {
    n1: number;
    n2: number;

    constructor(n1:number, n2:number) {
        this.n1 = n1;
        this.n2 = n2;
    }

    sumar() {
        console.log(this.n1 + this.n2);
    }

    restar() {
        console.log(this.n1 - this.n2);
    }

    multiplicar() {
        console.log(this.n1 * this.n2);
    }

    dividir(){
        console.log(this.n1 / this.n2);
    }

}