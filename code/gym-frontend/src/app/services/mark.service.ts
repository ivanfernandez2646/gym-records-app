import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mark } from '../models/mark.model';

@Injectable({
  providedIn: 'root',
})
export class MarkService {
  private apiRoute = environment.apiUrl;
  private marksMap: Map<string, Mark[]> = new Map();

  public marksMap$: Map<string, ReplaySubject<Mark[]>> = new Map();

  constructor(private httpClient: HttpClient) {}

  loadMarks(userId: string, exerciseId: string): void {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('exerciseId', exerciseId);

    this.httpClient
      .get<Mark[]>(`${this.apiRoute}/mark`, { params })
      .subscribe((res) => {
        console.log(params, res);
        const exerciseId = res[0].exercise.toString();
        this.marksMap.set(exerciseId, res);

        const replaySubjectMark = this.marksMap$.get(exerciseId);
        replaySubjectMark.next(res);
      });
  }

  create(mark: Mark): void {
    this.httpClient
      .post<Mark>(`${this.apiRoute}/mark`, mark)
      .subscribe((res) => {
        // this.marks.push(res);
        // this.marks$.next(this.marks);
      });
  }

  //Helpers
  getMarksObservableFiltered(exerciseId: string): ReplaySubject<Mark[]> {
    if (!this.marksMap$.has(exerciseId)) {
      this.marksMap$.set(exerciseId, new ReplaySubject(1));
    }
    return this.marksMap$.get(exerciseId);
  }
}
