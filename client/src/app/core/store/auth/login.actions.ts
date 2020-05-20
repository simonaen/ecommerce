import {createAction, props, union} from "@ngrx/store";
import {AuthToken} from "../../models/auth/jwt.model";
import {LoginInput} from "../../models/auth/login-input.model";
import {ApiError} from "../../models/api-error.model";

const login = createAction(
  "[Auth] Login Begin",
  props<LoginInput>()
);

const loginSuccess = createAction(
  "[Auth] Login Success",
  props<AuthToken>()
);

const loginFail = createAction(
  "[Auth] Login Fail"
);

export const LoginActions = {
  login,
  loginSuccess,
  loginFail
};

const actionsUnion = union(LoginActions);

export type ActionTypes = typeof actionsUnion;
