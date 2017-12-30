import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Item.css';

const Item = props => (
  <li className={cssClasses.Item}>
    <a href={props.link} className={props.active ? cssClasses.active : null}>
      {props.children}
    </a>
  </li>
);

Item.propTypes = {
  link: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired
};

export default Item;
