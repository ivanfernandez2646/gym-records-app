import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = {};

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const isAuthenticated = this.userService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigateByUrl('tabs');
    }
  }

  formSubmit() {
    this.userService.login(this.user).then((isLogged: boolean) => {
      if (isLogged) {
        this.router.navigateByUrl('tabs');
      }
    });
  }
}
