import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../core/services/shared/notification.service";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../core/store/auth";
import {RegisterActions} from "../../../core/store/auth/register.actions";
import {RegisterInput} from "../../../core/models/auth/register-input.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private notificationService: NotificationService,
              private store: Store<AuthState>) {

    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]]
    }, {
      validators: this.MustMatch('password', 'passwordConfirm')
    });
  }

  ngOnInit() {
  }


  onSubmit() {
    if (!this.registerForm.valid) {
      this.notificationService.createNotification("Please use valid information", 'warning');
    } else {
      this.store.dispatch(
        RegisterActions.register(<RegisterInput>this.registerForm.getRawValue())
      );
    }
  }

  onSubmitGoogle() {
    this.notificationService.createNotification("Google oAuth not supported yet");
  }

  isRequiredErrorMessage(formControlName: string) {
    return formControlName.charAt(0).toUpperCase() + formControlName.slice(1) + ' is required';
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
