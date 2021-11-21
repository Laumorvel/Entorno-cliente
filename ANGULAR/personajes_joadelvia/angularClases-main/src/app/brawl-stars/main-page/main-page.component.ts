import { Component, OnInit } from '@angular/core';
import { Personaje } from '../brawl-stars.module';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  personajes: Personaje[] = [];
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
  }

}

