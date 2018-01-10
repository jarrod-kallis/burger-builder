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
        name: this.createElement(
          'input',
          'text',
          'name',
          'Name',
          this.onChange
        ),
        email: this.createElement(
          'input',
          'email',
          'email',
          'Email Address',
          this.onChange
        ),
        street: this.createElement(
          'input',
          'text',
          'street',
          'Street',
          this.onChange
        ),
        postalCode: this.createElement(
          'input',
          'text',
          'postalCode',
          'Postal Code',
          this.onChange
        ),
        country: this.createElement(
          'input',
          'text',
          'country',
          'Country',
          this.onChange
        ),
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

  render() {
    return (
      <div className={cssClasses.ContactDetails}>
        <h4>Contact Details</h4>
        <form>
          {Object.keys(this.state.data).map(component => {
            const config = this.state.data[component];
            return (
              <Input
                key={component}
                elementType={config.elementType}
                elementConfig={config.elementConfig}
                value={config.value}
              />
            );
          })}

          <SuccessButton
            onClick={event => {
              event.preventDefault();
              this.props.onOrderClicked(this.state.data);
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
