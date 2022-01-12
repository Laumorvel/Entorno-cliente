import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFInterface } from './interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsServiceService {

  constructor(private httpClient:HttpClient) { }

  //VARIABLES PARA LOS PARÁMETROS DE LA PETCIÓN
  historial:string[]=[];
  api_key:string = "FU76hNHqnT8VIrkqk3Yo7JNVnsDz9Ipb";
  url_base: string= "https://api.giphy.com/v1/gifs/search";
  resultado: Gif[] = [];

  getHistorialMetodo(){
    return this.historial;
  }

  buscarGifs(busqueda:string){

    if(!this.historial.includes(busqueda)){
      this.historial.length < 10 ? this.historial.unshift(busqueda) : (this.historial.splice(-1,1), this.historial.unshift(busqueda));
      localStorage.setItem('historial', JSON.stringify(this.historial));
      //localStorage.setItem('datos', JSON.stringify(miObjeto));
    }

    //PARÁMETROS PARA LA PETICIÓN
    const params = new HttpParams()
    .set('api_key', this.api_key)
    .set('limit', '10')
    .set('q', busqueda );

    //Se pega en ThunderClient la url de la petición (que lo cogimos)
    //Debe ser del tipo de la interfaz creada, en la cual hemos pegado el código de la página quicktype.
    this.httpClient.get<SearchGIFInterface>(this.url_base, {params: params}).subscribe(
      (resp) =>{
        console.log(resp);
        this.resultado = resp.data;
      })
    }
}
