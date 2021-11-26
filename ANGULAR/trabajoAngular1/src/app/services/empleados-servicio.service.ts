import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosServicioService {

  constructor() { }

  muestraMensaje(mensaje: string){
    alert(mensaje);
  }
}
