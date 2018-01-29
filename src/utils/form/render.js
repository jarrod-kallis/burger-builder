import React from 'react';

import Input from '../../components/UI/Forms/Input/Input';

// Create the state properties for the input
export const createElement = (
  elementType,
  type,
  name,
  label,
  onChangeHandler,
  value,
  validation = {},
  errorMessage,
  isValidFunction,
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
  valid: isValidFunction(value, validation),
  errorMessage
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
          errorMessage={state[key].errorMessage}
        />
      );
    } else {
      return renderInputComponents(state[key]);
    }
    return prev;
  }, []);

  return componentArray;
};
