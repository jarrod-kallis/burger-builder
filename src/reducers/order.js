import {
  PLACE_ORDER_SUCCESSFUL,
  PLACE_ORDER_FAILED,
  PLACE_ORDER,
  GET_ORDERS_SUCCESSFUL,
  GET_ORDERS,
  GET_ORDERS_FAILED
} from '../actions/types';

const initialState = {
  currentOrder: {},
  orders: {},
  error: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      return {
        ...state,
        currentOrder: action.order,
        loading: true
      };
    case PLACE_ORDER_SUCCESSFUL:
      return {
        ...state,
        currentOrder: {},
        loading: false,
        orders: Object.assign({}, state.orders, {
          [action.id]: { id: action.id, ...action.order }
        })
      };
    case PLACE_ORDER_FAILED:
      return {
        ...state,
        error: true,
        loading: false
      };
    case GET_ORDERS:
      return {
        ...state,
        loading: true
      };
    case GET_ORDERS_SUCCESSFUL:
      return {
        ...state,
        orders: action.orders || {},
        loading: false
      };
    case GET_ORDERS_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
