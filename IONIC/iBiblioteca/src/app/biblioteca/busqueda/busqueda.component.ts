import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();//entre padre e hijo
  constructor() { }

  ngOnInit() {}

  search:string="";


  searchBooks(){
    this.onEnter.emit(this.search);
  }

}
