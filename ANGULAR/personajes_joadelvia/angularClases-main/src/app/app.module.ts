import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlumnosModule } from './alumnos/alumnos.module';

import { AppComponent } from './app.component';
import { ContadorComponent } from './contador/contador.component';
import { BrawlStarsModule } from './brawl-stars/brawl-stars.module';
import { MainPageComponent } from './brawl-stars/main-page/main-page.component';
import { PersonajesComponent } from './app/brawl-stars/personajes/personajes.component';

@NgModule({
  declarations: [
    AppComponent,
    ContadorComponent,
    PersonajesComponent,
  ],
  imports: [
    BrowserModule,
    AlumnosModule,
    BrawlStarsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
