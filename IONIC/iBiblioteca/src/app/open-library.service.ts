import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doc, Welcome } from './interfaces/Foundation';

@Injectable({
  providedIn: 'root',
})
export class OpenLibraryService {
  constructor(private http: HttpClient) {}

  private url_base: string = 'http://openlibrary.org/search.json?title=sun';//Encontrar forma de conseguir un json con la info de los libros

  //PARÁMETROS PARA RECIBIR SOLO 10 LIBROS
  private params = new HttpParams()
  .set('limit','10');


  buscaLibros(): Observable<Welcome> {
    return this.http.get<Welcome>(this.url_base,{params: this.params});
  }


}
