import { GENERATE_RANDOM } from '../constant/trafficActionTypes.js';
import Traffic from '../../model/traffic.js';

let logs = [];
for (var i = 1; i < 30; i++) {
  logs.push(Traffic.random());
}
const initialState = {
  logs: logs,
};

const traffic = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_RANDOM: {
      var logs = state.logs;
      logs.push(Traffic.random());
      return {
        ...state,
        logs: logs,
      };
    }

    default:
      return state;
  }
};

export default traffic;
