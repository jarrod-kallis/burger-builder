export const isValidForm = state => {
  const result = Object.entries(state).reduce((prev, [key]) => {
    if (state[key].elementType) {
      return prev && state[key].valid;
    }
    return isValidForm(state[key]);
  }, true);

  return result;
};

export default isValidForm;
