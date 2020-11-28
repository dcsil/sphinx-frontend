import axios from 'axios';
import { AI_URL } from '../utils/endpoints';

const defaultConfig = {
  timeout: 5000,
};

export async function predict(log) {
  var data = {
    SourceIP: log.SourceIP,
    DestinationIP: log.DestinationIP,
    SourcePort: log.SourcePort,
    DestinationPort: log.DestinationPort,
    Duration: log.Duration,
    FlowBytesSent: log.FlowBytesSent,
    FlowSentRate: log.FlowSentRate,
    FlowBytesReceived: log.FlowBytesReceived,
    FlowReceivedRate: log.FlowReceivedRate,
    PacketLengthMean: log.PacketLengthMean,
    PacketTimeMean: log.PacketTimeMean,
    ResponseTimeTimeMean: log.ResponseTimeTimeMean,
    DoH: log.DoH,
  };
  return axios.post(AI_URL + '/predict', data, defaultConfig);
}

export async function cluster(logs) {
  var data = logs.map(l => [
    l.TimeStamp,
    l.Duration,
    l.FlowBytesSent,
    l.FlowSentRate,
    l.FlowBytesReceived,
    l.FlowReceivedRate,
    l.PacketLengthMean,
    l.PacketTimeMean,
    l.ResponseTimeTimeMean,
    l.DoH ? 1 : 0,
  ]);
  return axios.post(AI_URL + '/cluster', { logs: data }, defaultConfig);
}
