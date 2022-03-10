import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {Joke} from '../Interfaces/interfaces'

@Component({
  selector: 'app-chiste-random',
  templateUrl: './chiste-random.page.html',
  styleUrls: ['./chiste-random.page.scss'],
})
export class ChisteRandomPage implements OnInit {
  constructor(private service: DataService) {}

  ngOnInit() {}

  joke = '';
  clicado = false;
  corazon = 'heart-outline';
  boton = false;
  resp!:Joke;

  getRandomJoke() {
    this.service.getRandomJoke().subscribe((resp) => {
      this.joke = resp.value;
      this.resp = resp;
    });
    this.clicado = true;
    this.corazon = 'heart-outline';
  }


  botonClicado() {
    if(this.corazon == 'heart-outline'){
      this.corazon = 'heart';
      this.service.addFavourite(this.resp);
    }else{
      this.corazon = 'heart-outline';
      this.service.deleteJoke(this.resp);
    }
  }
}
