import { Component, OnInit } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { OpenLibraryService } from '../open-library.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  constructor(private openLibraryService: OpenLibraryService) {}

  ngOnInit() {}

  libros: Libro[] = [];

  getLibros() {
    this.openLibraryService.buscaLibros().subscribe({
      next: (resp) => {
        console.log(resp);
        this.libros = resp;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
