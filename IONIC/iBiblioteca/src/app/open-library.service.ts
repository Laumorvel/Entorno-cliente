import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doc, Welcome } from './interfaces/Foundation';

@Injectable({
  providedIn: 'root',
})
export class OpenLibraryService {
  constructor(private http: HttpClient) {}

  private url_base: string = 'http://openlibrary.org/search.json'; //Encontrar forma de conseguir un json con la info de los libros. Le quito "?title=sun" para que se busque el indicado por el usuario
  private url_detalle_libro: string =
    'http://openlibrary.org/search.json?isbn='; //Para mostrar el detalle de los libros con el isbn que le paso

  //PARÁMETROS PARA RECIBIR SOLO 10 LIBROS

  buscaLibros(search: string): Observable<Welcome> {
    const params = new HttpParams() //He tenido que meterlo en el método para poder incluir la búsqueda en los parámetros y cambiarlo a constante en vez de privado
      .set('title', search)
      .set('limit', '10');
    return this.http.get<Welcome>(this.url_base, { params: params });
  }

  buscaLibro(search: string){//para la página de detalle
    return this.http.get<Welcome>(`${this.url_detalle_libro}${search}`);
  }
}
