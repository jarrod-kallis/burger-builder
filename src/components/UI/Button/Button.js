import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Button.css';

const Button = props => (
  <button
    className={[cssClasses.Button, cssClasses[props.btnType]].join(' ')}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

Button.defaultProps = {
  disabled: false
}

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string.isRequired]).isRequired,
  disabled: PropTypes.bool
};

export default Button;
