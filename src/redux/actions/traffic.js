// import axios from 'axios';
// import { NODE_SERVER } from '../../utils/endpoints';
import { GENERATE_RANDOM, UPDATE_LABEL } from '../constant/trafficActionTypes.js';

const random = () => dispatch => {
  dispatch({ type: GENERATE_RANDOM });
};

const update_label = (id, label) => dispatch => {
  dispatch({ type: UPDATE_LABEL, id: id, label: label });
};

export const traffic = {
  random,
  update_label,
};
