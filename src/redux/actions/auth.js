import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_OUT } from '../actionTypes';

import { NODE_SERVER } from '../../endpoints';

import { history } from '../../history';

import axios from 'axios';

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

        history.push('/private');
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
