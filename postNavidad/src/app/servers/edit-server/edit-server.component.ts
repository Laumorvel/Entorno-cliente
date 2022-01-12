import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { Server } from '../interfaces/server.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styles: [
  ]
})
export class EditServerComponent implements OnInit {

  server!: Server;
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
