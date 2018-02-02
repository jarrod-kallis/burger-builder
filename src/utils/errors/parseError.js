import ERROR_CODES from './types';

export default error => {
  let errorMessage = error.message;

  if (
    error.response.data.error.message &&
    ERROR_CODES[error.response.data.error.message]
  ) {
    errorMessage = ERROR_CODES[error.response.data.error.message];
  }

  return errorMessage;
};