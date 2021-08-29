import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../models/exercise.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  apiRoute = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getExercises(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(`${this.apiRoute}/exercise`);
  }
}
