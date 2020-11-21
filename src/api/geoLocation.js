import axios from 'axios';

const PROXY = 'https://cors-anywhere.herokuapp.com/';
// const PROXY = "";
const BACKEND_URL = 'http://www.geoplugin.net/json.gp?ip=';
const defaultConfig = {
  timeout: 5000,
};

export function findIpLocation(ip) {
  return axios.get(
    PROXY + BACKEND_URL + ip,
    {
      mode: 'no-cors',
      credentials: 'include',
    },
    defaultConfig
  );
}
