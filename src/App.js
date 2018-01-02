import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends React.Component {
  state = {
    show: true
  }

  // componentDidMount() {
  //   // Test unmounting of a component wrapped by HOC: withErrorHandler
  //   setTimeout(() => this.setState({ show: false }), 5000);
  // }

  render() {
    return (
      <Layout>
        {this.state.show ? <BurgerBuilder /> : null}
      </Layout>
    );
  }
}

export default App;
