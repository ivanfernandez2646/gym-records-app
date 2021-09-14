import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  loggedUser: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.loggedUser$.subscribe((user) => (this.loggedUser = user));
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('login');
  }
}
