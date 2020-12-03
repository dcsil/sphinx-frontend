import { getColorForPercentage } from '../utils/color';
import * as time from '../utils/timeStamp';
import Traffic from '../model/traffic';

describe('Test utils/', () => {
  it('test utils/color', async () => {
    var color_1 = getColorForPercentage(0.3);
    var color_2 = getColorForPercentage(0.8);
    expect(typeof color_1).toBe('string');
    expect(typeof color_2).toBe('string');
  });
  it('test utils/timeStamp', async () => {
    let timeObject = time.getTimeObject(10);
    for (var k in timeObject) {
      expect(timeObject[k]).not.toBeNull();
    }
    let date = time.int2time(123);
    expect(typeof date).toBe('string');
    let sec = time.int2sec(123);
    expect(typeof sec).toBe('string');

    let tList = [];
    for (var i = 0; i < 20; i++) {
      tList.push(Traffic.random());
    }
    let wind = time.getTimeWindow(tList, 30);
    expect(wind).toBeGreaterThanOrEqual(0);

    wind = time.getCurrentTimeWindow(Date.now(), 2);
    expect(wind.length).toEqual(2);

    let par_data = time.getData(tList, undefined, 2, 20);
    expect(par_data.length).toEqual(2);
    par_data = time.getData([[], []], undefined, 2, 20);
    expect(par_data.length).toEqual(2);
    par_data = time.getData(tList, 'Duration', 2, 20);
    expect(par_data.length).toEqual(2);
    par_data = time.getData([], 'Duration', 2, 20);
    expect(par_data.length).toEqual(2);
  });
});
