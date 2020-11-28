import axios from 'axios';
import { NODE_SERVER } from '../utils/endpoints';

const defaultConfig = {
  timeout: 5000,
};

export function get_traffic(startTime, endTime) {
  return axios.get(
    NODE_SERVER + '/traffic',
    { params: { startTime: startTime, endTime: endTime } },
    defaultConfig
  );
}
