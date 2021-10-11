import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericFormComponent } from './generic-form.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [GenericFormComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [GenericFormComponent],
})
export class GenericFormModule {}
