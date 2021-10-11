export interface GenericFormInterface {
  buildGenericForm(): void;
  formSubmit(): void;
}

export class GenericForm {
  modelData: any;
  class: string;
  customFormFields: CustomFormField[] = [];
  customButtons: CustomFormButton[] = [];
  formSubmit: Function;

  constructor(modelData: any) {
    this.modelData = modelData;
  }
}

export interface CustomFormField {
  label?: string;
  component?: string; //ion-input, ion-select...
  type?: string; // if is ion-input you need to specify the type
  modelName?: string; // ngModel and name
  isRequired?: boolean;
  color?: string;
}

export interface CustomFormButton {
  label?: string;
  type?: string;
  expand?: string;
  color?: string;
}
