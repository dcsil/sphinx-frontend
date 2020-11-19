import uuid from 'react-uuid';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function getRandomBool() {
  return Math.random(1) > Math.random(100);
}

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
    DoH
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
      '0.0.0.0',
      '1.1.1.1',
      getRandomInt(200),
      getRandomInt(200),
      getRandomInt(999999),
      getRandomInt(9999),
      getRandomInt(999999),
      Math.round(Math.random() * 100) / 100 + getRandomInt(999),
      getRandomInt(999999),
      Math.round(Math.random() * 100) / 100 + getRandomInt(999),
      getRandomInt(999),
      Math.round(Math.random() * 100) / 100 + getRandomInt(999),
      Math.round(Math.random() * 100) / 100 + getRandomInt(999),
      getRandomBool()
    );
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
