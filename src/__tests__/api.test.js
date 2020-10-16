import axios from 'axios';
import { NODE_SERVER } from '../endpoints';

describe('API test suite', () => {
  it('Test `test` route', async () => {
    const { data, status } = await axios.get(`${NODE_SERVER}/test`);
    expect(status).toBe(200);
    expect(data).toBe('Welcome to Sphinx App');
    console.log(process.env.NODE_ENV);
  });
});
