import {createAction, props} from "@ngrx/store";
import {RegisterInput} from "../../models/auth/register-input.model";
import {AuthToken} from "../../models/auth/jwt.model";

const register = createAction(
  '[Auth] Register Begin',
  props<RegisterInput>()
);

const registerSuccess = createAction(
  '[Auth] Register Success',
  props<AuthToken>()
);

const registerFailed = createAction(
  '[Auth] Register Failed'
);

export const RegisterActions = {
  register,
  registerSuccess,
  registerFail: registerFailed
}
