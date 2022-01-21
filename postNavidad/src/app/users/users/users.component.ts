import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/servers/interfaces/user.interface';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService) { }

   users:User[]=[];

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      (resp) => {
        console.log(resp);
        this.users = resp;
      }
    )
  }


}
