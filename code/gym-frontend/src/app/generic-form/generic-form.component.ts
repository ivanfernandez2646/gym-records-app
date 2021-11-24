import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreatePlanAttachmentForm } from '../models/plan-attachment.model';
import { GenericForm } from '../utils/GenericForm';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent implements OnInit {
  @Input()
  genericFormData: GenericForm;

  @ViewChild('form') form: NgForm;

  constructor() {}

  ngOnInit() {}

  formSubmit() {
    this.genericFormData.formSubmit.call(this, this.form);
  }

  transformToNumber($event: any) {
    if ($event.target.value !== '') {
      this.genericFormData.modelData[$event.target.name] =
        $event.target.value * 1;
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      (this.genericFormData.modelData as CreatePlanAttachmentForm).file =
        target.files[0];
    }
  }
}
