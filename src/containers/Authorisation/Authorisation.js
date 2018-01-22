import React from 'react';

import cssClasses from './Authorisation.css';

import { isValid } from '../../utils/validation';
import { renderInputComponents, createElement } from '../../utils/form/render';
import SuccessButton from '../../components/UI/Button/SuccessButton';
import { isValidForm } from '../../utils/form/validation';

class Authorisation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: createElement(
          'input',
          'email',
          'email',
          'Email Address',
          this.onChange,
          '',
          { required: true, isEmail: true }
        ),
        password: createElement(
          'input',
          'password',
          'password',
          'Password',
          this.onChange,
          '',
          { required: true, minLength: 6 }
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
    // this.props.onOrderClicked(this.state.data);
  };

  render() {
    return (
      <div className={cssClasses.Authorisation}>
        <h4>Sign Up or Sign In</h4>
        <form>{renderInputComponents(this.state.data)}</form>

        <SuccessButton
          onClick={this.onSubmit}
          disabled={!isValidForm(this.state.data)}
        >
          Sign In
        </SuccessButton>
      </div>
    );
  }
}

export default Authorisation;
