import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChistesPageRoutingModule } from './chistes-routing.module';

import { ChistesPage } from './chistes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChistesPageRoutingModule
  ],
  declarations: [ChistesPage]
})
export class ChistesPageModule {}
