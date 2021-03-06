import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../Items/Items';

const Toolbar = ({ isAuthenticated, onMenuClick }) => (
  <header className={cssClasses.Toolbar}>
    <div role="presentation" className={cssClasses.Logo} onClick={onMenuClick}>
      <Logo />
    </div>
    <nav className={cssClasses.DesktopOnly}>
      <NavigationItems isAuthenticated={isAuthenticated} />
    </nav>
  </header>
);

Toolbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired
};

export default Toolbar;
