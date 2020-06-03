import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ApiError} from "@core/models/api-error.model";
import {ExceptionIds} from "../../../config/exception-id";
import {Store} from "@ngrx/store";
import {AuthState} from "@core/store/auth";
import {AuthActions} from "@core/store/auth/auth.actions";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(public auth: AuthService, public store: Store<AuthState>) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.auth.getToken().jwt}`
			}
		});
		return next.handle(request).pipe(
			catchError(err => {
				this.handleApiError(err.error);
				return throwError(err);
			}),
		);
	}

	private handleApiError(error: ApiError) {
		switch (error.id) {
			case ExceptionIds.ExpiredJwtException:
				this.store.dispatch(AuthActions.refreshToken());
				break;
			case ExceptionIds.SignatureException:
				this.store.dispatch(AuthActions.logout());
				break;
			default:
				break;
		}
	}
}
