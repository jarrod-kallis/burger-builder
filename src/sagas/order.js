import { select, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';

import api from '../api';
import { PLACE_ORDER, GET_ORDERS } from '../actions/types';
import {
  placeOrderSuccessful,
  placeOrderFailed,
  getOrdersFailed,
  getOrdersSuccessful
} from '../actions/order';

export function* placeOrderSaga(action) {
  const state = yield select();
  yield put({ type: PLACE_ORDER, order: action.order });

  try {
    const orderId = yield api.order.place(action.order, state.user.user);

    yield put(placeOrderSuccessful(orderId, action.order));
    yield put(replace('/'));
  } catch (error) {
    yield put(placeOrderFailed());
    throw error;
  }
}

export function* getOrderSaga() {
  const state = yield select();

  yield put({ type: GET_ORDERS });

  try {
    const orders = yield api.orders.get(state.user.user);
    yield put(getOrdersSuccessful(orders));
  } catch (error) {
    yield put(getOrdersFailed());
  }
}
