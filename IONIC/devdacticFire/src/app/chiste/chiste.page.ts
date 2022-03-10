import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Joke } from '../Interfaces/interfaces';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chiste',
  templateUrl: './chiste.page.html',
  styleUrls: ['./chiste.page.scss'],
})
export class ChistePage implements OnInit {
  constructor(
    private activedRoute: ActivatedRoute,
    private service: DataService
  ) {}

  ngOnInit() {
    this.getFavouriteJokes();
  }

  favouriteJokes:Joke[];
  img='';
  clicado = false;
  corazon = 'heart-outline';
  boton = false;
  joke:Joke;
  fav: boolean = false;
  show: boolean = false;

  botonClicado() {
    if(this.corazon == 'heart-outline'){
      this.corazon = 'heart';
    }else{
      this.corazon = 'heart-outline';
    }
  }

  getFavouriteJokes(){
    this.service.getFavouriteJokes().subscribe(
      resp =>{
        this.favouriteJokes = resp;

      }
    )
  }

  getJoke(){
    this.service.getSpecificJoke(this.activedRoute.snapshot.params["id"]).subscribe({
      next: resp =>{
        this.checkFav(resp);
        this.joke = resp;
        this.show = true;
      },
      error: err =>{
        return null;
      }
    })
  }

  checkFav(joke:Joke){
    this.favouriteJokes.forEach(j => {
      if(j.value == joke.value){
        this.fav = true;
        this.corazon = 'heart';
      }else{
        this.corazon = 'heart-outline';
      }
    })
  }

  favorite(joke: Joke){
    if(!this.fav){
      this.service.addFavourite(joke).then(resp =>{
        this.corazon = 'heart';
        this.fav=true;
      });
    }else{
      this.favouriteJokes.forEach(j =>{
        if(j.value == j.value){
          this.service.deleteJoke(j).then(resp =>{
            this.corazon = 'heart-outline';
            this.fav = false;
          });

        }
      })
    }
  }

}
