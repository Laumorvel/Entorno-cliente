import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  search:string="";

  @Output() onEnter: EventEmitter<string> = new EventEmitter();//entre padre e hijo

  searchBooks(){
    this.onEnter.emit(this.search);
  }

}
