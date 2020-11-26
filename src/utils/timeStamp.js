import Traffic from '../model/traffic';
const NOW = Date.now();

function addZero(time) {
  var f_time = time < 10 ? '0' + time.toString() : time;
  return f_time;
}

export function int2time(int) {
  var t = new Date(NOW + int);
  t = {
    year: addZero(t.getFullYear()),
    month: addZero(t.getMonth()),
    date: addZero(t.getDate()),
    hour: addZero(t.getHours()),
    min: addZero(t.getMinutes()),
    sec: addZero(t.getSeconds()),
  };
  return t.year + '-' + t.month + '-' + t.date + '  ' + t.hour + ':' + t.min + ':' + t.sec;
}

export function int2sec(int) {
  var t = new Date(NOW + int);
  t = {
    year: addZero(t.getFullYear()),
    month: addZero(t.getMonth()),
    date: addZero(t.getDate()),
    hour: addZero(t.getHours()),
    min: addZero(t.getMinutes()),
    sec: addZero(t.getSeconds()),
  };
  return t.hour + ':' + t.min + ':' + t.sec;
}

export const arrSum = arr => arr.reduce((a, b) => a + b, 0);
export const getTimeWindow = (logs, WINDOW) => {
  var times = logs.map(l => l.TimeStamp);
  var min = Math.min(...times);
  var max = Math.max(...times);
  return Math.max(max - min, WINDOW);
};

export const getCurrentTimeWindow = (time, INTERVAL) => {
  var results = [...Array(INTERVAL).keys()];
  for (var i in results) {
    results[i] = int2sec(time - results[i] * 750);
  }
  return results;
};

export const getData = (logs, attr, INTERVAL, WINDOW) => {
  if (attr) {
    return logs.length === 0
      ? Array(INTERVAL).fill(0)
      : Traffic.partition(logs, attr, getTimeWindow(logs, WINDOW), INTERVAL).data.map(d =>
          d.length !== 0 ? arrSum(d) / d.length : 0
        );
  }
  return logs.length === 0
    ? Array(INTERVAL).fill(0)
    : Traffic.partition(logs, undefined, getTimeWindow(logs, WINDOW), INTERVAL).data.map(
        d => d.length
      );
};
