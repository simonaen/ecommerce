import {createAction, props} from "@ngrx/store";
import {AuthToken} from "../../models/auth/jwt.model";

const initAuthState = createAction(
  '[Auth] Init state',
  props<AuthToken>()
);

export const AuthActions = {
  initAuthState
}
