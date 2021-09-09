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
    this.userService.loggedUser$.subscribe((res) => {
      this.router.navigateByUrl('tabs/tab1', { state: { loggedUser: res } });
    });
  }

  formSubmit() {
    this.userService.login(this.user).then((res) => console.log(res));
  }
}
