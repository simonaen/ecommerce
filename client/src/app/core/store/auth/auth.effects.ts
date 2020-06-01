import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LoginActions} from "./login.actions";
import {AuthService} from "../../services/auth/auth.service";
import {catchError, exhaustMap, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {AuthToken} from "../../models/auth/jwt.model";
import {NotificationService} from "../../services/shared/notification.service";
import {ApiError} from "../../models/api-error.model";
import {RegisterActions} from "./register.actions";
import {Router} from "@angular/router";
import {AuthActions} from "@core/store/auth/auth.actions";

@Injectable()
export class AuthEffects {
	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LoginActions.login),
			exhaustMap(payload => this.authService.login(payload).pipe(
				map((jwt: AuthToken) => LoginActions.loginSuccess(jwt)),
				catchError((error: any) => {
					this.notificationService.createNotification(error.message, "warning");
					return of(LoginActions.loginFail());
				})
			))
		)
	);

	loginSuccess$ = createEffect(() =>
			this.actions$.pipe(
				ofType(LoginActions.loginSuccess, RegisterActions.registerSuccess),
				tap(payload => {
					this.authService.setToken(payload);
					this.router.navigateByUrl('/').then();
				})
			)
		, {dispatch: false}
	);

	register$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RegisterActions.register),
			exhaustMap(payload => this.authService.register(payload).pipe(
				map((jwt: AuthToken) => RegisterActions.registerSuccess(jwt)),
				catchError((error: ApiError) => {
					this.notificationService.createNotification(error.message, "warning");
					return of(RegisterActions.registerFail());
				})
			))
		)
	);

	refreshToken$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.refreshToken),
			switchMap(() => this.authService.refreshToken()),
			map((jwt: { jwt: string }) => AuthActions.refreshTokenSuccess(jwt)),
			catchError((error: ApiError) => {
				this.notificationService.createNotification(error.message, "warning");
				return of(AuthActions.refreshTokenFail());
			})
		)
	);

	refreshTokenSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.refreshTokenSuccess),
			tap(payload => {
				let authToken = this.authService.getToken();
				const newAuthToken: AuthToken = {
					...authToken,
					jwt: payload.jwt
				}
				this.authService.setToken(newAuthToken);
			}),
		), {dispatch: false}
	);

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.logout),
			tap(() => this.authService.clearToken())
		), {dispatch: false}
	);

	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private notificationService: NotificationService,
		private router: Router) {
	}
}
