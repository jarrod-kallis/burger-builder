import React from 'react';

import cssClasses from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../Items/Items';

const SideDrawer = () => (
  <div className={cssClasses.SideDrawer}>
    <div className={cssClasses.Logo}>
      <Logo />
    </div>
    <nav>
      <NavigationItems />
    </nav>
  </div>
);

export default SideDrawer;
