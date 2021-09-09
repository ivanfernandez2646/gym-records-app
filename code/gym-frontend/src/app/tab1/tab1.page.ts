import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { User } from '../models/user.model';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  exercises$: Observable<Exercise[]>;
  loggedUser: User;

  constructor(
    private router: Router,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.exercises$ = this.exerciseService.getExercises();
    this.loggedUser =
      this.router.getCurrentNavigation().extras.state.loggedUser;
  }
}
