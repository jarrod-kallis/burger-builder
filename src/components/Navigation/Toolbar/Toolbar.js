import React from 'react';

import cssClasses from './Toolbar.css';

import Logo from '../../Logo/Logo';

const Toolbar = () => (
  <header className={cssClasses.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>...</nav>
  </header>
);

export default Toolbar;
