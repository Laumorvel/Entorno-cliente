import { Injectable, OnInit } from '@angular/core';
import { Server } from './interfaces/server.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServersService implements OnInit{
  constructor(private http: HttpClient) {}

  ngOnInit(): void {

  }

  private servers: Server[] = [];
  private baseUrl: string = environment.baseUrl;

  //Observable para conseguir los servidores
  //Debemos pasarle el token para que nos permita acceder
  getServers(): Observable<Server[]> {
    let token = JSON.parse(<string>localStorage.getItem('jwt')).access_token;
    //Es mucho mejor almacenar el token en el localStorage porque podemos acceder desde cualquier componente sin dar muchas vueltas

    //EXPLICACIÓN:
    //Si entro en la interfaz HttpClient se pueden ver todos los parámetros que se le
    //pueden añadir a las petciones.
    //En este caso, se necesita options --> headers para incluir el token y, así, tener acceso.

    //Puede hacerse en dos partes (como lo siguiente comentado) o en una (como lo hago yo):
    /* const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const options = {
      headers = headers
    }
    */

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    const url = `${this.baseUrl}/servers`;
    return this.http.get<Server[]>(url, options);
  }

  getServer(id: number): Server {
    this.getServers().subscribe(
      (resp) =>{
        console.log(resp);
        this.servers = resp;
      }
    )
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    return <Server>server;
  }

  updateServer(id: number, serverInfo: { name: string; status: string }) {
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
