import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import cssClasses from './Layout.css';

import Auxillary from '../Auxillary/Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  onOpenSideDrawerHandler = () => {
    if (window.innerWidth <= 499) {
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
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          onMenuClick={this.onOpenSideDrawerHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          show={this.state.showSideDrawer}
          close={this.onCloseSideDrawerHandler}
        />
        <main className={cssClasses.Content}>{this.props.children}</main>
      </Auxillary>
    );
  }
}

Layout.defaultProps = {
  children: {}
};

Layout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
  ])
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.user.idToken
});

export default connect(mapStateToProps)(Layout);
