import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

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

  getRandomJoke() {
    this.service.getRandomJoke().subscribe((resp) => {
      this.joke = resp.value;
    });
    this.clicado = true;
    this.corazon = 'heart-outline';
  }


  botonClicado() {
    if(this.corazon == 'heart-outline'){
      this.corazon = 'heart';
    }else{
      this.corazon = 'heart-outline';
    }
  }
}
