import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from '@angular/router';
import {  catchError, Observable, of } from "rxjs";
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
private comprobacion: boolean = false;
  constructor(private authService: AuthService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | any{
  return this.authService.authenticate().subscribe({
      next: (resp) => {
       console.log(resp);
        return true;
      },
      error: (e) => {
        console.log(e.message);
        Swal.fire({
          title: 'Su token ha expirado',
          text: 'Vuelva a iniciar sesión',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        this.router.navigate(['']);
        return false;
      }

    });

    }


    // .then(
    //   (authenticated) => {//hacrer la peticion para que vuelva a comprobar el token (cambiará al minuto)
    //     if (authenticated) {
    //       return true;

    //     } else {
    //       this.router.navigate(['/']);
    //       return false;
    //     }
    //   }
    //   );
    //)


    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |Promise<boolean> | boolean {
      return this.canActivate(route, state);
    }
  }


