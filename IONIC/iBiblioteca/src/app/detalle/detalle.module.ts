import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetallePageRoutingModule } from './detalle-routing.module';
import { DetallePage } from './detalle.page';
import { OpenLibraryService } from '../open-library.service';
import { StorageService } from '../storage.service';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [DetallePage],
  providers: [OpenLibraryService, StorageService],
})
export class DetallePageModule {}
