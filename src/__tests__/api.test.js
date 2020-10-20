import axios from 'axios';
import { NODE_SERVER } from '../endpoints';

describe('API test suite', () => {
  it('Test `/test` route', async () => {
    const { data, status } = await axios.get(`${NODE_SERVER}/test`);
    expect(status).toBe(200);
    expect(data).toBe('Welcome to Sphinx App');
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
});
