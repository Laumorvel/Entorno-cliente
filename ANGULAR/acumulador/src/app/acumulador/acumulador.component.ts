import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acumulador',
  templateUrl: './acumulador.component.html',
  styleUrls: ['./acumulador.component.css']
})
export class AcumuladorComponent implements OnInit {

  acumulador: number = 0;
  incremento: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

    // método que recibe parámetros
    acumula(incremento:number){
      this.acumulador+= incremento;
    }
  
    aumentar(){
      this.incremento++;
    }
    disminuir(){
      this.incremento--;
    }

}
