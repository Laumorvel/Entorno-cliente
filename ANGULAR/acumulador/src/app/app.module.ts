import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlumnoComponent } from './alumnos/alumno/alumno.component';
import { ListadoComponent } from './alumnos/listado/listado.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    ListadoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
