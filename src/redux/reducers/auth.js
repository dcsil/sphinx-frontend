import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_OUT } from '../actionTypes';

const isUser = localStorage.getItem('user');
const initialState = isUser ? { userToken: isUser } : { userToken: null };

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { requesting: true, error: null };

    case LOGIN_SUCCESS: {
      return { userToken: action.payload };
    }

    case LOGIN_FAILURE: {
      return { error: action.payload };
    }

    case LOGIN_OUT: {
      localStorage.removeItem('user');
      return { userToken: null };
    }

    default:
      return state;
  }
}
