import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {

  apellido: String;

  constructor() {
    this.apellido = 'Moreno';
  }

  ngOnInit(): void {
    console.log('Apellido cargado');
  }

}
