import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authorisation from './containers/Authorisation/Authorisation';
import Logout from './containers/Authorisation/Logout/Logout';

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/signup" component={Authorisation} />
      <Route path="/logout" component={Logout} />
      <Route
        render={() => <h1 style={{ textAlign: 'center' }}>Route Not Found</h1>}
      />
    </Switch>
  </Layout>
);

export default App;
