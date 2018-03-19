import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import burger from './reducers/burger';
import order from './reducers/order';
import user from './reducers/user';

export default combineReducers({
  burger,
  order,
  user,
  router: routerReducer
});
