import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Joke } from '../Interfaces/interfaces';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  constructor(
    private modal: ModalController,
    private toast: ToastController,
    private service: DataService
  ) {}

  ngOnInit() {
    this.service.getJokeById(this.id).subscribe(
      resp => {
        this.joke = resp;
      }
    )
  }

  @Input() id: string;
  joke!: Joke;


  async deleteJoke(){
    await this.service.deleteJoke(this.joke);
    this.modal.dismiss();
  }

  async updateJoke(){
    await this.service.updateJoke(this.joke);
    const toast = await this.toast.create({
      message: 'Great!',
      duration: 1000
    });
    toast.present();
  }
}
