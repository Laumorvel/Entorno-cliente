import { Component, OnInit } from '@angular/core';
import { Jokes } from '../Interfaces/interface';
import { Joke } from '../Interfaces/interfaces';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chistes',
  templateUrl: './chistes.page.html',
  styleUrls: ['./chistes.page.scss'],
})
export class ChistesPage implements OnInit {

  constructor(private service: DataService) { }

  ngOnInit() {
  }

  search: string = "";
  jokes: Joke[]=[];

  getJokes(event){
    this.search = event.detail.value;//consigue el valor de la búsqueda
    this.service.getJokesBySearch(this.search).subscribe({
      next: resp => {
        console.log(resp.result);
        this.jokes = resp.result;
      }
    });
  }
}
