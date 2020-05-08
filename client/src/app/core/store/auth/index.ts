import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface AuthState {
  jwt: string,
  isLoginLoading: boolean,
  isRegisterLoading: boolean,
  isLoggedIn: boolean
}

export const getAuthState = createFeatureSelector('auth');

export const isLoginLoading = createSelector(getAuthState, (state: AuthState) => {
  return state.isLoginLoading;
});

