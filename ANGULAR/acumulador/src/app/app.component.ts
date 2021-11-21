import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string='Acumulador';
  acumulador: number = 0;
  incremento: number = 0;
  
  incrementar(valor:number){
    this.incremento+=valor;
  }
  acumular(incremento:number){
    this.acumulador+=incremento;
  }
  resetear(){
    this.acumulador=0;
    this.incremento=0;
  }
}
