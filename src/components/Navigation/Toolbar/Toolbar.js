import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../Items/Items';

const Toolbar = ({ onMenuClick }) => (
  <header className={cssClasses.Toolbar}>
    <div
      role="presentation"
      className={cssClasses.MobileMenu}
      onClick={onMenuClick}
    >
      MENU
    </div>
    <div className={cssClasses.Logo}>
      <Logo />
    </div>
    <nav className={cssClasses.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

Toolbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired
};

export default Toolbar;
