import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
/* eslint-disable import/no-named-as-default */
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Authorisation from './containers/Authorisation/Authorisation';
// import Logout from './containers/Authorisation/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const Orders = asyncComponent(() => import('./containers/Orders/Orders'));
const Checkout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const Authorisation = asyncComponent(() =>
  import('./containers/Authorisation/Authorisation')
);
const Logout = asyncComponent(() =>
  import('./containers/Authorisation/Logout/Logout')
);

const App = ({ isAuthenticated }) => (
  <Layout>
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      {isAuthenticated && <Route path="/checkout" component={Checkout} />}
      {isAuthenticated && <Route path="/orders" component={Orders} />}
      <Route path="/signup" component={Authorisation} />
      {isAuthenticated && <Route path="/logout" component={Logout} />}
      {/* <Route
        render={() => <h1 style={{ textAlign: 'center' }}>Route Not Found</h1>}
      /> */}
      <Redirect to="/" />
    </Switch>
  </Layout>
);

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.user.idToken
});

/**
 * REASON FOR NEEDING withRouter:
 * User not logged in and types in 'http://localhost:3000/orders' - the app will load 'Route Not Found'.
 * Then the user clicks the 'Burger Builder' route, but nothing happens.
 * It's as if the app doesn't detect the change in route.
 * withRouter sorts this out.
 */
export default withRouter(connect(mapStateToProps)(App));
