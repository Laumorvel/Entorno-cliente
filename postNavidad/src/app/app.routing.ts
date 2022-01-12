import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServersComponent } from './servers/servers/servers.component';
import { UsersComponent } from './users/users/users.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';

//Busca en cascada, con lo que si colocamos antes el path:'**', siempre entrará ahí.
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  }
  ,{ //ESTO SON RUTAS ANIDADAS O HIJAS
    path: 'servers', component: ServersComponent, children: [
    { path: ':id/edit', component: EditServerComponent },
    { path: ':id', component: ServerComponent }
  ]
  },
  {
    path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent },
  ]
  },
  {
      path: '**',
      redirectTo: ''//si aquí pusiera el componente home, entonces no se cambiarían los estilos del menú como se han definido
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot( routes )
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule {}
