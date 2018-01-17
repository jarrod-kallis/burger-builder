import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';

// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools());

// Hot reloading of Redux state
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

const rootElement = document.getElementById('root');

let render = () => {
  // eslint-disable-next-line
  const App = require('./App').default;

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
};

if (module.hot) {
  const renderApp = render;

  render = () => {
    renderApp();
  };

  module.hot.accept('./App', () => {
    setTimeout(render);
  });
}

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root')
// );
registerServiceWorker();

// Hot reloading of the app
// if (module.hot) {
//   module.hot.accept();
// }

render();
