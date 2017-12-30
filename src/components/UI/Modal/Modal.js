import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Modal.css';

import Auxillary from '../../../hoc/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => (
  <Auxillary>
    <Backdrop show={props.show} onClick={props.closeModal} />
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
  </Auxillary>
);

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element.isRequired]).isRequired,
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
