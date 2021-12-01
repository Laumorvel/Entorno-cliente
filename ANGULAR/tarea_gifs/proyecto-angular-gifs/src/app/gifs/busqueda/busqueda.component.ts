import { Component, OnInit, Output } from '@angular/core';
import { GifsServiceService } from '../gifs-service.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  constructor(private servicio: GifsServiceService) { }

  value:string = "";

  ngOnInit(): void {
  }

  guardaBusquedaEnHistorial(){
    this.servicio.buscarGifs(this.value);
  }


}
