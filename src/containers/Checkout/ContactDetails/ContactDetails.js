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
            this.onCustomerChange
          ),
          email: this.createElement(
            'input',
            'email',
            'email',
            'Email Address',
            this.onCustomerChange
          ),
          street: this.createElement(
            'input',
            'text',
            'street',
            'Street',
            this.onCustomerChange
          ),
          postalCode: this.createElement(
            'input',
            'text',
            'postalCode',
            'Postal Code',
            this.onCustomerChange
          ),
          country: this.createElement(
            'input',
            'text',
            'country',
            'Country',
            this.onCustomerChange
          )
        },
        deliveryMethod: this.createElement(
          'select',
          null,
          'deliveryMethod',
          'Delivery Method',
          this.onChange,
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
            value: event.target.value
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
          value: event.target.value
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
    value: ''
  });

  renderComponents = state => {
    const componentArray = Object.entries(state).reduce((prev, [key]) => {
      if (state[key].elementType) {
        prev.push(
          <Input
            key={key}
            elementType={state[key].elementType}
            elementConfig={state[key].elementConfig}
            value={state[key].value}
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

          <SuccessButton onClick={this.onSubmit}>Order</SuccessButton>
        </form>
      </div>
    );
  }
}

ContactDetails.propTypes = {
  onOrderClicked: PropTypes.func.isRequired
};

export default ContactDetails;
