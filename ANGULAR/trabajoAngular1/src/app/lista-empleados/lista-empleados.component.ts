import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Empleado } from '../empleado.module';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  @Input() empleadoLista:Empleado; //tsconfig.json --> poner a false la propiedad de inicialización extricta

  @Input() indice:number;

  constructor() { }


  ngOnInit(): void {
  }

  arrayCaracteristicas = [''];

  agregarCaracteristica(caracteristica: string){
    this.arrayCaracteristicas.push(caracteristica);
  }

}
