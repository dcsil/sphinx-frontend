import {
  GENERATE_RANDOM,
  UPDATE_LABEL,
  BLOCK_ADD,
  BLOCK_REMOVE,
  UPDATE_TRAFFIC,
} from '../constant/trafficActionTypes.js';

let logs = [];
const initialState = {
  logs: logs,
  blockList: [],
};

const traffic = (state = initialState, action) => {
  var logs = state.logs;
  var blockList = state.blockList;
  switch (action.type) {
    case GENERATE_RANDOM: {
      logs.push(action.log);
      return {
        ...state,
        logs: logs,
      };
    }
    /* falls through */
    case UPDATE_TRAFFIC: {
      if (logs.findIndex(l => l.id === action.log.id) < 0) {
        logs.push(action.log);
        return {
          ...state,
          logs: logs,
        };
      }
      return state;
    }
    /* falls through */
    case UPDATE_LABEL: {
      var index = logs.findIndex(t => t.id === action.id);
      logs[index].label = action.label;
      return {
        ...state,
        logs: logs,
      };
    }
    /* falls through */
    case BLOCK_ADD: {
      let index = blockList.findIndex(i => i === action.ip);
      if (index < 0) {
        blockList.push(action.ip);
        return {
          ...state,
          blockList: blockList,
        };
      }
    }
    /* falls through */
    case BLOCK_REMOVE: {
      let index = blockList.findIndex(i => i === action.ip);
      if (index > -1) {
        blockList.splice(index, 1);
        return {
          ...state,
          blockList: blockList,
        };
      }
    }
    /* falls through */
    default:
      return state;
  }
};

export default traffic;
