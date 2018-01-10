import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Input.css';

const Input = props => {
  let inputElement = null;
  const id = Math.random();

  switch (props.elementType) {
    case 'select':
      inputElement = (
        <select
          className={cssClasses.InputElement}
          id={id}
          onChange={props.elementConfig.onChange}
          name={props.elementConfig.name}
          value={props.value}
        >
          {props.elementConfig.options.map(option => (
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
          className={cssClasses.InputElement}
          id={id}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={cssClasses.Input}>
      <label htmlFor={id} className={cssClasses.Label}>
        {props.elementConfig.label}
      </label>
      {inputElement}
    </div>
  );
};

Input.defaultProps = {
  options: []
};

Input.propTypes = {
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        displayValue: PropTypes.string.isRequired
      }).isRequired
    )
  }).isRequired,
  value: PropTypes.string.isRequired
};

export default Input;
