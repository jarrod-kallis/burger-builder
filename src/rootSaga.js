import { takeEvery } from 'redux-saga/effects';

import {
  USER_LOGOUT_START,
  TOKEN_CHECK_START,
  USER_SIGNUP_START_SAGA,
  USER_LOGIN_START_SAGA,
  TOKEN_REFRESH_START_SAGA
} from './actions/types';
import {
  userLogoutSaga,
  checkTokenExpirationSaga,
  signUpSaga,
  loginSaga,
  refreshTokenSaga
} from './sagas/authorisation';

export function* watchAuthorisation() {
  yield takeEvery(USER_LOGOUT_START, userLogoutSaga);
  yield takeEvery(TOKEN_CHECK_START, checkTokenExpirationSaga);
  yield takeEvery(USER_SIGNUP_START_SAGA, signUpSaga);
  yield takeEvery(USER_LOGIN_START_SAGA, loginSaga);
  yield takeEvery(TOKEN_REFRESH_START_SAGA, refreshTokenSaga);
}

export default watchAuthorisation;
