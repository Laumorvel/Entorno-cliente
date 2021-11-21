import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})
export class PersonajeComponent implements OnInit {


  ngOnInit(): void {
  }

  public nombre: string;
  public salud: number;


  constructor(nombre: string, salud: number) {
    this.nombre = nombre;
    this.salud = salud;
  }
}
