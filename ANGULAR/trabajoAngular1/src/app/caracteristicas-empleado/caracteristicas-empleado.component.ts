import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { EmpleadosServicioService } from '../services/empleados-servicio.service';

@Component({
  selector: 'app-caracteristicas-empleado',
  templateUrl: './caracteristicas-empleado.component.html',
  styleUrls: ['./caracteristicas-empleado.component.css']
})
export class CaracteristicasEmpleadoComponent implements OnInit {

@Output() caracteristicasEmpleado = new EventEmitter<string>(); //Es un output puesto que va a ser info que vamos a exportar

  constructor(private miServicio:EmpleadosServicioService) { }

  ngOnInit(): void {
  }


  agregarCaracteristicas(value: string){
    this.miServicio.muestraMensaje(value);
    this.caracteristicasEmpleado.emit(value);
  }
}
