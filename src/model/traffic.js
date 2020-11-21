import uuid from 'react-uuid';
// import { traffic } from '../redux/actions/traffic';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function getRandomBool() {
  return getRandomInt(10) > getRandomInt(100);
}
function getRandomIP() {
  var ip =
    getRandomInt(200).toString() +
    '.' +
    getRandomInt(10).toString() +
    '.' +
    getRandomInt(10).toString() +
    '.' +
    getRandomInt(10).toString();
  return ip;
}

export const LABELS = {
  MALICIOUS: 'MALICIOUS',
  BENIGN: 'BENIGN',
  UNKNOWN: 'UNKNOWN',
  FALSE: 'FALSE_POSITIVE',
};

export default class Traffic {
  constructor(
    id,
    SourceIP,
    DestinationIP,
    SourcePort,
    DestinationPort,
    TimeStamp,
    Duration,
    FlowBytesSent,
    FlowSentRate,
    FlowBytesReceived,
    FlowReceivedRate,
    PacketLengthMean,
    PacketTimeMean,
    ResponseTimeTimeMean,
    DoH,
    label
  ) {
    this.id = id;
    this.SourceIP = SourceIP;
    this.DestinationIP = DestinationIP;
    this.SourcePort = SourcePort;
    this.DestinationPort = DestinationPort;
    this.TimeStamp = TimeStamp;
    this.Duration = Duration;
    this.FlowBytesSent = FlowBytesSent;
    this.FlowSentRate = FlowSentRate;
    this.FlowBytesReceived = FlowBytesReceived;
    this.FlowReceivedRate = FlowReceivedRate;
    this.PacketLengthMean = PacketLengthMean;
    this.PacketTimeMean = PacketTimeMean;
    this.ResponseTimeTimeMean = ResponseTimeTimeMean;
    this.DoH = DoH;
    this.label = label || LABELS.UNKNOWN;
  }

  static fromResponseBody(object) {
    return new Traffic(
      object.id,
      object.SourceIP,
      object.DestinationIP,
      object.SourcePort,
      object.DestinationPort,
      object.TimeStamp,
      object.Duration,
      object.FlowBytesSent,
      object.FlowSentRate,
      object.FlowBytesReceived,
      object.FlowReceivedRate,
      object.PacketLengthMean,
      object.PacketTimeMean,
      object.ResponseTimeTimeMean,
      object.DoH
    );
  }

  static random() {
    return new Traffic(
      uuid(),
      getRandomIP(),
      getRandomIP(),
      getRandomInt(200),
      getRandomInt(200),
      getRandomInt(9999),
      getRandomInt(9999),
      getRandomInt(999999),
      Math.round(Math.random() * 100) / 100 + getRandomInt(999),
      getRandomInt(999999),
      Math.round(Math.random() * 100) / 100 + getRandomInt(999),
      getRandomInt(999),
      getRandomInt(999),
      Math.round(Math.random() * 100) / 100 + getRandomInt(999),
      getRandomBool(),
      getRandomBool() ? LABELS.MALICIOUS : LABELS.BENIGN
    );
  }

  static partition(logs, attr, window, num) {
    var time = logs.map(l => l.TimeStamp);
    var max = Math.max(...time);
    var min = max - window;
    var interval = Math.round(window / num);
    var labels = [];
    var data = [];
    for (let i = 0; i < num; i++) {
      let low, high;
      low = min + i * interval;
      high = min + (i + 1) * interval;
      labels.push(high);
      var partition = logs.filter(l => l.TimeStamp > low).filter(l => l.TimeStamp <= high);
      if (attr) {
        partition = partition.map(p => p[attr]);
      }
      data.push(partition);
    }
    return { data: data, labels: labels };
  }

  toJson() {
    return {
      id: this.id,
      SourceIP: this.SourceIP,
      DestinationIP: this.DestinationIP,
      SourcePort: this.SourcePort,
      DestinationPort: this.DestinationPort,
      TimeStamp: this.TimeStamp,
      Duration: this.Duration,
      FlowBytesSent: this.FlowBytesSent,
      FlowSentRate: this.FlowSentRate,
      FlowBytesReceived: this.FlowBytesReceived,
      FlowReceivedRate: this.FlowReceivedRate,
      PacketLengthMean: this.PacketLengthMean,
      PacketTimeMean: this.PacketTimeMean,
      ResponseTimeTimeMean: this.ResponseTimeTimeMean,
      DoH: this.DoH,
    };
  }
}
