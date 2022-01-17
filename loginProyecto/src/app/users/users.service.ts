import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class UsersService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  login(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/login", user);
  }

  register(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
  getUser() {
    return this.http.get("https://reqres.in/api/users/2");
  }
  getUserLogged() {
    const token = this.getToken();
    // Aquí iría el endpoint para devolver el usuario para un token

    //Para este ejemplo siempre se devuelve el mismo usaurio porque siempre se llama al mismo endpoint. Aquí es donde digo que en un caso real, dentro del componente
    //desde el que quieras ver el usuario logueado, tienes que llamar al userService para que te devuelva el token desde las cookkies para pasarlo al método de getUser del servicio,
    //pero como digo con la API esta de ejemplo no se puede.
  }
}
