import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import {
  getAuthorisationInfo,
  getTokenExpirationDate
} from './utils/localStorageUtil';
import {
  userLoginSuccessful,
  checkTokenExpiration,
  userLogoutStart
} from './actions/authorisation';
import { watchAuthorisation } from './rootSaga';

// Only allow Redux dev tools if in development mode
const compose =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : f => f;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuthorisation);

const currentUser = getAuthorisationInfo();
const expirationDate = getTokenExpirationDate();

if (currentUser && expirationDate && expirationDate > new Date()) {
  store.dispatch(userLoginSuccessful(currentUser));
  store.dispatch(checkTokenExpiration(+currentUser.expiresIn));
} else {
  store.dispatch(userLogoutStart());
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
