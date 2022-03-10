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
  img='';
  clicado = false;
  corazon = 'heart-outline';
  boton = false;
  resp!:Joke;
  jokes:Joke[]= [];

  getRandomJoke() {
    this.service.getRandomJoke().subscribe((resp) => {
      this.joke = resp.value;
      this.img = resp.icon_url;
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
      this.eliminar(this.resp);
    }
  }

  /**
   * Para poder borrarlo necesito
   * @param joke
   */
  async eliminar(joke: Joke){
    await this.service.deleteJoke(joke);
  }

}
