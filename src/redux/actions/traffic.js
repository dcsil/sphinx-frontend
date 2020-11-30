import {
  // GENERATE_RANDOM,
  UPDATE_LABEL,
  BLOCK_ADD,
  BLOCK_REMOVE,
  UPDATE_TRAFFIC,
} from '../constant/trafficActionTypes.js';
import Traffic from '../../model/traffic.js';
import { LABELS } from '../../model/traffic.js';
import { predict } from '../../api/ai.js';
import { get_traffic } from '../../api/backend';

// const random = () => dispatch => {
//   let log = Traffic.random();
//   // dispatch({ type: GENERATE_RANDOM, log: log });
//   predict(log)
//     .then(res => {
//       log.label = res.data.data === 0 ? LABELS.BENIGN : LABELS.MALICIOUS;
//       dispatch({ type: GENERATE_RANDOM, log: log });
//     })
//     .catch(err => {
//       console.log(err);
//       log.label = LABELS.UNKNOWN;
//       dispatch({ type: GENERATE_RANDOM, log: log });
//     });
// };

const update_traffic = (startTime, endTime) => dispatch => {
  get_traffic(startTime, endTime)
    .then(res => {
      if (res.data.length === 0) return;
      var data = [res.data[0]];
      data.forEach(d => {
        let log = Traffic.fromResponseBody(d);
        predict(log)
          .then(res => {
            log.label = res.data.data === 0 ? LABELS.BENIGN : LABELS.MALICIOUS;
            dispatch({ type: UPDATE_TRAFFIC, log: log });
          })
          .catch(err => {
            console.log(err);
            log.label = LABELS.UNKNOWN;
            dispatch({ type: UPDATE_TRAFFIC, log: log });
          });
      });
    })
    .catch(err => console.error(err));
};

const update_label = (id, label) => dispatch => {
  dispatch({ type: UPDATE_LABEL, id: id, label: label });
};

const blocklist_add = ip => dispatch => {
  dispatch({ type: BLOCK_ADD, ip: ip });
};

const blocklist_remove = ip => dispatch => {
  dispatch({ type: BLOCK_REMOVE, ip: ip });
};

export const traffic = {
  // random,
  update_label,
  blocklist_add,
  blocklist_remove,
  update_traffic,
};
