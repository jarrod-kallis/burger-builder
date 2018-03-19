import { takeEvery, all } from 'redux-saga/effects';

import {
  USER_LOGOUT_START,
  TOKEN_CHECK_START,
  USER_SIGNUP_START_SAGA,
  USER_LOGIN_START_SAGA,
  TOKEN_REFRESH_START_SAGA,
  FETCH_INGREDIENTS,
  FETCH_INGREDIENT_PRICES,
  PLACE_ORDER_START,
  GET_ORDERS_START
} from './actions/types';
import {
  userLogoutSaga,
  checkTokenExpirationSaga,
  signUpSaga,
  loginSaga,
  refreshTokenSaga
} from './sagas/authorisation';
import {
  fetchIngredientsSaga,
  fetchIngredientPricesSaga
} from './sagas/burger';
import { placeOrderSaga, getOrderSaga } from './sagas/order';

function* watchAuthorisation() {
  yield takeEvery(USER_LOGOUT_START, userLogoutSaga);
  yield takeEvery(TOKEN_CHECK_START, checkTokenExpirationSaga);
  yield takeEvery(USER_SIGNUP_START_SAGA, signUpSaga);
  yield takeEvery(USER_LOGIN_START_SAGA, loginSaga);
  yield takeEvery(TOKEN_REFRESH_START_SAGA, refreshTokenSaga);
}

function* watchBurger() {
  yield takeEvery(FETCH_INGREDIENTS, fetchIngredientsSaga);
  yield takeEvery(FETCH_INGREDIENT_PRICES, fetchIngredientPricesSaga);
}

function* watchOrder() {
  yield takeEvery(PLACE_ORDER_START, placeOrderSaga);
  yield takeEvery(GET_ORDERS_START, getOrderSaga);
}

export default function*() {
  yield all([watchAuthorisation(), watchBurger(), watchOrder()]);
}
