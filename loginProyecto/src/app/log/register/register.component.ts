import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public UsersService: UsersService) { }

  ngOnInit(): void {
  }

    email!: string;
    password!: string;
    confirmPassword!: string;

    register() {
      const user = { email: this.email, password: this.password };
      this.UsersService.register(user).subscribe(data => {
        this.UsersService.setToken(data.token);
    });
    }
  }


