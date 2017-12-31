import React from 'react';

import cssClasses from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../Items/Items';

const Toolbar = () => (
  <header className={cssClasses.Toolbar}>
    <div className={cssClasses.MobileMenu}>MENU</div>
    <div className={cssClasses.Logo}>
      <Logo />
    </div>
    <nav className={cssClasses.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
