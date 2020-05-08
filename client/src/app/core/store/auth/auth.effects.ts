import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LoginActions} from "./login.actions";
import {AuthService} from "../../services/auth/auth.service";
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Jwt} from "../../models/auth/jwt.model";
import {NotificationService} from "../../services/shared/notification.service";
import {ApiError} from "../../models/api-error.model";
import {RegisterActions} from "./register.actions";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      exhaustMap(action =>
        this.authService.login(action).pipe(
          map((jwt: Jwt) => LoginActions.loginSuccess(jwt)),
          catchError((error: ApiError) => {
            this.notificationService.createNotification(error.message, "warning");
            return of(LoginActions.loginFail());
          }))
      )
    )
  );

  loginSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LoginActions.loginSuccess, RegisterActions.registerSuccess),
        tap(action => {
          this.authService.setToken(action.jwt);
          this.router.navigateByUrl('/').then();
        })
      )
    , {dispatch: false});

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      exhaustMap(action =>
        this.authService.register(action).pipe(
          map((jwt: Jwt) => {
            this.router.navigateByUrl('/').then();
            return RegisterActions.registerSuccess(jwt);
          }),
          catchError((error: ApiError) => {
            this.notificationService.createNotification(error.message, "warning");
            return of(RegisterActions.registerFail());
          }))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router) {
  }
}
