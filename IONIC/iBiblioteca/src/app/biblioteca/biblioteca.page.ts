import { Component, OnInit } from '@angular/core';
import { Doc, Welcome } from '../interfaces/Foundation';
import { OpenLibraryService } from '../open-library.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  constructor(private openLibraryService: OpenLibraryService) {}

  ngOnInit() {
    this.getLibros();
  }

  libros: Doc[];

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
  }
}
