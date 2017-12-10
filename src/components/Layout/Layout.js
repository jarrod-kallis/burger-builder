import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Layout.css';

import Auxillary from '../../hoc/Auxillary';

const Layout = ({ children }) => (
  <Auxillary>
    <div>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main className={cssClasses.Content}>
      {children}
    </main>
  </Auxillary>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
  ]).isRequired
};

export default Layout;
