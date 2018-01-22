import React from 'react';

import Input from '../../components/UI/Forms/Input/Input';
import { isValid } from '../validation';

// Create the state properties for the input
export const createElement = (
  elementType,
  type,
  name,
  label,
  onChangeHandler,
  value,
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
  value,
  validation,
  valid: isValid(value, validation)
});

// Create the HTML Input DOM element
export const renderInputComponents = state => {
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
      return renderInputComponents(state[key]);
    }
    return prev;
  }, []);

  return componentArray;
};
