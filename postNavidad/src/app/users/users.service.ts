import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../servers/interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private users: User[] = [];
  private baseUrl: string = environment.baseUrl;

  //necesito el token para acceder
  getUsers(): Observable<User[]> {
    let token = JSON.parse(<string>localStorage.getItem('jwt')).access_token;

    const options = {
      headers: new HttpHeaders({
        ContentType: 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = `${this.baseUrl}/users`;
    return this.http.get<User[]>(url, options);
  }



}
