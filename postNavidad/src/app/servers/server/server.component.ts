import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { Server } from '../interfaces/server.interface';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [
  ]
})
export class ServerComponent implements OnInit {
  server!: Server;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //Ocurre la primera vez

    /* //Ocurre cada vez que cambie puesto que es un observable y se activará con el cambio en params
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);//ESTO TAMBIÉN DEVUELVE UN STRING.
    });*/

    //obtenemos el server usando un resolver
    this.route.data.subscribe( //Utilizamos el data observable de la ruta y nos suscribimos
      (data: Data) => {
        //Asignamos a nuestro server el valor del server proviente de la data de nuestro parámetro
       // this.server = data['server']; //tiene que tener el mismo nombre que se le ha dado en el AppRouting
        const id = +this.route.snapshot.params['id'];//ESTO NOS DEVUELVE UN STRING ('3'). CON EL SIGNO '+' LO CASTEAMOS A INTEGER
        //this.server = this.serversService.getServer(id);
        this.server = data['server'];
        console.log(this.server);
      }
      )
     /* const id = +this.route.snapshot.params['id'];//ESTO NOS DEVUELVE UN STRING ('3'). CON EL SIGNO '+' LO CASTEAMOS A INTEGER
      this.server = this.serversService.getServer(id);

      this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});*/
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    // this.route.params.subscribe(
    //   (data: Data) => {
    //     this.server = data['server'];
    //     console.log(this.server);
    //     this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});

    //   }
    //)


  }
  }



