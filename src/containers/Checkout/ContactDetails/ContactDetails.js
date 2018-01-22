import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './ContactDetails.css';

import SuccessButton from '../../../components/UI/Button/SuccessButton';
import { isValid } from '../../../utils/validation';
import {
  renderInputComponents,
  createElement
} from '../../../utils/form/render';
import { isValidForm } from '../../../utils/form/validation';

class ContactDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        customer: {
          name: this.createElement(
            'input',
            'text',
            'name',
            'Name',
            this.onCustomerChange,
            { required: true }
          ),
          email: this.createElement(
            'input',
            'email',
            'email',
            'Email Address',
            this.onCustomerChange,
            { required: true, isEmail: true }
          ),
          street: this.createElement(
            'input',
            'text',
            'street',
            'Street',
            this.onCustomerChange,
            { required: true }
          ),
          postalCode: this.createElement(
            'input',
            'text',
            'postalCode',
            'Postal Code',
            this.onCustomerChange,
            { required: true, minLength: 4, maxLength: 4 }
          ),
          country: this.createElement(
            'input',
            'text',
            'country',
            'Country',
            this.onCustomerChange,
            { required: true }
          )
        },
        deliveryMethod: this.createElement(
          'select',
          null,
          'deliveryMethod',
          'Delivery Method',
          this.onChange,
          { required: true },
          {
            options: [
              { value: '', displayValue: 'Please select...' },
              { value: 'fastest', displayValue: 'Fastest' },
              { value: 'cheapest', displayValue: 'Cheapest' }
            ]
          }
        )
      }
    };
  }

  onCustomerChange = event => {
    this.setState({
      data: {
        ...this.state.data,
        customer: {
          ...this.state.data.customer,
          [event.target.name]: {
            ...this.state.data.customer[event.target.name],
            value: event.target.value,
            valid: isValid(
              event.target.value,
              this.state.data.customer[event.target.name].validation
            )
          }
        }
      }
    });
  };

  onChange = event => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: {
          ...this.state.data[event.target.name],
          value: event.target.value,
          valid: isValid(
            event.target.value,
            this.state.data[event.target.name].validation
          )
        }
      }
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onOrderClicked(this.state.data);
  };

  createElement = (
    elementType,
    type,
    name,
    label,
    onChangeHandler,
    validation = {},
    { ...args }
  ) => {
    let value = '';

    if (this.props.currentOrder) {
      if (
        this.props.currentOrder.customer &&
        this.props.currentOrder.customer[name]
      ) {
        value = this.props.currentOrder.customer[name];
      } else if (this.props.currentOrder[name]) {
        value = this.props.currentOrder[name];
      }
    }

    return createElement(
      elementType,
      type,
      name,
      label,
      onChangeHandler,
      value,
      validation,
      { ...args }
    );
  };

  render() {
    return (
      <div className={cssClasses.ContactDetails}>
        <h4>Contact Details</h4>
        <form>
          {renderInputComponents(this.state.data)}

          <SuccessButton
            onClick={this.onSubmit}
            disabled={!isValidForm(this.state.data)}
          >
            Order
          </SuccessButton>
        </form>
      </div>
    );
  }
}

ContactDetails.defaultProps = {
  currentOrder: null
};

ContactDetails.propTypes = {
  onOrderClicked: PropTypes.func.isRequired,
  currentOrder: PropTypes.shape({
    customer: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired
};

export default ContactDetails;
