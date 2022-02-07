import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doc, Welcome } from '../interfaces/Foundation';
import { OpenLibraryService } from '../open-library.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  constructor(private openLibraryService: OpenLibraryService, private router: Router) {}

  ngOnInit() {
    /*this.getLibros();*/
    //Ya no es necesario cargar los libros en cuanto entramos
  }

  libros: Doc[]=[];
  search: string="";

  getLibros(search: string) {
    this.search = search;
    this.openLibraryService.buscaLibros(this.search).subscribe({
      next: resp => {
        console.log(resp);
        this.libros = resp.docs;
      },
      error: e => {
        console.log(e);
      },
    });
  }

  onClick(isbn: string){
    this.router.navigate(['/detalle',isbn]);
  }

  /*
  getLibros() {
    this.openLibraryService.buscaLibros().subscribe({
      next: (resp) => {
        console.log("ok");
        console.log(resp); //devuelve tipo Welcome con un array de Doc[] (docs).

        this.libros = resp.docs;

      },
      error: (e) => {
        console.log(e);
        console.log("NO ok");
      }
    });
  }*/
}
