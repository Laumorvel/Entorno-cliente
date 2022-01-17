
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./log/login/login.component";
import { RegisterComponent } from "./log/register/register.component";
import { HomeComponent } from './home/home/home.component';

const appRoutes = [
  { path: "", component: AppComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent, pathMatch: "full" }
];
export const routing = RouterModule.forRoot(appRoutes);


@NgModule({
  imports: [
      RouterModule.forRoot( appRoutes )
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule {}
