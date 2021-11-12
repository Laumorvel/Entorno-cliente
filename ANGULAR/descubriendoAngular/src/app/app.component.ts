import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "descubriendoAngular";
  edad:number;

  constructor(){
    this.edad = 20;
  }
}
