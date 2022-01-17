import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public UsersService: UsersService) { }

  ngOnInit(): void {
    this.getUserLogged();
  }

  getUserLogged() {
    this.UsersService.getUser().subscribe(user => {
      console.log(user);
    });
  }

}
