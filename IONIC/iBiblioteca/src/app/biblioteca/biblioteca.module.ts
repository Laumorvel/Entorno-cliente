import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BibliotecaPageRoutingModule } from './biblioteca-routing.module';

import { BibliotecaPage } from './biblioteca.page';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DetallePageModule } from '../detalle/detalle.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BibliotecaPageRoutingModule,
    DetallePageModule
  ],
  declarations: [BibliotecaPage, BusquedaComponent]
})
export class BibliotecaPageModule {}
