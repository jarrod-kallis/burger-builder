import api from '../api';
import {
  PLACE_ORDER_SUCCESSFUL,
  PLACE_ORDER_FAILED,
  PLACE_ORDER
} from './types';

const placeOrderSuccessful = (id, order) => ({
  type: PLACE_ORDER_SUCCESSFUL,
  id,
  order
});

const placeOrderFailed = () => ({
  type: PLACE_ORDER_FAILED
});

export const placeOrder = order => dispatch => {
  dispatch({ type: PLACE_ORDER, order });
  return api.order
    .place(order)
    .then(id => dispatch(placeOrderSuccessful(id, order)))
    .catch(error => {
      dispatch(placeOrderFailed());
      throw error;
    });
};

export default placeOrder;
