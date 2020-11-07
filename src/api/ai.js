import axios from 'axios';
import { AI_URL } from '../utils/endpoints';

const defaultConfig = {
  timeout: 5000,
};

export function testFlaskEnv() {
  return axios.get(
    AI_URL,
    {
      mode: 'cors',
      credentials: 'include',
    },
    defaultConfig
  );
}
