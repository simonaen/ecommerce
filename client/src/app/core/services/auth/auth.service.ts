import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {LoginInput} from "../../models/auth/login-input.model";
import {Observable} from "rxjs";
import {Jwt} from "../../models/auth/jwt.model";
import {catchError, tap} from "rxjs/operators";
import {ApiError} from "../../models/api-error.model";
import {RegisterInput} from "../../models/auth/register-input.model";
import {Store} from "@ngrx/store";
import {AuthState} from "../../store/auth";
import {AuthActions} from "../../store/auth/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly api = environment.serverUrl;
  readonly tokenKey = 'jwt';

  constructor(private http: HttpClient, private store: Store<AuthState>) {
  }

  login(loginInput: LoginInput): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.api}/auth/login`, loginInput).pipe(
      catchError(err => {
        throw <ApiError>err.error;
      })
    );
  }

  register(registerInput: RegisterInput): Observable<any> {
    return this.http.post<any>(`${this.api}/auth/register`, registerInput).pipe(
      catchError(err => {
        throw <ApiError>err.error;
      }),
      // ApiError with status code 2xx wont be caught as an error
      tap((response: ApiError) => {
        if (response.message && response.status) {
          throw response;
        }
      })
    )
  }

  setToken(jwt: string) {
    localStorage.setItem(this.tokenKey, jwt);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  initializeAuthState(): void {
    this.store.dispatch(AuthActions.initAuthState({jwt: this.getToken()}));
  }
}
