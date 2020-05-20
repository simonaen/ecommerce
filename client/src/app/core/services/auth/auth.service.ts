import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {LoginInput} from "../../models/auth/login-input.model";
import {Observable} from "rxjs";
import {AuthToken} from "../../models/auth/jwt.model";
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
  private refreshTokenKey = 'refreshToken';

  constructor(private http: HttpClient, private store: Store<AuthState>) {
  }

  login(loginInput: LoginInput): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.api}/auth/login`, loginInput).pipe(
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

  refreshToken(): Observable<any> {
    const refreshToken = this.getToken().refreshToken;
    return this.http.post<any>(`${this.api}/auth/refresh`, {refreshToken}).pipe(
    );
  }

  setToken(authToken: AuthToken) {
    localStorage.setItem(this.tokenKey, authToken.jwt);
    localStorage.setItem(this.refreshTokenKey, authToken.refreshToken);
  }

  getToken(): AuthToken {
    const jwt = localStorage.getItem(this.tokenKey);
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    return <AuthToken>{
      jwt,
      refreshToken
    }
  }

  initializeAuthState(): void {
    this.store.dispatch(AuthActions.initAuthState(this.getToken()));
  }

  isTokenExpired(): boolean {
    return false;
  }

  collectFailedRequest(request: HttpRequest<any>) {

  }
}
