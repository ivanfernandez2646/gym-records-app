import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_ROUTE: string = environment.apiUrl;
  public loggedUser$: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(private httpClient: HttpClient) {}

  async login(user: User): Promise<boolean> {
    const loggedUser = await lastValueFrom(
      this.httpClient.post<User>(`${this.API_ROUTE}/user/login`, user)
    );
    if (loggedUser) {
      this.loggedUser$.next(loggedUser);
      return true;
    }

    return false;
  }
}
