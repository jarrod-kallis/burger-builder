import {
  USER_SIGNUP_START,
  USER_SIGNUP_FAILED,
  USER_LOGIN_SUCCESSFUL,
  USER_LOGIN_START,
  USER_LOGIN_FAILED,
  USER_LOGOUT_START,
  USER_LOGOUT,
  SET_REDIRECT_URL,
  TOKEN_REFRESH_START,
  TOKEN_REFRESH_FAILED,
  TOKEN_CHECK_START,
  USER_SIGNUP_START_SAGA,
  USER_LOGIN_START_SAGA,
  TOKEN_REFRESH_START_SAGA
} from './types';

export const userSignUpStart = () => ({
  type: USER_SIGNUP_START
});

export const userSignUpFailed = error => ({
  type: USER_SIGNUP_FAILED,
  error
});

export const userLoginStart = () => ({
  type: USER_LOGIN_START
});

export const userLoginSuccessful = user => ({
  type: USER_LOGIN_SUCCESSFUL,
  user
});

export const userLoginFailed = error => ({
  type: USER_LOGIN_FAILED,
  error
});

export const tokenRefreshStart = () => ({
  type: TOKEN_REFRESH_START
});

export const tokenRefreshFailed = error => ({
  type: TOKEN_REFRESH_FAILED,
  error
});

/**
 * Dispatching this action for the saga to react to
 */
export const userLogoutStart = () => ({
  type: USER_LOGOUT_START
});

export const userLogoutSuccess = () => ({
  type: USER_LOGOUT
});

export const refreshToken = () => ({
  type: TOKEN_REFRESH_START_SAGA
});

export const checkTokenExpiration = expirationTimeInSeconds => ({
  type: TOKEN_CHECK_START,
  expirationTimeInSeconds
});

export const signUp = credentials => ({
  type: USER_SIGNUP_START_SAGA,
  credentials
});

/**
 * Login method that uses Redux's dispatch method (thunk action)
 */
// export const login = credentials => dispatch => {
//   dispatch(userLoginStart());
//   api.user
//     .login(credentials)
//     .then(user => {
//       dispatch(userLoginSuccessful(user));
//       dispatch(checkTokenExpiration(+user.expiresIn));
//       setAuthorisationInfo(user);
//     })
//     .catch(error => dispatch(userLoginFailed(error)));
// };

/**
 * Login method that uses a saga
 */
export const login = credentials => ({
  type: USER_LOGIN_START_SAGA,
  credentials
});

export const setRedirectUrl = url => ({
  type: SET_REDIRECT_URL,
  url
});
