import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginInput} from "@core/models/auth/login-input.model";
import {Store} from "@ngrx/store";
import {AuthState, isLoginLoading} from "../../../core/store/auth";
import {LoginActions} from "@core/store/auth/login.actions";
import {Observable} from "rxjs";
import {NotificationService} from "@core/services/shared/notification.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	isLoginLoading$: Observable<boolean>;

	constructor(private fb: FormBuilder, private store: Store<AuthState>, private notificationService: NotificationService) {
		this.loginForm = this.fb.group(
			{
				email: ['tedraykov@gmail.com', [Validators.required, Validators.email]],
				password: ['awdawder3rwad3', [Validators.required, Validators.minLength(8)]]
			}
		);
		this.isLoginLoading$ = this.store.select(isLoginLoading);
	}

	ngOnInit() {
	}

	onSubmit() {
		if (!this.loginForm.valid) {
		} else {
			this.store.dispatch(
				LoginActions.login(<LoginInput>this.loginForm.getRawValue())
			);
		}
	}

	onSubmitGoogle() {
		this.notificationService.createNotification("Google oAuth not supported yet");
	}
}
