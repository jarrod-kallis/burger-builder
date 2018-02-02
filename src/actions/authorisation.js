import api from '../api';
import {
  USER_SIGNUP_START,
  USER_SIGNUP_FAILED,
  USER_LOGIN_SUCCESSFUL,
  USER_LOGIN_START,
  USER_LOGIN_FAILED,
  USER_LOGOUT
} from './types';

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

const userLoginSuccessful = user => ({
  type: USER_LOGIN_SUCCESSFUL,
  user
});

const userLoginFailed = error => ({
  type: USER_LOGIN_FAILED,
  error
});

export const userLogout = () => ({
  type: USER_LOGOUT
});

export const signUp = credentials => dispatch => {
  dispatch(userSignUpStart());
  return api.user
    .signUp(credentials)
    .then(user => dispatch(userLoginSuccessful(user)))
    .catch(error => dispatch(userSignUpFailed(error)));
};

export const login = credentials => dispatch => {
  dispatch(userLoginStart());
  return api.user
    .login(credentials)
    .then(user => dispatch(userLoginSuccessful(user)))
    .catch(error => dispatch(userLoginFailed(error)));
};

export default login;
