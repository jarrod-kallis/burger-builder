import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Modal.css';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  // componentWillUpdate() {
  //   console.log('[Modal] will update');
  // }

  render() {
    return (
      <Auxillary>
        <Backdrop show={this.props.show} click={this.props.closeModal} />
        <div
          className={cssClasses.Modal}
          style={{
            // display: props.show ? 'block' : 'none',
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Auxillary>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element.isRequired]).isRequired,
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
