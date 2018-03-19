import ERROR_CODES from './types';

export default error => {
  let errorMessage = error.message;

  if (
    error.response &&
    error.response.data &&
    error.response.data.error &&
    error.response.data.error.message &&
    ERROR_CODES[error.response.data.error.message]
  ) {
    errorMessage = ERROR_CODES[error.response.data.error.message];
  } else if (
    error.response &&
    error.response.data &&
    error.response.data.error
  ) {
    errorMessage = error.response.data.error;
  }

  return errorMessage;
};
