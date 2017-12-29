import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Modal.css';

const Modal = props => (
  <div
    className={cssClasses.Modal}
    style={{
      // display: props.show ? 'block' : 'none',
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.show ? '1' : '0'
    }}
  >
    {props.children}
  </div>
);

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element.isRequired]).isRequired,
  show: PropTypes.bool.isRequired
};

export default Modal;
