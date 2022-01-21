import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/servers/interfaces/user.interface';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsersService
  ) {}

  email!: string;
  password!: string;


  ngOnInit(): void {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (resp) => {
        console.log(resp); //cogemos el token y lo almacenamos en el localStorage
        localStorage.setItem('jwt', JSON.stringify(resp));
        this.authService.loggedIn = true; //cambiamos este atributo solo si el user se ha identificado. Para uso del guardían para el componente users.
        //para que no se pueda acceder a los servers por url directamente

        //subo el id del usuario a localStorage
        this.getIdUser();
        this.router.navigateByUrl('/servers');
      },
      error: (e) => {
        console.log(e);
        alert('Introduzca un usuario y contraseña válido');
      },
    });

    /*login() {
      const user = {email: this.email, password: this.password};
      this.authService.login(user).subscribe( data => {
        this.authService.setToken(data.token); //setToken lo que hacía era poner a true una propiedad
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
      });
    }*/
  }
  //Para conseguir al usuario logueado e insertar su id en el localStorage cuando coincida con el correo de uno de los users (se supone que una app no tiene correos repetidos)
  getIdUser() {
    this.userService.getUsers().subscribe((resp) => {
      console.log(resp);
      let users = resp;
      const buscado = users.find((u) => u.email === this.email);

      console.log(buscado);
      localStorage.setItem('idUser', JSON.stringify(buscado?.id));
    });

    //lo almaceno para que luego pueda usarlo para dar permisos de edición de servidores concretos
  }


}
