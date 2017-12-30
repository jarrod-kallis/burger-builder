import React from 'react';

import cssClasses from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../Items/Items';

const Toolbar = () => (
  <header className={cssClasses.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
