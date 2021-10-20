import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanAttachment } from '../models/plan-attachment.model';
import { User } from '../models/user.model';
import { LoaderService } from '../services/loader.service';
import { PlanAttachmentService } from '../services/plan-attachment.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab-plan',
  templateUrl: './tab-plan.page.html',
  styleUrls: ['./tab-plan.page.scss'],
})
export class TabPlanPage implements OnInit {
  planAttachments$: Observable<PlanAttachment[]>;
  isLoading$: Observable<boolean>;
  loggedUser: User;

  currDate: Date;
  minDate: Date;
  maxDate: Date;
  showPdf: boolean;
  pdfData: Uint8Array;

  constructor(
    private planAttachmentService: PlanAttachmentService,
    private userService: UserService,
    private loaderService: LoaderService
  ) {
    this.currDate = new Date(Date.now());
    this.minDate = new Date(
      this.currDate.getFullYear() - 5,
      this.currDate.getMonth()
    );
    this.maxDate = new Date(
      this.currDate.getFullYear() + 5,
      this.currDate.getMonth()
    );
  }

  ngOnInit() {
    this.userService.loggedUser$.subscribe((res) => (this.loggedUser = res));
    this.planAttachments$ = this.planAttachmentService.planAttachments$;
    this.isLoading$ = this.loaderService.isLoading$;
    this.loaderService.showLoader('Loading plans...').then(() => {
      this.planAttachmentService.loadPlanAttachments(
        this.loggedUser._id,
        this.currDate.getMonth() + 1,
        this.currDate.getFullYear()
      );
      this.planAttachments$.subscribe(() => {
        this.loaderService.hideLoader();
      });
    });
  }

  toggleShowPdf(path: string = undefined): void {
    if (!this.showPdf && path) {
      this.planAttachmentService.downloadFile(path).subscribe((res) => {
        console.log(res.data);
        this.pdfData = res.data;
        this.showPdf = !this.showPdf;
      });
    } else {
      this.showPdf = false;
    }
  }
}
