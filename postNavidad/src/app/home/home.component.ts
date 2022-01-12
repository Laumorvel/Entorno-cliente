import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLoadServers(id: number) {
    //debemos tener acceso al Router de Angular, para así indicarle nuestra intención de navegar a alguna ruta.
    // complex code that connects to a backend

    // navigation to Servers page
    this.router.navigate(['/servers', id, 'edit'], { queryParams: { allowEdit: '8' }, fragment: 'loading' });
  }

}
