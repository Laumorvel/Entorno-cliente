import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}

  //loggedIn = false;
  private baseUrl: string = environment.baseUrl;

  authenticate() {
    const urlPrueba = `${this.baseUrl}/login`;
    let token = JSON.parse(<string>localStorage.getItem('jwt')).access_token;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.get(urlPrueba, options);

    //MÉTODO ANTERIOR:
    // const promise = new Promise(
    //   (resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(this.loggedIn);
    //     }, 800);
    //   }
    // );
    //return promise;// devuelve el valor de la propiedad loggedIn si la promesa se resuelve
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
    //this.loggedIn = false;
    localStorage.removeItem('jwt');
  }
}
