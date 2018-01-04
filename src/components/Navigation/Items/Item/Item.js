import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import cssClasses from './Item.css';

const Item = props => (
  <li className={cssClasses.Item}>
    <NavLink
      exact={props.exact}
      to={props.link}
      activeClassName={cssClasses.active}
    >
      {props.children}
    </NavLink>
  </li>
);

Item.defaultProps = {
  exact: false
};

Item.propTypes = {
  exact: PropTypes.bool,
  link: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

export default Item;
