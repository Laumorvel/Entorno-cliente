import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsServiceService {

  constructor() { }

  historial:string[]=[];

  getHistorial(){
    return this.historial;
  }

  buscarGifs(busqueda:string){
    this.historial.unshift(busqueda);
  }

}
