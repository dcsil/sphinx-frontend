import axios from 'axios';
import { NODE_SERVER } from '../../utils/endpoints';
import { GENERATE_RANDOM } from '../constant/trafficActionTypes.js';

const random = () => dispatch => {
  dispatch({ type: GENERATE_RANDOM });
};

export const traffic = {
  random,
};
