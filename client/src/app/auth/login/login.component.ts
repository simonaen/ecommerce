import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginInput} from "../models/login-input.model";
import {AuthService} from "../auth.service";
import {take, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(12)]]
      }
    )
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.loginForm.valid) {

    }
    this.authService.login(<LoginInput>this.loginForm.getRawValue())
      .pipe(
        take(1),
        tap(() => this.router.navigateByUrl('app'))
      )
      .subscribe();
  }
}
