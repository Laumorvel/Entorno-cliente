import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenLibraryService } from '../open-library.service';
import { Doc } from '../interfaces/Foundation';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  ver: boolean = false;
  libro: Doc;

  constructor(private openLibraryService: OpenLibraryService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getLibro();  //para realizar la llamada en cuanto se cargue la página
  }

  getLibro(){
    this.openLibraryService.buscaLibro(this.activeRoute.snapshot.params["isbn"])
    .subscribe({
      next: data =>{
        console.log(data)
        this.libro = data.docs[0];
        this.ver = true;
      },
      error: e =>{
        console.log(e);
      }
    })
  }

}
