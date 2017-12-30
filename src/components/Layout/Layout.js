import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Layout.css';

import Auxillary from '../../hoc/Auxillary';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = ({ children }) => (
  <Auxillary>
    <Toolbar />
    <main className={cssClasses.Content}>{children}</main>
  </Auxillary>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
  ]).isRequired
};

export default Layout;
