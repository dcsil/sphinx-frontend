import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_OUT } from '../actionTypes';

const isUser = localStorage.getItem('user');
const initialState = isUser ? { userToken: isUser } : { userToken: null };

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { requesting: true, error: null, isLoggedIn: false };

    case LOGIN_SUCCESS: {
      return { userToken: action.payload, requesting: false, isLoggedIn: true };
    }

    case LOGIN_FAILURE: {
      return { error: action.payload, isLoggedIn: false };
    }

    case LOGIN_OUT: {
      localStorage.removeItem('user');
      return { userToken: null, isLoggedIn: false };
    }

    default:
      return state;
  }
};

export default auth;
