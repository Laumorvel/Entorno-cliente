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
    this.corazon = this.fav ? 'heart' : 'heart-outline';
  }

  favouriteJokes: Joke[];
  corazon = 'heart-outline';
  joke: Joke;
  fav: boolean;
  show: boolean = false;

  getFavouriteJokes() {
    this.service.getFavouriteJokes().subscribe((resp) => {
      this.favouriteJokes = resp;
      console.log(resp);
      this.getJoke();
    });
  }

  getJoke() {
    this.service
      .getSpecificJoke(this.activedRoute.snapshot.params['id'])
      .subscribe({
        next: (resp) => {
          this.checkFav(resp);
          this.joke = resp;
          this.show = true;
        },
        error: (err) => {
          return null;
        },
      });
  }

  checkFav(joke: Joke) {
    this.favouriteJokes.forEach((j) => {
      if (j.value == joke.value) {
        this.fav = true;
        this.corazon = 'heart';
      }
      if(!this.fav){
        this.corazon = 'heart-outline';
      }
    });
  }

  favorite(joke: Joke) {
    if (!this.fav) {
      this.service.addFavourite(joke);
        this.corazon = 'heart';
        this.fav = true;

    } else {
      this.favouriteJokes.forEach((j) => {
        if (joke.value == j.value) {
          this.service.deleteJoke(j);
            this.corazon = 'heart-outline';
            this.fav = false;

        }
      });
    }
  }
}
