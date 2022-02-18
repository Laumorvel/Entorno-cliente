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
  librosFavoritos: Doc[] = [];

  constructor(private openLibraryService: OpenLibraryService,
              private activeRoute: ActivatedRoute,
              private storage: StorageService) { }

  ngOnInit() {
    this.getLibro();  //para realizar la llamada en cuanto se cargue la página

  }

  getLibro(){
    this.openLibraryService.buscaLibro(this.activeRoute.snapshot.params["isbn"])
    .subscribe({
      next: data =>{
        this.libro = data.docs[0];
        this.ver = true;
        this.getNombreEstrella();
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
    }else{
      this.estrella = 'star-outline';
      this.storage.remove(this.libro.title);
    }
  }

  getNombreEstrella(){
    console.log(this.storage);
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
