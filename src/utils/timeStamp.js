const NOW = Date.now();

function addZero(time) {
  var f_time = time < 10 ? '0' + time.toString() : time;
  return f_time;
}

export function int2time(int) {
  var t = new Date(NOW + int * 1000);
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
  var t = new Date(NOW + int * 1000);
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
