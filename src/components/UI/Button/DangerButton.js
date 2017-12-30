import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const SuccessButton = props => (
  <Button btnType="Danger" onClick={props.onClick}>
    {props.children}
  </Button>
);

SuccessButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string.isRequired]).isRequired,
  onClick: PropTypes.func.isRequired
};

export default SuccessButton;
