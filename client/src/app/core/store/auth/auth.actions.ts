import {createAction, props} from "@ngrx/store";
import {Jwt} from "../../models/auth/jwt.model";

const initAuthState = createAction(
  '[Auth] Init state',
  props<Jwt>()
);

export const AuthActions = {
  initAuthState
}
