import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Backdrop.css';

const Backdrop = props =>
  props.show ? (
    <div
      role="presentation"
      className={cssClasses.Backdrop}
      onClick={props.click}
    />
  ) : null;

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired
};

export default Backdrop;
