import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  nombre: string = "Fran Arroyo";
  edad: number =21;
  get nombreMayus():string {
    return this.nombre.toUpperCase();
  }

  cambiarNombre(){
    this.nombre="Adela Lira"
  }
  cambiarEdad(){
    this.edad=24;
  }
  constructor() { 
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}