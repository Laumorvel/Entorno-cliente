import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit{
  user!: {id: number, name: string};
  constructor(private route: ActivatedRoute) { }

  paramsSubscription!: Subscription;

  ngOnInit(): void {


    //podemos acceder a los datos de la URL y rescatarlos (en inglés, fetch).
    //Hacemos esta operación cuando nuestro componente se inicializa, es decir, en el ngOnInit.
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    //OBSERVABLE
    this.route.params //este 'params' no tiene nada que ver con el 'params' de arriba
    .subscribe(
      (updatedParams) => { //esta función permite que podamos obtener los parámetros que introducimos (los actualiza)
        //De otra forma, una vez instanciado (usado una primera vez) ya no se volvería a actualizar
        this.user.id = updatedParams['id'];
        this.user.name = updatedParams['name'];
      }
      );
    }

    //Hay que hacerlo cuando queramos que nuestros observables se desuscriban.
    //Angular solo lo hace automáticamente con ciertos objetos como params pero no lo hará cuando creemos nuestros propios observables
    ngOnDestroy(): void {
      this.paramsSubscription.unsubscribe();
    }
  }
