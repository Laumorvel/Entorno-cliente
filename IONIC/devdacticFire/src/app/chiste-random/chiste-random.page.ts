import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chiste-random',
  templateUrl: './chiste-random.page.html',
  styleUrls: ['./chiste-random.page.scss'],
})
export class ChisteRandomPage implements OnInit {

  constructor(private service:DataService) { }

  ngOnInit() {


  }

  getRandomJoke(){
    this.service.getRandomJoke().subscribe(

    )
  }

}
