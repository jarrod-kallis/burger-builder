import React from 'react';
import PropTypes from 'prop-types';

import Auxillary from '../../hoc/Auxillary';

const Layout = ({ children }) => (
  <Auxillary>
    <div>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main>
      {children}
    </main>
  </Auxillary>
);

Layout.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
  ]).isRequired
};

export default Layout;
