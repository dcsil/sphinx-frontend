import axios from 'axios';
import { NODE_SERVER } from '../utils/endpoints';
// import { findIpLocation } from '../api/geoLocation';
// import { predict, cluster } from '../api/ai';
import Traffic, { LABELS } from '../model/traffic';

describe('Taffic Model object test suite', () => {
  it('Test Traffic random', async () => {
    const randT = Traffic.random();
    expect(Object.keys(randT).length).toBe(16);
    expect(typeof randT.Duration).toBe('number');
  });
  it('Test Traffic fromResponseBody & toJson', async () => {
    const { data, status } = await axios.get(`${NODE_SERVER}/traffic?startTime=0&endTime=100`);
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThanOrEqual(0);
    const t = Traffic.fromResponseBody(data[0]);
    const json_file = t.toJson();
    expect(json_file.label).toBe(LABELS.UNKNOWN);
  });
  it('Test Traffic partition', async () => {
    const { data, status } = await axios.get(`${NODE_SERVER}/traffic?startTime=0&endTime=100`);
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThanOrEqual(0);
    expect(Traffic.partition(data, undefined, 100, 9).labels.length).toBe(9);
    expect(Traffic.partition(data, 'Duration', 100, 9).data.length).toBe(9);
  });
});
