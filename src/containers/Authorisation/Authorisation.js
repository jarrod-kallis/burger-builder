import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import cssClasses from './Authorisation.css';

import { isValid } from '../../utils/validation';
import { renderInputComponents, createElement } from '../../utils/form/render';
import SuccessButton from '../../components/UI/Button/SuccessButton';
import { isValidForm } from '../../utils/form/validation';
import { signUp, login } from '../../actions/authorisation';
import DangerButton from '../../components/UI/Button/DangerButton';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosAuthorisation from '../../axios-authorisation';

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
          { required: true, isEmail: true },
          '',
          this.isValid
        ),
        password: createElement(
          'input',
          'password',
          'password',
          'Password',
          this.onChange,
          '',
          { required: true, minLength: 6 },
          '',
          this.isValid
        )
        // confirmPassword: createElement(
        //   'input',
        //   'password',
        //   'confirmPassword',
        //   'Confirm Password',
        //   this.onChange,
        //   '',
        //   {
        //     required: true,
        //     confirmPassword: true
        //   },
        //   'Passwords don\'t match',
        //   this.isValid
        // )
      },
      isSignUp: true
    };
  }

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

    // Confirm password can be invalidated after changing the password so we need to check it on submit
    // this.setState(
    //   {
    //     data: {
    //       ...this.state.data,
    //       confirmPassword: {
    //         ...this.state.data.confirmPassword,
    //         valid: this.isValid(
    //           this.state.data.confirmPassword.value,
    //           this.state.data.confirmPassword.validation
    //         )
    //       }
    //     }
    //   },
    //   () => {
    //     if (this.state.data.confirmPassword.valid) {
    // this.props.signUp(
    //   this.state.data.email.value,
    //   this.state.data.password.value
    // );
    //     }
    //   }
    // );

    if (this.state.isSignUp) {
      this.props.signUp(
        this.state.data.email.value,
        this.state.data.password.value
      );
    } else {
      this.props.login(
        this.state.data.email.value,
        this.state.data.password.value
      );
    }
  };

  isValid = (value, rules) => {
    let result = isValid(value, rules);

    if (result && rules) {
      if (rules.confirmPassword && value !== this.state.data.password.value) {
        result = false;
      }
    }

    return result;
  };

  switchToClickHandler = () => {
    this.setState({
      isSignUp: !this.state.isSignUp
    });
  };

  render() {
    const { loading } = this.props;
    const caption = this.state.isSignUp ? 'Sign Up' : 'Login';

    return (
      <div className={cssClasses.Authorisation}>
        <h4>{caption}</h4>
        {loading ? (
          <Spinner />
        ) : (
          <Auxillary>
            <form onSubmit={this.onSubmit}>
              {renderInputComponents(this.state.data)}

              <SuccessButton disabled={!isValidForm(this.state.data)}>
                Submit
              </SuccessButton>
            </form>
            <DangerButton onClick={this.switchToClickHandler}>
              Switch to {this.state.isSignUp ? 'Login' : 'Sign Up'}
            </DangerButton>
          </Auxillary>
        )}
      </div>
    );
  }
}

Authorisation.propTypes = {
  signUp: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: state.user.loading
});

const mapDispatchToProps = dispatch => ({
  signUp: (email, password) => dispatch(signUp({ email, password })),
  login: (email, password) => dispatch(login({ email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Authorisation, axiosAuthorisation)
);
