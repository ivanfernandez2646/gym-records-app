import { NgForm } from '@angular/forms';

export interface GenericFormInterface {
  buildGenericForm(): void;
  formSubmit(ngFormReturned?: NgForm): void;
}

export class GenericForm {
  modelData: any;
  cssClass?: string;
  customFormFields: CustomFormField[] = [];
  customButtons: CustomFormButton[] = [];
  formSubmit: Function;

  constructor(modelData: any) {
    this.modelData = modelData;
  }
}

export class CustomFormField {
  label: string;
  component: 'input' | 'select' | 'toggle';
  modelName: string; // ngModel and name
  callback?: Function;
  isRequired?: boolean;
  cssClass?: string;

  constructor(
    label: string,
    component: 'input' | 'select' | 'toggle',
    modelName: string,
    isRequired?: boolean,
    callback?: Function,
    cssClass?: string
  ) {
    this.label = label;
    this.component = component;
    this.modelName = modelName;
    this.callback = callback;
    this.isRequired = isRequired;
    this.cssClass = cssClass;
  }
}

export class CustomFormFieldInput extends CustomFormField {
  type: string;

  constructor(
    label: string,
    modelName: string,
    type:
      | 'button'
      | 'checkbox'
      | 'file'
      | 'month'
      | 'number'
      | 'password'
      | 'text',
    isRequired?: boolean,
    callback?: Function,
    cssClass?: string
  ) {
    super(label, 'input', modelName, isRequired, callback, cssClass);
    this.type = type;
  }
}

export class CustomFormFieldInputFile extends CustomFormFieldInput {
  accept?: string;

  constructor(
    label: string,
    modelName: string,
    accept?: string,
    isRequired?: boolean,
    callback?: Function,
    cssClass?: string
  ) {
    super(label, modelName, 'file', isRequired, callback, cssClass);
    this.accept = accept;
  }
}

export class CustomFormFieldInputMonth extends CustomFormFieldInput {
  //yyyy-MM
  min?: string;
  max?: string;

  constructor(
    label: string,
    modelName: string,
    min?: string,
    max?: string,
    isRequired?: boolean,
    callback?: Function,
    cssClass?: string
  ) {
    super(label, modelName, 'month', isRequired, callback, cssClass);
    this.min = min;
    this.max = max;
  }
}

export class CustomFormFieldToggle extends CustomFormField {
  color?: string;

  constructor(
    label: string,
    modelName: string,
    color?: string,
    isRequired?: boolean,
    callback?: Function,
    cssClass?: string
  ) {
    super(label, 'toggle', modelName, isRequired, callback, cssClass);
    this.color = color;
  }
}

export class CustomFormFieldSelect extends CustomFormField {
  data: any;

  constructor(
    label: string,
    modelName: string,
    data: any,
    isRequired?: boolean,
    callback?: Function,
    cssClass?: string
  ) {
    super(label, 'select', modelName, isRequired, callback, cssClass);
    this.data = data;
  }
}

export interface CustomFormButton {
  label?: string;
  type?: string;
  expand?: string;
  color?: string;
  cssClass?: string;
  callback?: Function;
}
