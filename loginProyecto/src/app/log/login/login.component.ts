import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(public UsersService: UsersService, public router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const user = {email: this.email, password: this.password};
    this.UsersService.login(user).subscribe( data => {
      this.UsersService.setToken(data.token);
      this.router.navigateByUrl('/');
    },
      error => {
        console.log(error);
      });
  }

}
