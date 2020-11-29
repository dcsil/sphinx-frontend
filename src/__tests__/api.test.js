import axios from 'axios';
import { NODE_SERVER } from '../utils/endpoints';
import { findIpLocation } from '../api/geoLocation';

describe('API test suite', () => {
  it('Test `/test` route', async () => {
    const { data, status } = await axios.get(`${NODE_SERVER}/test`);
    expect(status).toBe(200);
    expect(data).toBe('welcome, admin');
  });
  it('Test `/debug-sentry` route', done => {
    axios
      .get(`${NODE_SERVER}/debug-sentry`)
      .then(res => {
        done.fail(new Error('This is the error'));
      })
      .catch(err => {
        expect(err.message).toBe('Request failed with status code 500');
        done();
      });
  });
  it('Test `/traffic` route', async () => {
    const { data, status } = await axios.get(`${NODE_SERVER}/traffic?startTime=0&endTime=10`);
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThanOrEqual(0);
  });
});

// describe('Test geoLocation API', () => {
//   it('Test `/traffic` API', async () => {
//     const { data, status } = await axios.get(`${NODE_SERVER}/traffic?startTime=0&endTime=10`);
//     expect(status).toBe(200);
//     expect(data.length).toBeGreaterThanOrEqual(0);
//   });
// })
