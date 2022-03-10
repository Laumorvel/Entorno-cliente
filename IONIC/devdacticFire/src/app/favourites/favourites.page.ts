import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Joke } from '../Interfaces/interfaces';
import { ModalPage } from '../modal/modal.page';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  constructor(
    private service: DataService,
    private changeDetector: ChangeDetectorRef,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.getFavoutires();
  }

  favouriteJokes:Joke[];
  show:boolean = false;

  getFavoutires(){
    this.service.getFavouriteJokes().subscribe(
      resp =>{
        this.favouriteJokes = resp;
        this.changeDetector.detectChanges();
        this.show = true;
      }
    )
  }

  async showJoke(joke: Joke){
    const modal = await this.modal.create({
      component: ModalPage,
      componentProps: { id: joke.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
    await modal.present();
  }

}
