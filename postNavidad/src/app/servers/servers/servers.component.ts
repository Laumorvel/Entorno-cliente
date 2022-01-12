import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { Server } from '../interfaces/server.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styles: [
  ]
})
export class ServersComponent implements OnInit {
  public servers: Server[] = [];
  constructor(private serversService: ServersService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    //ES UNA RUTA RELATIVA (nos llevaría a servers/serves si fuera un routerLink)
    //La razón por la que esta técnica funciona con el método "navigate" y no con el "routerLink", es porque,
    //al contrario que el "routerLink", el método "navigate" no sabe en qué ruta actual nos encontramos.
    this.router.navigate(['servers'], { relativeTo: this.route });
  }

}
