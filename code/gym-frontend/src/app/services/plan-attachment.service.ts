import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanAttachment } from '../models/plan-attachment.model';
import { CRUDAction } from '../utils/GenericUtils';

@Injectable({
  providedIn: 'root',
})
export class PlanAttachmentService {
  private apiRoute = environment.apiUrl;
  private planAttachments: PlanAttachment[];

  public planAttachments$: ReplaySubject<PlanAttachment[]> = new ReplaySubject(
    1
  );
  public planAttachmentsAction$: ReplaySubject<CRUDAction> = new ReplaySubject(
    1
  );

  constructor(private httpClient: HttpClient) {}

  loadPlanAttachments(userId: string, month: number, year: number): void {
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('month', month);
    params = params.append('year', year);
    console.log(params);

    this.httpClient
      .get<PlanAttachment[]>(`${this.apiRoute}/plan-attachment`, { params })
      .subscribe((res) => {
        this.planAttachments = res;
        this.planAttachments$.next(this.planAttachments);
      });
  }

  create(planAttachment: PlanAttachment): void {
    this.httpClient
      .post<PlanAttachment>(`${this.apiRoute}/plan-attachment`, planAttachment)
      .subscribe((res) => {
        this.planAttachments.push(res);
        this.planAttachments$.next(this.planAttachments);
        this.planAttachmentsAction$.next(CRUDAction.CREATE);
      });
  }

  delete(id: string): void {
    this.httpClient
      .delete<boolean>(`${this.apiRoute}/plan-attachment/${id}`)
      .subscribe(() => {
        const index = this.planAttachments.findIndex((pA) => pA._id === id);
        this.planAttachments.splice(index, 1);
        this.planAttachments$.next(this.planAttachments);
        this.planAttachmentsAction$.next(CRUDAction.DELETE);
      });
  }
}
