import { combineReducers } from 'redux';
import auth from './auth.js';
import traffic from './traffic.js';

export default combineReducers({ auth, traffic });
