/* eslint-disable no-debugger */
// 'select' will get the redux state
// 'put' will dispatch a new action
import { select, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import api from '../api';
import { setAuthorisationInfo } from '../utils/localStorageUtil';
import {
  userLogoutSuccess,
  refreshToken,
  userSignUpStart,
  userLoginSuccessful,
  checkTokenExpiration,
  userSignUpFailed,
  userLoginStart,
  userLoginFailed,
  tokenRefreshStart,
  tokenRefreshFailed
} from '../actions/authorisation';

export function* userLogoutSaga() {
  // 'yield' - wait for the statement to finish executing.
  // Nothing changes ito a synchronise action, but asynchronise actions now act as synchronise
  yield setAuthorisationInfo();
  yield put(userLogoutSuccess());
}

export function* checkTokenExpirationSaga(action) {
  yield delay(action.expirationTimeInSeconds * 1000);
  yield put(refreshToken());
}

export function* signUpSaga(action) {
  yield put(userSignUpStart());
  try {
    const user = yield api.user.signUp(action.credentials);

    yield put(userLoginSuccessful(user));
    yield put(checkTokenExpiration(+user.expiresIn));
    yield setAuthorisationInfo(user);
  } catch (error) {
    yield put(userSignUpFailed(error));
  }
}

export function* loginSaga(action) {
  yield put(userLoginStart());
  try {
    const user = yield api.user.login(action.credentials);

    yield put(userLoginSuccessful(user));
    yield put(checkTokenExpiration(+user.expiresIn));
    yield setAuthorisationInfo(user);
  } catch (error) {
    yield put(userLoginFailed(error));
  }
}

export function* refreshTokenSaga() {
  const state = yield select();

  yield put(tokenRefreshStart());
  try {
    const user = yield api.user.refreshToken(state.user.user);

    // debugger;
    yield put(userLoginSuccessful(user));
    // debugger;
    yield put(checkTokenExpiration(+user.expiresIn));
    // debugger;
    yield setAuthorisationInfo(user);
    // debugger;
  } catch (error) {
    yield put(tokenRefreshFailed(error));
  }
}
