import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  CreatePlanAttachmentDTO,
  CreatePlanAttachmentForm,
} from 'src/app/models/plan-attachment.model';
import { LoaderService } from 'src/app/services/loader.service';
import { PlanAttachmentService } from 'src/app/services/plan-attachment.service';
import { ToastService } from 'src/app/services/toast.service';
import {
  CustomFormFieldInput,
  CustomFormFieldInputFile,
  CustomFormFieldInputMonth,
  CustomFormFieldSelect,
  GenericForm,
  GenericFormInterface,
} from 'src/app/utils/GenericForm';
import { enumToArrayOfValues } from 'src/app/utils/GenericUtils';
import { PlanAttachmentEnum } from 'src/app/utils/PlanAttachmentEnum';

@Component({
  selector: 'app-create-plan-attachment-modal',
  templateUrl: './create-plan-attachment-modal.component.html',
  styleUrls: ['./create-plan-attachment-modal.component.scss'],
})
export class CreatePlanAttachmentModalComponent
  implements OnInit, GenericFormInterface
{
  userId: string;
  monthYearS: string;
  planMinDateS: string;
  planMaxDateS: string;

  createPlanAttachmentForm: CreatePlanAttachmentForm;
  planAttachmentEnum: string[] = enumToArrayOfValues(PlanAttachmentEnum);
  genericForm: GenericForm;

  constructor(
    private modalController: ModalController,
    private planAttachmentService: PlanAttachmentService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.createPlanAttachmentForm = {
      monthYear: this.monthYearS,
    };
    this.buildGenericForm();
  }

  buildGenericForm(): void {
    this.genericForm = new GenericForm(this.createPlanAttachmentForm);
    this.genericForm.cssClass = 'plan-attachments-form';
    this.genericForm.customFormFields.push(
      new CustomFormFieldInputMonth(
        'Date',
        'monthYear',
        this.planMinDateS,
        this.planMaxDateS,
        true
      )
    );
    this.genericForm.customFormFields.push(
      new CustomFormFieldSelect('Type', 'type', this.planAttachmentEnum, true)
    );
    this.genericForm.customFormFields.push(
      new CustomFormFieldInput('Name', 'name', 'text')
    );
    this.genericForm.customFormFields.push(
      new CustomFormFieldInputFile('File', 'file', 'application/pdf', true)
    );
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
      this.loaderService.showLoader('Creating plan attachment...');
      const createPlanAttachmentDTO: CreatePlanAttachmentDTO = {
        month: parseInt(this.createPlanAttachmentForm.monthYear.split('-')[1]),
        year: parseInt(this.createPlanAttachmentForm.monthYear.split('-')[0]),
        type: this.createPlanAttachmentForm.type,
        name: this.createPlanAttachmentForm.name,
        user: this.userId,
        file: this.createPlanAttachmentForm.file,
      };
      this.planAttachmentService.create(createPlanAttachmentDTO);
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
