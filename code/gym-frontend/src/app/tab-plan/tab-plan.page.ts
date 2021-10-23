import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonContent,
  IonList,
  ModalController,
} from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { PlanAttachment } from '../models/plan-attachment.model';
import { User } from '../models/user.model';
import { LoaderService } from '../services/loader.service';
import { PlanAttachmentService } from '../services/plan-attachment.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { CRUDAction } from '../utils/GenericUtils';
import { PlanAttachmentEnum } from '../utils/PlanAttachmentEnum';
import { CreatePlanAttachmentModalComponent } from './modals/create-plan-attachment-modal/create-plan-attachment-modal.component';

@Component({
  selector: 'app-tab-plan',
  templateUrl: './tab-plan.page.html',
  styleUrls: ['./tab-plan.page.scss'],
})
export class TabPlanPage implements OnInit {
  planAttachments$: Observable<PlanAttachment[]>;
  isLoading$: Observable<boolean>;
  loggedUser: User;
  planNutritional: PlanAttachmentEnum = PlanAttachmentEnum.NUTRITIONAL;

  selectedDate: Date;
  minDate: Date;
  maxDate: Date;
  showPdf: boolean;
  pdfData: Uint8Array;
  currZoom: number;

  @ViewChild('listWrapper', { static: false }) listWrapper: IonContent;
  @ViewChild('listPlanAttachments') planAttachmentsList: IonList;

  constructor(
    private planAttachmentService: PlanAttachmentService,
    private modalController: ModalController,
    private userService: UserService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private alertController: AlertController
  ) {
    this.selectedDate = new Date(Date.now());
    this.minDate = new Date(
      this.selectedDate.getFullYear() - 5,
      this.selectedDate.getMonth()
    );
    this.maxDate = new Date(
      this.selectedDate.getFullYear() + 5,
      this.selectedDate.getMonth()
    );
    this.currZoom = 1;
  }

  ngOnInit() {
    this.userService.loggedUser$.subscribe((res) => (this.loggedUser = res));
    this.planAttachments$ = this.planAttachmentService.planAttachments$;
    this.isLoading$ = this.loaderService.isLoading$;
    this.loadPlanAttachments(this.selectedDate);
    this.planAttachmentService.planAttachmentsAction$.subscribe((a) => {
      switch (a) {
        case CRUDAction.CREATE:
          this.toastService.showToast('Plan attachment created successfully');
          this.loaderService.hideLoader();
          setTimeout(() => this.listWrapper.scrollToBottom(), 500);
          break;
        case CRUDAction.DELETE:
          this.toastService.showToast('Plan attachment deleted successfully');
          this.loaderService.hideLoader();
          break;
      }
    });
  }

  loadPlanAttachments(date: Date): void {
    this.loaderService.showLoader('Loading plans...').then(() => {
      this.planAttachmentService.loadPlanAttachments(
        this.loggedUser._id,
        date.getMonth() + 1,
        date.getFullYear()
      );
      this.planAttachments$.pipe(take(1)).subscribe(() => {
        this.loaderService.hideLoader();
      });
    });
  }

  changeSelectedDate($event: any): void {
    this.loadPlanAttachments(new Date($event.detail.value));
  }

  toggleShowPdf(path: string = undefined): void {
    if (!this.showPdf && path) {
      this.loaderService.showLoader('Loading...');
      this.planAttachmentService.downloadFile(path).subscribe((res) => {
        this.loaderService.hideLoader();
        this.pdfData = res.data;
        this.showPdf = !this.showPdf;
      });
    } else {
      this.showPdf = false;
      this.currZoom = 1;
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

  async createPlanAttachmentModal() {
    const modal = await this.modalController.create({
      component: CreatePlanAttachmentModalComponent,
      componentProps: {
        userId: this.loggedUser._id,
        monthYearS: this.selectedDate.toISOString().slice(0, 7),
        planMinDateS: this.minDate.toISOString().slice(0, 7),
        planMaxDateS: this.maxDate.toISOString().slice(0, 7),
      },
    });
    await modal.present();
  }

  doRefresh($event: any): void {
    this.planAttachmentService.loadPlanAttachments(
      this.loggedUser._id,
      this.selectedDate.getMonth() + 1,
      this.selectedDate.getFullYear()
    );
    this.planAttachments$.pipe(take(1)).subscribe(() => {
      $event.target.complete();
    });
  }

  incrementZoom(zoom: number): void {
    const tmpZoom = (this.currZoom += zoom);
    if (tmpZoom < 1) {
      this.currZoom = 1;
    } else {
      this.currZoom += zoom;
    }
  }
}
