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
      onClick={props.click}
    >
      {props.children}
    </NavLink>
  </li>
);

Item.defaultProps = {
  exact: false,
  click: () => {}
};

Item.propTypes = {
  exact: PropTypes.bool,
  link: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  click: PropTypes.func
};

export default Item;
