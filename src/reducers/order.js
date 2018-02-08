import {
  PLACE_ORDER_SUCCESSFUL,
  PLACE_ORDER_FAILED,
  PLACE_ORDER,
  ORDERS_RECEIVED
} from '../actions/types';

const initialState = {
  currentOrder: {},
  orders: {},
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      return {
        ...state,
        currentOrder: action.order
      };
    case PLACE_ORDER_SUCCESSFUL:
      return {
        ...state,
        currentOrder: {},
        orders: Object.assign({}, state.orders, {
          [action.id]: { id: action.id, ...action.order }
        })
      };
    case PLACE_ORDER_FAILED:
      return {
        ...state,
        error: true
      };
    case ORDERS_RECEIVED:
      return {
        ...state,
        orders: action.orders || {}
      };
    default:
      return state;
  }
};
