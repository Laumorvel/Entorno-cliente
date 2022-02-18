import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doc} from '../interfaces/Foundation';
import { OpenLibraryService } from '../open-library.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  encodedData: any;
  scannedBarCode: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(
    private openLibraryService: OpenLibraryService,
    private router: Router,
    private scanner: BarcodeScanner,
    private storage: StorageService
  ) {
    this.encodedData = "Programming isn't about what you know";

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true,
    };
  }

  ngOnInit() {
    /*this.getLibros();*/
    //Ya no es necesario cargar los libros en cuanto entramos
  }

  libros: Doc[] = [];
  search: string = '';
  favoritos: Doc[] = [];
  fav: boolean = false;
  lib: boolean = false;

  getLibros(search: string) {
    this.fav = false;
    this.search = search;
    this.openLibraryService.buscaLibros(this.search).subscribe({
      next: (resp) => {
        this.libros = resp.docs;
        this.lib = true;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  onClick(isbn: string) {
    this.router.navigate(['/detalle', isbn]); // , { relativeTo: this.route , queryParamsHandling: 'preserve'});
  }


  scanBRcode() {
    this.scanner
      .scan()
      .then((res) => {
        this.scannedBarCode = res;
        this.router.navigate(['/detalle',res.text]);
      })
      .catch((err) => {
        alert(err);
      });
  }

  cargaFavoritos(){
    this.lib = false;
    this.fav = true;
    this.storage.cargaFavoritos().then(
      resp =>{
        this.favoritos = resp;
      }
    )
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
