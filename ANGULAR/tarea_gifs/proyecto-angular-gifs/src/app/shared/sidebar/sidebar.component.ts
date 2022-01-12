import { Component, NgModule, OnInit } from '@angular/core';
import { GifsServiceService } from 'src/app/gifs/gifs-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private servicio: GifsServiceService) { }

  ngOnInit(): void {
  }

  historial = this.servicio.historial;
  }



