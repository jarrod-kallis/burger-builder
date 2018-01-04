import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './ContactDetails.css';

import SuccessButton from '../../../components/UI/Button/SuccessButton';

class ContactDetails extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onAddressChange = event => {
    this.setState({
      address: {
        ...this.state.address,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    return (
      <div className={cssClasses.ContactDetails}>
        <h4>Contact Details</h4>
        <form>
          <input
            className={cssClasses.Input}
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.onChange}
          />
          <input
            className={cssClasses.Input}
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={this.onChange}
          />
          <input
            className={cssClasses.Input}
            type="text"
            name="street"
            placeholder="Street"
            onChange={this.onAddressChange}
          />
          <input
            className={cssClasses.Input}
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            onChange={this.onAddressChange}
          />

          <SuccessButton
            onClick={event => {
              event.preventDefault();
              this.props.onOrderClicked(this.state);
            }}
          >
            Order
          </SuccessButton>
        </form>
      </div>
    );
  }
}

ContactDetails.propTypes = {
  onOrderClicked: PropTypes.func.isRequired
};

export default ContactDetails;
