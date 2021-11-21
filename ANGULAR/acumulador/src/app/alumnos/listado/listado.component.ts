import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  alumnos: string[] = ["Adela", "fran", "javi", "estefania","cristina","laura"];
  aprobados:string[]=[];
  ultimoAlumno:string = "";
  eliminarAlumno(){
    //this.ultimoAlumno=this.alumnos.pop() || "";
    this.aprobados.push(this.alumnos.shift() || "");
  }
  constructor() { }

  ngOnInit(): void {
  }

}
