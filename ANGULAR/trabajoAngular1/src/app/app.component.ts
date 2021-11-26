import { Component } from '@angular/core';
import { Empleado } from './empleado.module';
import { EmpleadosServicioService } from './services/empleados-servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'Registro de usuarios';

  constructor(private miServicio:EmpleadosServicioService){

  }

  //Metemos algunos empleados para que ya haya algunos en la página
  empleados:Empleado[] = [
    new Empleado("Pepe", "Pérez", "Presidente", 5000),
    new Empleado("Vanesa", "Rodríguez", "Directora", 4000),
    new Empleado("Lucas", "Fernńdez", "Administrativo", 3000),
    new Empleado("Laura", "Morán", "Socia fundadora", 8000)
  ];

  agregarEmpleado(){
    let miempleado = new Empleado(this.nombre, this.apellidos, this.cargo, this.salario);
    this.miServicio.muestraMensaje('Nombre del empleado: ' + miempleado.nombre);
    this.empleados.push(miempleado);//Lo añadimos al array que se añade al formulario.
  }

  nombre:String="";//bidireccional con el input del formulario
  apellidos:String="";
  cargo:String="";
  salario:number=0;

}
