import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { CaracteristicasEmpleadoComponent } from './caracteristicas-empleado/caracteristicas-empleado.component';
import { EmpleadosServicioService } from './services/empleados-servicio.service';

@NgModule({
  declarations: [
    AppComponent,
    ListaEmpleadosComponent,
    CaracteristicasEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule //Lo primero que debemos hacer para poder trabajar con formularios es importar formsModule siempre en el MODULE principal
  ],
  providers: [EmpleadosServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
