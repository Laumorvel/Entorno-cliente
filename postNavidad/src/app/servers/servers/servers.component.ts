import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { Server } from '../interfaces/server.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styles: [],
})
export class ServersComponent implements OnInit {
  public servers: Server[] = [];
  public server!: Server;

  //Declaro esta variable para que solo el usuario registrado con el mismo id que el server al que clique, pueda editarlo
  public userId: number = +localStorage.getItem("idUser")!; //le indico que no es null (!) y lo paso a number (+)

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serversService.getServers().subscribe(
      //petición del observable para conseguir los servers
      (resp) => {
        this.servers = resp;
      }
    );

    this.userId = +localStorage.getItem("idUser")!;//necesito la ! para que no salte el error de "posible objeto null".
                                                  //para llegar a este paso es necesario que se identifique correctamente y se añada el id al localStorage. No puede ser null.
  }

  onReload() {
    //ES UNA RUTA RELATIVA (nos llevaría a servers/serves si fuera un routerLink)
    //La razón por la que esta técnica funciona con el método "navigate" y no con el "routerLink", es porque,
    //al contrario que el "routerLink", el método "navigate" no sabe en qué ruta actual nos encontramos.
    //Como posee un guardián, no cargará /servers y nos mandará al home
    this.router.navigate(['servers'], { relativeTo: this.route });
  }
}
