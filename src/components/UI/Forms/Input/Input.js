import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Input.css';

class Input extends React.Component {
  state = {
    touched: false
  };

  inputTouchedHandler = () => {
    this.setState({
      touched: true
    });
  };

  render() {
    const {
      valid,
      elementType,
      elementConfig,
      value,
      errorMessage
    } = this.props;
    const { touched } = this.state;

    let inputElement = null;
    const id = Math.random();

    const inputCssClasses = [cssClasses.InputElement];
    if (!valid && touched) {
      inputCssClasses.push(cssClasses.Error);
    }

    switch (elementType) {
      case 'select':
        inputElement = (
          <select
            className={inputCssClasses.join(' ')}
            id={id}
            onChange={elementConfig.onChange}
            name={elementConfig.name}
            value={value}
            onBlur={this.inputTouchedHandler}
          >
            {elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
        );
        break;
      default:
        inputElement = (
          <input
            className={inputCssClasses.join(' ')}
            id={id}
            {...elementConfig}
            value={value}
            onBlur={this.inputTouchedHandler}
          />
        );
    }

    return (
      <div className={cssClasses.Input}>
        <label htmlFor={id} className={cssClasses.Label}>
          {elementConfig.label}
        </label>
        {inputElement}
        {!valid &&
          touched && (
            <p className={cssClasses.ErrorMessage}>
              {errorMessage ||
                `Please enter a valid ${elementConfig.placeholder.toLowerCase()}`}
            </p>
          )}
      </div>
    );
  }
}

Input.defaultProps = {
  options: [],
  value: '',
  errorMessage: ''
};

Input.propTypes = {
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        displayValue: PropTypes.string.isRequired
      }).isRequired
    )
  }).isRequired,
  value: PropTypes.string,
  valid: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

export default Input;
