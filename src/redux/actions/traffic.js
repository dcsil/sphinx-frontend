// import axios from 'axios';
// import { NODE_SERVER } from '../../utils/endpoints';
import { GENERATE_RANDOM, UPDATE_LABEL } from '../constant/trafficActionTypes.js';
import Traffic from '../../model/traffic.js';
import { LABELS } from '../../model/traffic.js';
import { predict } from '../../api/ai.js';

const random = () => dispatch => {
  let log = Traffic.random();
  predict(log)
    .then(res => {
      log.label = res.data.data === 0 ? LABELS.BENIGN : LABELS.MALICIOUS;
      dispatch({ type: GENERATE_RANDOM, log: log });
    })
    .catch(err => {
      console.log(err);
      log.label = LABELS.UNKNOWN;
      dispatch({ type: GENERATE_RANDOM, log: log });
    });
};

const update_label = (id, label) => dispatch => {
  dispatch({ type: UPDATE_LABEL, id: id, label: label });
};

export const traffic = {
  random,
  update_label,
};
