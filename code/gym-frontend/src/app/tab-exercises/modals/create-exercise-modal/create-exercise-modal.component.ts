import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { GenericForm, GenericFormInterface } from 'src/app/utils/GenericForm';
import { enumToArrayOfValues } from 'src/app/utils/GenericUtils';
import { MuscleEnum } from 'src/app/utils/MuscleEnum';

@Component({
  selector: 'app-create-exercise-modal',
  templateUrl: './create-exercise-modal.component.html',
  styleUrls: ['./create-exercise-modal.component.scss'],
})
export class CreateExerciseModalComponent
  implements OnInit, GenericFormInterface
{
  exercise: Exercise;
  isUpdate: boolean;
  muscleEnum: string[] = enumToArrayOfValues(MuscleEnum);
  genericForm: GenericForm;

  constructor(
    private modalController: ModalController,
    private exerciseService: ExerciseService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (!this.isUpdate) {
      this.exercise = { isMonitorized: false };
    }
    this.buildGenericForm();
  }

  buildGenericForm(): void {
    this.genericForm = new GenericForm(this.exercise);
    this.genericForm.customFormFields.push({
      label: 'Name',
      component: 'input',
      type: 'text',
      modelName: 'name',
      isRequired: true,
    });
    this.genericForm.customFormFields.push({
      label: 'Description',
      component: 'input',
      type: 'text',
      modelName: 'description',
    });
    this.genericForm.customFormFields.push({
      label: 'Muscle',
      component: 'select',
      modelName: 'muscle',
      data: this.muscleEnum,
      isRequired: true,
    });
    this.genericForm.customFormFields.push({
      label: 'Is monitorized?',
      component: 'toggle',
      modelName: 'isMonitorized',
      color: 'tertiary',
      isRequired: true,
    });
    this.genericForm.customButtons.push({
      label: 'Save',
      type: 'submit',
      expand: 'block',
      color: 'secondary',
    });
    this.genericForm.customButtons.push({
      label: 'Back',
      expand: 'block',
      callback: () => this.dismiss(),
    });
    this.genericForm.formSubmit = (ngFormReturned: NgForm) =>
      this.formSubmit(ngFormReturned);
  }

  formSubmit(ngFormReturned: NgForm): void {
    if (ngFormReturned.valid) {
      if (this.isUpdate) {
        this.loaderService.showLoader('Updating exercise...');
        this.exerciseService.update(this.exercise._id, this.exercise);
      } else {
        this.loaderService.showLoader('Creating exercise...');
        this.exerciseService.create(this.exercise);
      }
      this.dismiss(true);
    } else {
      this.toastService.showToast(
        'Check all required fields',
        undefined,
        'warning'
      );
    }
  }

  dismiss(isActionPerformed: boolean = false): void {
    this.modalController.dismiss(isActionPerformed);
  }
}
