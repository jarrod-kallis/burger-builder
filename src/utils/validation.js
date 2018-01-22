export const isValid = (value, rules) => {
  let result = true;

  if (rules) {
    if (rules.required && (!value || !value.trim())) {
      result = false;
    }

    if (
      result &&
      rules.minLength &&
      (!value || value.length < rules.minLength)
    ) {
      result = false;
    }

    if (
      result &&
      rules.maxLength &&
      (!value || value.length > rules.maxLength)
    ) {
      result = false;
    }

    if (result && rules.isEmail) {
      const pattern = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      result = pattern.test(value);
    }
  }

  return result;
};

export default isValid;
