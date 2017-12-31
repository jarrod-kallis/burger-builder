import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Layout.css';

import Auxillary from '../../hoc/Auxillary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  onOpenSideDrawerHandler = () => {
    if (window.outerWidth <= 499) {
      this.setState({
        showSideDrawer: true
      });
    }
  };

  onCloseSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  render() {
    return (
      <Auxillary>
        <Toolbar onMenuClick={this.onOpenSideDrawerHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          close={this.onCloseSideDrawerHandler}
        />
        <main className={cssClasses.Content}>{this.props.children}</main>
      </Auxillary>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
  ]).isRequired
};

export default Layout;
