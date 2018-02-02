import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../Items/Items';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

const SideDrawer = ({ isAuthenticated, show, close }) => (
  <Auxillary>
    <Backdrop show={show} click={close} />
    <div
      className={[
        cssClasses.SideDrawer,
        show ? cssClasses.Open : cssClasses.Close
      ].join(' ')}
    >
      <div className={cssClasses.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems isAuthenticated={isAuthenticated} />
      </nav>
    </div>
  </Auxillary>
);

SideDrawer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default SideDrawer;
