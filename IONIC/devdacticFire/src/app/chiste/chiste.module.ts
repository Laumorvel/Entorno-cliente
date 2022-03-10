import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChistePageRoutingModule } from './chiste-routing.module';

import { ChistePage } from './chiste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChistePageRoutingModule
  ],
  declarations: [ChistePage]
})
export class ChistePageModule {}
