import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import {
  CustomFormFieldInput,
  GenericForm,
  GenericFormInterface,
} from '../utils/GenericForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, GenericFormInterface {
  user: User;
  genericForm: GenericForm;
  isAuthenticated: boolean;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  ionViewWillEnter(): void {
    this.user = {};
    this.isAuthenticated = this.userService.isAuthenticated();
    if (this.isAuthenticated) {
      this.router.navigateByUrl('tabs');
    } else {
      this.buildGenericForm();
    }
  }

  buildGenericForm(): void {
    this.genericForm = new GenericForm(this.user);
    this.genericForm.cssClass = 'login-form';
    this.genericForm.customFormFields.push(
      new CustomFormFieldInput('Username', 'userName', 'text', true)
    );
    this.genericForm.customFormFields.push(
      new CustomFormFieldInput('Password', 'password', 'password', true)
    );
    this.genericForm.customButtons.push({
      label: 'Register',
      type: 'submit',
      expand: 'block',
      color: 'secondary',
    });
    this.genericForm.customButtons.push({
      label: 'Login',
      type: 'submit',
      expand: 'block',
    });
    this.genericForm.formSubmit = () => this.formSubmit();
  }

  formSubmit() {
    this.userService.login(this.user).then((isLogged: boolean) => {
      if (isLogged) {
        this.router.navigateByUrl('tabs');
      }
    });
  }
}
