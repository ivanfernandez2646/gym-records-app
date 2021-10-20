import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, IonList } from '@ionic/angular';
import { Observable } from 'rxjs';
import { PlanAttachment } from '../models/plan-attachment.model';
import { User } from '../models/user.model';
import { LoaderService } from '../services/loader.service';
import { PlanAttachmentService } from '../services/plan-attachment.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { CRUDAction } from '../utils/GenericUtils';

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

  @ViewChild('listWrapper', { static: false }) listWrapper: IonContent;
  @ViewChild('listPlanAttachments') planAttachmentsList: IonList;

  constructor(
    private planAttachmentService: PlanAttachmentService,
    private userService: UserService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private alertController: AlertController
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
    this.planAttachmentService.planAttachmentsAction$.subscribe((a) => {
      switch (a) {
        case CRUDAction.CREATE:
          this.toastService.showToast('Plan attachment created successfully');
          setTimeout(() => this.listWrapper.scrollToBottom(), 500);
          break;
        case CRUDAction.DELETE:
          this.toastService.showToast('Plan attachment deleted successfully');
          break;
      }
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

  async deletePlanAttachment(
    $event: MouseEvent,
    planAttachment: PlanAttachment
  ): Promise<void> {
    if ($event) {
      $event.stopPropagation();
    }
    const alert = await this.alertController.create({
      header: 'Delete plan attachment',
      message: `You're going to delete ${planAttachment.name}. Are you sure?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.planAttachmentsList.closeSlidingItems();
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.loaderService.showLoader('Deleting plan attachment...');
            this.planAttachmentService.delete(
              planAttachment._id,
              planAttachment.path
            );
          },
        },
      ],
    });

    await alert.present();
  }
}
