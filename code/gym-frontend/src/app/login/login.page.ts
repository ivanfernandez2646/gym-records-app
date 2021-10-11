import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { GenericForm, GenericFormInterface } from '../utils/GenericForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, GenericFormInterface {
  user: User;
  genericForm: GenericForm;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user = {};
    const isAuthenticated = this.userService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigateByUrl('tabs');
    } else {
      this.buildGenericForm();
    }
  }

  buildGenericForm(): void {
    this.genericForm = new GenericForm(this.user);
    this.genericForm.class = 'login-form';
    this.genericForm.customFormFields.push({
      label: 'Username',
      component: 'input',
      type: 'text',
      modelName: 'userName',
      isRequired: true,
    });
    this.genericForm.customFormFields.push({
      label: 'Password',
      component: 'input',
      type: 'password',
      modelName: 'password',
      isRequired: true,
    });
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
