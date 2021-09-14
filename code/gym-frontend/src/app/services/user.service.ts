import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_ROUTE: string = environment.apiUrl;
  public loggedUser$: ReplaySubject<User> = new ReplaySubject<User>(1);
  private isUserAuthenticated: boolean;

  constructor(private httpClient: HttpClient) {}

  async login(user: User): Promise<boolean> {
    const loggedUser = await lastValueFrom(
      this.httpClient.post<User>(`${this.API_ROUTE}/user/login`, user)
    );
    if (loggedUser) {
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      this.loggedUser$.next(loggedUser);
      this.isUserAuthenticated = true;
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.loggedUser$.next(undefined);
    this.isUserAuthenticated = false;
  }

  isAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

  setLoggedUser(): void {
    const user: User = JSON.parse(localStorage.getItem('loggedUser'));
    if (user) {
      this.loggedUser$.next(user);
      this.isUserAuthenticated = true;
    } else {
      this.isUserAuthenticated = false;
    }
  }
}
