import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mark } from '../models/mark.model';
import { CRUDAction } from '../utils/GenericUtils';

@Injectable({
  providedIn: 'root',
})
export class MarkService {
  private apiRoute = environment.apiUrl;
  private marksMap: Map<string, Mark[]> = new Map();

  public marksMap$: Map<string, ReplaySubject<Mark[]>> = new Map();
  public marksAction$: ReplaySubject<CRUDAction> = new ReplaySubject(1);

  constructor(private httpClient: HttpClient) {}

  loadMarks(userId: string, exerciseId: string): void {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('exerciseId', exerciseId);

    this.httpClient
      .get<Mark[]>(`${this.apiRoute}/mark`, { params })
      .subscribe((res) => {
        this.marksMap.set(exerciseId, res);
        const replaySubjectMark = this.marksMap$.get(exerciseId);
        replaySubjectMark.next(res);
      });
  }

  create(mark: Mark): void {
    this.httpClient
      .post<Mark>(`${this.apiRoute}/mark`, mark)
      .subscribe((res) => {
        const exerciseId = res.exercise.toString();
        const currentMarksArray = this.marksMap.get(exerciseId) || [];
        const newArrayMarks = [...currentMarksArray, res];
        this.marksMap.set(exerciseId, newArrayMarks);
        this.marksMap$.get(exerciseId).next(newArrayMarks);
        this.marksAction$.next(CRUDAction.CREATE);
      });
  }

  delete(markId: string, exerciseId: string): void {
    this.httpClient
      .delete<boolean>(`${this.apiRoute}/mark/${markId}`)
      .subscribe(() => {
        const marks = this.marksMap.get(exerciseId);
        const index = marks.findIndex((m) => m._id === markId);
        marks.splice(index, 1);
        this.marksMap$.get(exerciseId).next(marks);
        this.marksAction$.next(CRUDAction.DELETE);
      });
  }

  setMarkAsLatestUsed(markId: string, exerciseId: string): void {
    this.httpClient
      .put<Mark[]>(`${this.apiRoute}/mark/latest-used/${markId}`, undefined)
      .subscribe((res) => {
        const marks = this.marksMap.get(exerciseId);

        res.forEach((mark) => {
          const index = marks.findIndex((m) => m._id === mark._id);
          marks.splice(index, 1, mark);
        });

        this.marksMap$.get(exerciseId).next(marks);
        this.marksAction$.next(CRUDAction.UPDATE);
      });
  }

  updateNotesForMark(markId: string, exerciseId: string, notes: string): void {
    this.httpClient
      .put<Mark>(
        `${this.apiRoute}/mark/update-notes/${markId}?notes=${notes}`,
        undefined
      )
      .subscribe((res) => {
        const marks = this.marksMap.get(exerciseId);
        marks.splice(
          marks.findIndex((m) => m._id === markId),
          1,
          res
        );
        this.marksMap$.get(exerciseId).next(marks);
        this.marksAction$.next(CRUDAction.UPDATE);
      });
  }

  //Helpers
  getMarksObservableFiltered(exerciseId: string): ReplaySubject<Mark[]> {
    if (!this.marksMap$.has(exerciseId)) {
      this.marksMap.set(exerciseId, []);
      this.marksMap$.set(exerciseId, new ReplaySubject(1));
    }
    return this.marksMap$.get(exerciseId);
  }

  setMarksActionUndefined(): void {
    this.marksAction$.next(undefined);
  }
}
