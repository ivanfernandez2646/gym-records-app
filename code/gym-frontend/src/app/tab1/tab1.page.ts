import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  exercises$: Observable<Exercise[]>;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exercises$ = this.exerciseService.getExercises();
  }
}
