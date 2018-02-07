import {
  USER_SIGNUP_START,
  USER_SIGNUP_FAILED,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESSFUL,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  SET_REDIRECT_URL
} from '../actions/types';

const initialState = {
  user: {},
  error: '',
  loading: false,
  redirectUrl: '/'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_START:
    case USER_LOGIN_START:
      return {
        ...state,
        user: {},
        error: '',
        loading: true
      };
    case USER_LOGIN_SUCCESSFUL:
      return {
        ...state,
        user: action.user,
        error: '',
        loading: false
      };
    case USER_SIGNUP_FAILED:
    case USER_LOGIN_FAILED:
      return {
        ...state,
        user: {},
        error: action.error,
        loading: false
      };
    case USER_LOGOUT:
      return initialState;
    case SET_REDIRECT_URL:
      return {
        ...state,
        redirectUrl: action.url
      };
    default:
      return state;
  }
};
