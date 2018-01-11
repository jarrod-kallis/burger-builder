import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const SuccessButton = props => (
  <Button btnType="Success" onClick={props.onClick} disabled={props.disabled}>
    {props.children}
  </Button>
);

SuccessButton.defaultProps = {
  disabled: false
}

SuccessButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string.isRequired]).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default SuccessButton;
