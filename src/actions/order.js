import api from '../api';
import {
  PLACE_ORDER_SUCCESSFUL,
  PLACE_ORDER_FAILED,
  PLACE_ORDER,
  ORDERS_RECEIVED
} from './types';

const placeOrderSuccessful = (id, order) => ({
  type: PLACE_ORDER_SUCCESSFUL,
  id,
  order
});

const placeOrderFailed = () => ({
  type: PLACE_ORDER_FAILED
});

const ordersReceived = orders => ({
  type: ORDERS_RECEIVED,
  orders
});

export const placeOrder = order => (dispatch, getState) => {
  dispatch({ type: PLACE_ORDER, order });
  return api.order
    .place(order, getState().user.user.idToken)
    .then(id => dispatch(placeOrderSuccessful(id, order)))
    .catch(error => {
      dispatch(placeOrderFailed());
      throw error;
    });
};

export const get = () => (dispatch, getState) =>
  api.orders.get(getState().user.user.idToken).then(orders => {
    dispatch(ordersReceived(orders));
  });

export default placeOrder;
