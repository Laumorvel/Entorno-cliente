import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { Server } from '../interfaces/server.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    const id = +this.route.snapshot.params['id'];//ESTO NOS DEVUELVE UN STRING ('3'). CON EL SIGNO '+' LO CASTEAMOS A INTEGER
    this.server = this.serversService.getServer(id);

    //Ocurre cada vez que cambie puesto que es un observable y se activará con el cambio en params
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);//ESTO TAMBIÉN DEVUELVE UN STRING.
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
