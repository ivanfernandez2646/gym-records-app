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
import { GenericForm, GenericFormInterface } from 'src/app/utils/GenericForm';
import { CRUDAction } from 'src/app/utils/GenericUtils';

@Component({
  selector: 'app-marks-exercise-modal',
  templateUrl: './marks-exercise-modal.component.html',
  styleUrls: ['./marks-exercise-modal.component.scss'],
})
export class MarksExerciseModalComponent
  implements OnInit, GenericFormInterface
{
  userId: string;
  exercise: Exercise;

  marks$: Observable<Mark[]>;
  isLoading$: Observable<boolean>;
  marksActionSubscription: Subscription;
  mark: Mark;
  genericForm: GenericForm;
  ngFormReturned: NgForm;

  @ViewChild('listWrapper', { static: false }) listWrapper: IonContent;
  @ViewChild('listMarks') listMarks: IonList;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private markService: MarkService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.mark = { user: this.userId, exercise: this.exercise._id };
    this.buildGenericForm();
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
            this.ngFormReturned.resetForm();
            setTimeout(() => this.listWrapper.scrollToBottom(), 500);
            break;
          case CRUDAction.DELETE:
            this.toastService.showToast('Mark deleted successfully');
            this.ngFormReturned.resetForm();
            break;
          case CRUDAction.UPDATE:
            this.toastService.showToast('Mark updated successfully');
            break;
        }
      }
    );
  }

  buildGenericForm(): void {
    this.genericForm = new GenericForm(this.mark);
    this.genericForm.class = 'marks-form';
    this.genericForm.customFormFields.push({
      label: 'Weight (kg)',
      component: 'input',
      type: 'number',
      modelName: 'weight',
      isRequired: true,
      class: 'ion-text-right',
    });
    this.genericForm.customFormFields.push({
      label: 'Serie',
      component: 'input',
      type: 'number',
      modelName: 'serie',
      isRequired: true,
      class: 'ion-text-right',
    });
    this.genericForm.customFormFields.push({
      label: 'Reps',
      component: 'input',
      type: 'number',
      modelName: 'reps',
      isRequired: true,
      class: 'ion-text-right',
    });
    this.genericForm.customFormFields.push({
      label: 'RIR',
      component: 'input',
      type: 'number',
      modelName: 'rir',
      isRequired: true,
      class: 'ion-text-right',
    });
    this.genericForm.customFormFields.push({
      label: 'Notes',
      component: 'input',
      type: 'text',
      modelName: 'notes',
      class: 'ion-text-right',
    });
    this.genericForm.customButtons.push({
      label: 'Add',
      type: 'submit',
      expand: 'block',
      color: 'secondary',
    });
    this.genericForm.formSubmit = (ngFormReturned: NgForm) =>
      this.formSubmit(ngFormReturned);
  }

  formSubmit(ngFormReturned?: NgForm): void {
    this.ngFormReturned = ngFormReturned;
    if (this.ngFormReturned.valid) {
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

  async setMarkAsLatestUsed($event: MouseEvent, mark: Mark): Promise<void> {
    if ($event) {
      $event.stopPropagation();
    }
    const alert = await this.alertController.create({
      header: 'Set mark as latest used',
      message: `You're going to set the mark selected as the lastest used. Are you sure?`,
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
            this.loaderService.showLoader('Setting mark as latest used...');
            this.markService.setMarkAsLatestUsed(mark._id, this.exercise._id);
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
