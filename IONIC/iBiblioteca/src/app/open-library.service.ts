import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from './interfaces/libro';

@Injectable({
  providedIn: 'root',
})
export class OpenLibraryService {
  constructor(private http: HttpClient) {}

  private url_base: string = 'https://openlibrary.org/books';

  //PARÁMETROS PARA RECIBIR SOLO 10 LIBROS
  private params = new HttpParams()
  .set('limit','10');


  buscaLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.url_base,{params: this.params});
  }
}
