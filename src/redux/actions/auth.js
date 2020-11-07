import axios from 'axios';
import { NODE_SERVER } from '../../utils/endpoints';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actionTypes';

function login(payload) {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST });

    axios.post(`${NODE_SERVER}/login`, payload).then(
      res => {
        const { token } = res.data;
        localStorage.setItem('user', token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: token,
        });

        // history.push('/dashboard');
      },
      error => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: error,
        });
      }
    );
  };
}

export const auth = {
  login,
};
