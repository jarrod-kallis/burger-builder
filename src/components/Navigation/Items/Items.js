import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Items.css';

import Item from './Item/Item';

const Items = ({ isAuthenticated }) => (
  <ul className={cssClasses.Items}>
    <Item link="/" exact>
      Burger Builder
    </Item>
    {isAuthenticated ? <Item link="/orders">Orders</Item> : null}
    {isAuthenticated ? (
      <Item link="/logout">Logout</Item>
    ) : (
      <Item link="/signup">Sign Up / Login</Item>
    )}
  </ul>
);

Items.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default Items;
