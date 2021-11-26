import { Component, OnInit } from '@angular/core';
import { Personaje } from '../brawl-stars.module';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  //Como esto no son variables, sino atributos de la clase, no hace falta declararlas con let, const ...
  personajes: Personaje[] = [];

/*
Otra forma de hacerlo:

personajes: Personaje[] =
[
  {
    nombre: "Shelly",
    salud: 3600
  },
  {
    nombre: "Nita",
    salud: 5000
  }
]
*/

  nombre:String='';
  salud:number=0;

  constructor() {
  }

  ngOnInit(): void {
  }

  anadirPersonaje(){
    let personaje:Personaje={
      nombre:this.nombre,
      salud:this.salud
    }
    this.personajes.push(personaje);
    
    this.nombre = "";
    this.salud = 0;
  }

}

