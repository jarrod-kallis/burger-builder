import React from 'react';

const asyncComponent = importComponentFunction =>
  class extends React.Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponentFunction().then(component => {
        this.setState({ component: component.default }); // component.default = the default export
      });
    }

    render() {
      const Component = this.state.component;

      return Component ? <Component {...this.props} /> : null;
    }
  };

export default asyncComponent;
