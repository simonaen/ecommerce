import {createAction, props} from "@ngrx/store";
import {AuthToken} from "../../models/auth/jwt.model";

const initAuthState = createAction(
	'[Auth] Init state',
	props<AuthToken>()
);

const refreshToken = createAction(
	'[Auth] Refresh token'
);

const refreshTokenSuccess = createAction(
	'[Auth] Refresh token - Success',
	props<{ jwt: string }>()
);

const refreshTokenFail = createAction(
	'[Auth] Refresh token - Fail'
)

const logout = createAction(
	'[Auth] Logout',
)

export const AuthActions = {
	initAuthState,
	refreshToken,
	refreshTokenSuccess,
	refreshTokenFail,
	logout
}
