import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "./servers/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}

  loggedIn = false;
  private baseUrl: string = environment.baseUrl;

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;// devuelve el valor de la propiedad loggedIn si la promesa se resuelve
  }

  login(email:string,password:string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = {
      'email': email,
      'password': password
    }
    return this.http.post(url, body);
    //this.loggedIn = true;
  }


  logout() {
    this.loggedIn = false;
  }
}
