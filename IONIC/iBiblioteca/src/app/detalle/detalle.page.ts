import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenLibraryService } from '../open-library.service';
import { Doc } from '../interfaces/Foundation';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  ver: boolean = false;
  libro: Doc;
  estrella:string = 'star-outline';

  constructor(private openLibraryService: OpenLibraryService,
    private activeRoute: ActivatedRoute,
    private storage: StorageService) { }

    librosFavoritos: Doc[] = [];

  ngOnInit() {
    this.getLibro();  //para realizar la llamada en cuanto se cargue la página
    this.storage.cargaFavoritos().then(
      resp => {
        this.librosFavoritos = resp;
      }
    )
  }

  getLibro(){
    this.openLibraryService.buscaLibro(this.activeRoute.snapshot.params["isbn"])
    .subscribe({
      next: data =>{
        this.libro = data.docs[0];
        this.ver = true;
        this.getNombreEstrella();
        console.log(this.storage.favoritos)
      },
      error: e =>{
        console.log(e);
      }
    })
  }

  cambiaIcono(){
    if(this.estrella == 'star-outline'){
      this.estrella = 'star';
      this.storage.set(this.libro.title, this.libro);
      console.log(this.storage.favoritos)
    }else{
      this.estrella = 'star-outline';
      this.storage.remove(this.libro.title, this.libro);
      console.log(this.storage.favoritos);
    }
  }

  getNombreEstrella(){
    console.log(this.storage.favoritos);
    this.storage.getItem(this.libro.title).then(
      resp =>{
        if(resp){
          this.estrella = 'star';
        }else{
          this.estrella = 'star-outline';
        }
      }

    )
  }

}
