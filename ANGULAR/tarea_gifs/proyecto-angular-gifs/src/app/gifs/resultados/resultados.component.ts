import { Component, OnInit } from '@angular/core';
import { GifsServiceService } from '../gifs-service.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent implements OnInit {


  constructor(private servicio:GifsServiceService) { }

  ngOnInit(): void {
  }

 get cogerImagen(){
  return this.servicio.resultado;

 }

}
