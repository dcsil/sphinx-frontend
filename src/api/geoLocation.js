import axios from 'axios';

const KEY = 'ecb8087b90f3e8aa36a450937d1c9a7c';
// const PROXY = 'https://cors-anywhere.herokuapp.com/';
// const BACKEND_URL = 'http://www.geoplugin.net/json.gp?ip=';
const BACKEND_URL = 'http://api.ipstack.com/';

const defaultConfig = {
  timeout: 5000,
};

// export function findIpLocation(ip) {
//   return axios.get(
//     PROXY + BACKEND_URL + ip,
//     {
//       mode: 'no-cors',
//       credentials: 'include',
//     },
//     defaultConfig
//   );
// }
export function findIpLocation(ip) {
  return axios.get(
    BACKEND_URL + ip + '?access_key=' + KEY,
    {
      mode: 'no-cors',
      credentials: 'include',
    },
    defaultConfig
  );
}
