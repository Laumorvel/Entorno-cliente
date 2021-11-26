import { Component, Input, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/brawl-stars.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
  /*podríamos quitar este styleUrls y poner styles e introducir directamente las propiedades
  del css: "input(display:block; margin: 1em" */
})
export class AgregarComponent implements OnInit {
  @Input() nuevo: Personaje = {
    nombre:"",
    salud: 0
  };

  @Input() personajes: Personaje[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  agregar(){

    this.personajes.push(this.nuevo);
    this.nuevo = {
      nombre: "",
      salud: 0
    }
    console.log(this.nuevo.nombre);
  }
}
