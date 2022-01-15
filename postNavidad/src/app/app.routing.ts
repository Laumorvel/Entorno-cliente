import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServersComponent } from './servers/servers/servers.component';
import { UsersComponent } from './users/users/users.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { AuthGuard } from './AuthGuard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { ErrorPageComponent } from './error-page/error-page.component';

//Busca en cascada, con lo que si colocamos antes el path:'**', siempre entrará ahí.
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
  ,{ //ESTO SON RUTAS ANIDADAS O HIJAS
    path: 'servers',
    //canActivate:[AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,children: [
    { path: ':id/edit', component: EditServerComponent,canDeactivate: [CanDeactivateGuard],
    resolve: {server: ServerResolver} },
    { path: ':id', component: ServerComponent }
  ]
  },
  {
    path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent },
  ]
  },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Ooopsi! Page not found.'} },
  { path: '**', redirectTo: '/not-found'}
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
