import reducer from './user';
import { USER_LOGIN_SUCCESSFUL } from '../actions/types';

const initialState = {
  user: {},
  error: '',
  loading: false,
  redirectUrl: '/'
};

describe('User reducer', () => {
  it('should return initial state for an unknown action', () => {
    expect(reducer(undefined, { type: 'UNKNOWN ACTION' })).toEqual(
      initialState
    );
  });

  it('should store the token when user logs in', () => {
    expect(
      reducer(initialState, {
        type: USER_LOGIN_SUCCESSFUL,
        user: { idToken: '12345', localId: '54321' }
      })
    ).toEqual({
      ...initialState,
      user: { idToken: '12345', localId: '54321' }
    });
  });
});
