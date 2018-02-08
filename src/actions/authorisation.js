import api from '../api';
import {
  USER_SIGNUP_START,
  USER_SIGNUP_FAILED,
  USER_LOGIN_SUCCESSFUL,
  USER_LOGIN_START,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  SET_REDIRECT_URL,
  TOKEN_REFRESH_START,
  TOKEN_REFRESH_FAILED
} from './types';
import { setAuthorisationInfo } from '../utils/localStorageUtil';

const userSignUpStart = () => ({
  type: USER_SIGNUP_START
});

const userSignUpFailed = error => ({
  type: USER_SIGNUP_FAILED,
  error
});

const userLoginStart = () => ({
  type: USER_LOGIN_START
});

export const userLoginSuccessful = user => ({
  type: USER_LOGIN_SUCCESSFUL,
  user
});

const userLoginFailed = error => ({
  type: USER_LOGIN_FAILED,
  error
});

const tokenRefreshStart = () => ({
  type: TOKEN_REFRESH_START
});

const tokenRefreshFailed = error => ({
  type: TOKEN_REFRESH_FAILED,
  error
});

export const userLogout = () => {
  setAuthorisationInfo();
  return {
    type: USER_LOGOUT
  };
};

export const refreshToken = () => (dispatch, getState) => {
  dispatch(tokenRefreshStart());
  api.user
    .refreshToken(getState().user.user)
    .then(user => {
      dispatch(userLoginSuccessful(user));
      // eslint-disable-next-line
      dispatch(checkTokenExpiration(+user.expiresIn));
      setAuthorisationInfo(user);
    })
    .catch(error => dispatch(tokenRefreshFailed(error)));
};

export const checkTokenExpiration = expirationTimeInSeconds => dispatch => {
  setTimeout(() => {
    // dispatch(userLogout());
    dispatch(refreshToken());
  }, expirationTimeInSeconds * 1000);
};

export const signUp = credentials => dispatch => {
  dispatch(userSignUpStart());
  api.user
    .signUp(credentials)
    .then(user => {
      dispatch(userLoginSuccessful(user));
      dispatch(checkTokenExpiration(+user.expiresIn));
      setAuthorisationInfo(user);
    })
    .catch(error => dispatch(userSignUpFailed(error)));
};

export const login = credentials => dispatch => {
  dispatch(userLoginStart());
  api.user
    .login(credentials)
    .then(user => {
      dispatch(userLoginSuccessful(user));
      dispatch(checkTokenExpiration(+user.expiresIn));
      setAuthorisationInfo(user);
    })
    .catch(error => dispatch(userLoginFailed(error)));
};

export const setRedirectUrl = url => ({
  type: SET_REDIRECT_URL,
  url
});
