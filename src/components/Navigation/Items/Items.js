import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Items.css';

import Item from './Item/Item';

const Items = ({ isAuthenticated, click }) => (
  <ul className={cssClasses.Items}>
    <Item link="/" exact click={click}>
      Burger Builder
    </Item>
    {isAuthenticated ? (
      <Item link="/orders" click={click}>
        Orders
      </Item>
    ) : null}
    {isAuthenticated ? (
      <Item link="/logout" click={click}>
        Logout
      </Item>
    ) : (
      <Item link="/signup" click={click}>
        Sign Up / Login
      </Item>
    )}
  </ul>
);

Items.defaultProps = {
  click: () => {}
};

Items.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  click: PropTypes.func
};

export default Items;
