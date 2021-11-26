import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

  @Input() personajes: any[] = [];//input es un decorador para indicar que vamos a recibir algo. Queremos vincular personajes con personajes del padre. En los paréntesis podemos indicar si cambiamos el nombre
  constructor() { }

  ngOnInit(): void {
  }

}
