import axios from 'axios';
import { NODE_SERVER } from '../utils/endpoints';
import { findIpLocation } from '../api/geoLocation';
import { predict, cluster } from '../api/ai';
import Traffic from '../model/traffic';

describe('API test suite', () => {
  it('Test `/test` route', async () => {
    const { data, status } = await axios.get(`${NODE_SERVER}/test`);
    expect(status).toBe(200);
    expect(data).toBe('welcome!');
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

describe('Test geoLocation API', () => {
  it('Test `/findIpLocation` API', async () => {
    findIpLocation('8.8.8.8')
      .then(res => {
        expect(res.status).toBe(200);
      })
      .catch(err => {
        throw new Error('Find geo-Info failed:' + err);
      });
  });
});

describe('Test Model API', done => {
  var randTraffic = Traffic.random();
  it('Test `/predict` API', async () => {
    predict(randTraffic)
      .then(res => {
        expect(res.status).toBe(200);
        expect(typeof res.data.data).toBe('number');
      })
      .catch(err => {
        throw new Error('Model prediction failed:' + err);
      });
  });

  it('Test `/cluster` API', async () => {
    // create Traffic array
    let tList = [randTraffic];
    for (var i = 0; i < 10; i++) {
      tList.push(Traffic.random());
    }
    cluster(tList)
      .then(res => {
        jest.setTimeout(
          setTimeout(() => {
            expect(res.status).toBe(200);
            expect(typeof res.data.data).toBe('array');
            expect(res.data.data.length).toBe(tList.length);
          }, 100)
        );
      })
      .catch(err => {
        throw new Error('AI Cluster Failed:' + err);
      });
  });
});
