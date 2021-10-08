import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  AlertController,
  IonContent,
  IonItem,
  IonList,
  ModalController,
} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { Mark } from 'src/app/models/mark.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MarkService } from 'src/app/services/mark.service';
import { ToastService } from 'src/app/services/toast.service';
import { CRUDAction } from 'src/app/utils/GenericUtils';

@Component({
  selector: 'app-marks-exercise-modal',
  templateUrl: './marks-exercise-modal.component.html',
  styleUrls: ['./marks-exercise-modal.component.scss'],
})
export class MarksExerciseModalComponent implements OnInit {
  userId: string;
  exercise: Exercise;

  marks$: Observable<Mark[]>;
  isLoading$: Observable<boolean>;
  marksActionSubscription: Subscription;
  mark: Mark = {};

  @ViewChild('listWrapper', { static: false }) listWrapper: IonContent;
  @ViewChild('listMarks') listMarks: IonList;
  @ViewChild('form') form: NgForm;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private markService: MarkService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.mark.user = this.userId;
    this.mark.exercise = this.exercise._id;
    this.marks$ = this.markService.getMarksObservableFiltered(
      this.exercise._id
    );
    this.isLoading$ = this.loaderService.isLoading$;
    this.loaderService.showLoader('Loading marks...').then(() => {
      this.markService.loadMarks(this.userId, this.exercise._id);
      this.marks$.subscribe(() => {
        this.loaderService.hideLoader();
      });
    });
    this.marksActionSubscription = this.markService.marksAction$.subscribe(
      (a) => {
        switch (a) {
          case CRUDAction.CREATE:
            this.toastService.showToast('Mark created successfully');
            this.mark = { exercise: this.exercise._id, user: this.userId };
            this.form.resetForm(this.mark);
            setTimeout(() => this.listWrapper.scrollToBottom(), 500);
            break;
          case CRUDAction.DELETE:
            this.toastService.showToast('Mark deleted successfully');
            this.mark = { exercise: this.exercise._id, user: this.userId };
            this.form.resetForm(this.mark);
            break;
        }
      }
    );
  }

  formSubmit(): void {
    if (this.form.valid) {
      this.loaderService.showLoader('Saving mark...');
      this.markService.create(this.mark);
    } else {
      this.toastService.showToast(
        'Check all required fields',
        undefined,
        'warning'
      );
    }
  }

  dismiss(): void {
    this.markService.setMarksActionUndefined();
    this.marksActionSubscription.unsubscribe();
    this.modalController.dismiss();
  }

  async deleteMark($event: MouseEvent, mark: Mark): Promise<void> {
    if ($event) {
      $event.stopPropagation();
    }
    const alert = await this.alertController.create({
      header: 'Delete mark',
      message: `You're going to delete the mark. Are you sure?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.listMarks.closeSlidingItems();
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.loaderService.showLoader('Deleting mark...');
            this.markService.delete(mark._id, this.exercise._id);
          },
        },
      ],
    });

    await alert.present();
  }

  async showNote($event: any, notes: string): Promise<void> {
    const selectedMarkElement: IonItem = $event.currentTarget as IonItem;
    selectedMarkElement.color = 'selectMark';
    const alert = await this.alertController.create({
      header: 'Notes',
      message: `${notes}`,
    });
    await alert.present();
    await alert.onDidDismiss();
    selectedMarkElement.color = undefined;
  }
}
