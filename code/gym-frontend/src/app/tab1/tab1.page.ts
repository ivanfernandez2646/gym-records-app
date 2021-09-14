import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { User } from '../models/user.model';
import { ExerciseService } from '../services/exercise.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  exercises$: Observable<Exercise[]>;
  loggedUser: User;

  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.exercises$ = this.exerciseService.getExercises();
    this.userService.loggedUser$.subscribe((user) => (this.loggedUser = user));
  }
}
