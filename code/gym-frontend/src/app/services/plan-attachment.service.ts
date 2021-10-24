import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CreatePlanAttachmentDTO,
  DownloadedFileDTO,
  PlanAttachment,
} from '../models/plan-attachment.model';
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

    this.httpClient
      .get<PlanAttachment[]>(`${this.apiRoute}/plan-attachment`, { params })
      .subscribe((res) => {
        this.planAttachments = res;
        this.planAttachments$.next(this.planAttachments);
      });
  }

  create(createPlanAttachmentDTO: CreatePlanAttachmentDTO): void {
    const formData = new FormData();
    formData.append('month', createPlanAttachmentDTO.month.toString());
    formData.append('year', createPlanAttachmentDTO.year.toString());
    formData.append('type', createPlanAttachmentDTO.type);

    if (createPlanAttachmentDTO.name) {
      formData.append('name', createPlanAttachmentDTO.name);
    }

    formData.append('user', createPlanAttachmentDTO.user);
    formData.append('file', createPlanAttachmentDTO.file);

    this.httpClient
      .post<PlanAttachment>(`${this.apiRoute}/plan-attachment`, formData)
      .subscribe((res) => {
        this.planAttachments.push(res);
        this.planAttachments$.next(this.planAttachments);
        this.planAttachmentsAction$.next(CRUDAction.CREATE);
      });
  }

  downloadFile(path: string): Observable<DownloadedFileDTO> {
    let params = new HttpParams();
    params = params.append('path', path);
    return this.httpClient.get<DownloadedFileDTO>(
      `${this.apiRoute}/plan-attachment/download`,
      {
        params,
      }
    );
  }

  delete(id: string, path: string): void {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('path', path);

    this.httpClient
      .delete<boolean>(`${this.apiRoute}/plan-attachment`, { params })
      .subscribe(() => {
        const index = this.planAttachments.findIndex((pA) => pA._id === id);
        this.planAttachments.splice(index, 1);
        this.planAttachments$.next(this.planAttachments);
        this.planAttachmentsAction$.next(CRUDAction.DELETE);
      });
  }
}
