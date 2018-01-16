import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './ContactDetails.css';

import SuccessButton from '../../../components/UI/Button/SuccessButton';
import Input from '../../../components/UI/Forms/Input/Input';

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
            valid: this.isValid(
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
          valid: this.isValid(
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
  ) => ({
    elementType,
    elementConfig: {
      type,
      name,
      label,
      placeholder: label,
      onChange: onChangeHandler,
      ...args
    },
    value: '',
    validation,
    valid: false
  });

  isValid = (value, rules) => {
    let isValid = true;

    if (rules) {
      if (rules.required && !value.trim()) {
        isValid = false;
      }

      if (isValid && rules.minLength && value.length < rules.minLength) {
        isValid = false;
      }

      if (isValid && rules.maxLength && value.length > rules.maxLength) {
        isValid = false;
      }

      if (isValid && rules.isEmail) {
        const pattern = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = pattern.test(value);
      }
    }

    return isValid;
  };

  isValidOrder = state => {
    const isValid = Object.entries(state).reduce((prev, [key]) => {
      if (state[key].elementType) {
        return prev && state[key].valid;
      }
      return this.isValidOrder(state[key]);
    }, true);

    return isValid;
  };

  renderComponents = state => {
    const componentArray = Object.entries(state).reduce((prev, [key]) => {
      if (state[key].elementType) {
        prev.push(
          <Input
            key={key}
            elementType={state[key].elementType}
            elementConfig={state[key].elementConfig}
            value={state[key].value}
            valid={state[key].valid}
          />
        );
      } else {
        return this.renderComponents(state[key]);
      }
      return prev;
    }, []);

    return componentArray;
  };

  render() {
    return (
      <div className={cssClasses.ContactDetails}>
        <h4>Contact Details</h4>
        <form>
          {this.renderComponents(this.state.data)}

          <SuccessButton
            onClick={this.onSubmit}
            disabled={!this.isValidOrder(this.state.data)}
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
