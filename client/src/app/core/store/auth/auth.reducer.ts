import {AuthState} from "./index";
import {ActionTypes, LoginActions} from "./login.actions";
import {createReducer, on} from "@ngrx/store";
import {Jwt} from "../../models/auth/jwt.model";
import {RegisterActions} from "./register.actions";
import {AuthActions} from "./auth.actions";

export const initialState: AuthState = {
  jwt: null,
  isLoginLoading: false,
  isRegisterLoading: false,
  isLoggedIn: false
}

const _reducer = createReducer(initialState,
  on(AuthActions.initAuthState, (state, action) => {
    return {...state, isLoggedIn: !!action.jwt, jwt: action.jwt};
  }),
  // Login actions
  on(LoginActions.login, state => {
    return {...state, isLoginLoading: true}
  }),
  on(LoginActions.loginSuccess, (state, action: Jwt) => {
    return {...state, jwt: action.jwt, isLoginLoading: false, isLoggedIn: true}
  }),
  on(LoginActions.loginFail, state => {
    return {...state, isLoginLoading: false}
  }),

  // Register actions
  on(RegisterActions.register, state => {
    return {...state, isRegisterLoading: true}
  }),
  on(RegisterActions.registerSuccess, (state, action: Jwt) => {
    return {...state, jwt: action.jwt, isRegisterLoading: false, isLoggedIn: true}
  }),
  on(RegisterActions.registerFail, state => {
    return {...state, isRegisterLoading: false}
  })
);

export function reducer(state, action: ActionTypes): AuthState {
  return _reducer(state, action);
}
