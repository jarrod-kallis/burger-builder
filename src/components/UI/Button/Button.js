import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Button.css';

const Button = props => (
  <button
    className={[cssClasses.Button, cssClasses[props.btnType]].join(' ')}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string.isRequired]).isRequired
};

export default Button;
