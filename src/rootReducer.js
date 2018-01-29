import { combineReducers } from 'redux';

import burger from './reducers/burger';
import order from './reducers/order';
import user from './reducers/user';

export default combineReducers({
  burger,
  order,
  user
});
