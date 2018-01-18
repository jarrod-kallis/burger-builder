import { combineReducers } from 'redux';

import burger from './reducers/burger';
import order from './reducers/order';

export default combineReducers({
  burger,
  order
});
