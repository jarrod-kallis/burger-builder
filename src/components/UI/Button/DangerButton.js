import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const DangerButton = props => (
  <Button btnType="Danger" onClick={props.onClick}>
    {props.children}
  </Button>
);

DangerButton.defaultProps = {
  onClick: () => {}
};

DangerButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  onClick: PropTypes.func
};

export default DangerButton;
