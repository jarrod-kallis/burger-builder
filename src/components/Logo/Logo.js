import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import cssClasses from './Logo.css';

const Logo = () => (
  <div className={cssClasses.Logo}>
    <img src={burgerLogo} alt="Burger Builder" />
  </div>
);

export default Logo;
