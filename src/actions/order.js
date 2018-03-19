import {
  PLACE_ORDER_SUCCESSFUL,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_START,
  GET_ORDERS_START,
  GET_ORDERS_FAILED,
  GET_ORDERS_SUCCESSFUL
} from './types';

export const placeOrderSuccessful = (id, order) => ({
  type: PLACE_ORDER_SUCCESSFUL,
  id,
  order
});

export const placeOrderFailed = () => ({
  type: PLACE_ORDER_FAILED
});

export const getOrdersSuccessful = orders => ({
  type: GET_ORDERS_SUCCESSFUL,
  orders
});

export const getOrdersFailed = () => ({
  type: GET_ORDERS_FAILED
});

export const placeOrder = order => ({
  type: PLACE_ORDER_START,
  order
});

export const get = () => ({
  type: GET_ORDERS_START
});

export default placeOrder;
