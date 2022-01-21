import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { Server } from '../interfaces/server.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styles: [
  ]
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {

  server!: Server;
  serverName = '';
  serverStatus = '';

  changesSaved = false;
  allowEdit = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
      );

      this.route.params.subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);

        }
      )
      const id = +this.route.snapshot.params['id'];
      this.server = this.serversService.getServer(id);
      console.log(this.server);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    //Para saber si el servername es el mismo al del principio o no
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to exit without saving your changes?');
    } else {
      return true;
    }
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
