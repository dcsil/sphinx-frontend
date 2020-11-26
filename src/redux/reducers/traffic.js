import { GENERATE_RANDOM, UPDATE_LABEL } from '../constant/trafficActionTypes.js';
import Traffic from '../../model/traffic.js';

let logs = [];
for (var i = 1; i < 30; i++) {
  logs.push(Traffic.random());
}
const initialState = {
  logs: logs,
};

const traffic = (state = initialState, action) => {
  var logs = state.logs;
  switch (action.type) {
    case GENERATE_RANDOM: {
      logs.push(action.log);
      return {
        ...state,
        logs: logs,
      };
    }

    case UPDATE_LABEL: {
      var index = logs.findIndex(t => t.id === action.id);
      logs[index].label = action.label;
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
