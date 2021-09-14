import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../models/exercise.model';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private apiRoute = environment.apiUrl;
  private exercises: Exercise[];

  public exercises$: ReplaySubject<Exercise[]> = new ReplaySubject(1);

  constructor(private httpClient: HttpClient) {}

  loadExercises(): void {
    this.httpClient
      .get<Exercise[]>(`${this.apiRoute}/exercise`)
      .subscribe((res) => {
        this.exercises = res;
        this.exercises$.next(this.exercises);
      });
  }

  create(exercise: Exercise): Observable<Exercise> {
    return this.httpClient.post<Exercise>(
      `${this.apiRoute}/exercise`,
      exercise
    );
  }
}
