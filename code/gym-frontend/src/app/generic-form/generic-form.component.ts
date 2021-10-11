import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    this.genericFormData.formSubmit.call(this);
  }
}
