import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChisteRandomPageRoutingModule } from './chiste-random-routing.module';

import { ChisteRandomPage } from './chiste-random.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChisteRandomPageRoutingModule
  ],
  declarations: [ChisteRandomPage]
})
export class ChisteRandomPageModule {}
