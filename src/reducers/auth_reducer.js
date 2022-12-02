import { GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAIL } from '../actions/types';

const intialState = {
  token: undefined,
  request: undefined,
  response: undefined,
  promptAsync: undefined
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GOOGLE_LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case GOOGLE_LOGIN_FAIL:
      return { ...state, token: undefined };
    default:
      return state;
  }
}
