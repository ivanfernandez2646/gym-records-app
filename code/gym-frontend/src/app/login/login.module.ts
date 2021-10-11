import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { GenericFormComponent } from '../generic-form/generic-form.component';
import { GenericFormModule } from '../generic-form/generic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    GenericFormModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
