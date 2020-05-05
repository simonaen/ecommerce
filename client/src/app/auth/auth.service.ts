import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginInput} from "./models/login-input.model";
import {Observable} from "rxjs";
import {Jwt} from "./models/jwt.model";
import {mapTo, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  login(loginInput: LoginInput): Observable<void> {
    return this.http.post<Jwt>(`${this.api}/auth/login`, loginInput)
      .pipe(
        // Set token to store
        tap(console.log),
        mapTo(null)
      );
  }
}
