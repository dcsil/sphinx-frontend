import { int2time } from '../../../utils/timeStamp';
import { LABELS } from '../../../model/traffic';
import { Tag } from 'antd';

export const to4Decimal = number => {
  return Math.round(number * 10000) / 10000;
};

export const COLUMN = [
  {
    dataIndex: 'label',
    title: 'Prediction',
    key: 'label',
    fixed: 'left',
    render: tag => {
      let color;
      if (tag === LABELS.BENIGN) {
        color = 'green';
      } else if (tag === LABELS.MALICIOUS) {
        color = 'volcano';
      } else {
        color = '#666666';
      }
      return (
        <Tag color={color} key={tag}>
          {tag}
        </Tag>
      );
    },
    sorter: (a, b) => {
      console.log(a, b);
      if (a.label === LABELS.BENIGN) return 0;
      if (a.label === LABELS.MALICIOUS) return -1;
      return 1;
    },
  },
  {
    dataIndex: 'SourceIP',
    title: 'Source IP',
    key: 'SourceIP',
    fixed: 'left',
  },
  {
    dataIndex: 'DestinationIP',
    title: 'Destination IP',
    key: 'DestinationIP',
  },
  {
    dataIndex: 'SourcePort',
    title: 'Source Port',
    key: 'SourcePort',
  },
  {
    dataIndex: 'DestinationPort',
    title: 'Destination Port',
    key: 'DestinationPort',
  },
  {
    dataIndex: 'TimeStamp',
    title: 'Time Stamp',
    key: 'TimeStamp',
    render: time => int2time(time),
    sorter: (a, b) => a.TimeStamp - b.TimeStamp,
  },
  {
    dataIndex: 'Duration',
    title: 'Duration (sec)',
    key: 'Duration',
    render: v => to4Decimal(v),
    sorter: (a, b) => a.Duration - b.Duration,
  },
  {
    dataIndex: 'FlowBytesSent',
    title: 'Flow Bytes Sent (byte)',
    key: 'FlowBytesSent',
    sorter: (a, b) => a.FlowBytesSent - b.FlowBytesSent,
  },
  {
    dataIndex: 'FlowSentRate',
    title: 'Flow Sent Rate  (byte/sec)',
    key: 'FlowSentRate',
    render: v => to4Decimal(v),
    sorter: (a, b) => a.FlowSentRate - b.FlowSentRate,
  },
  {
    dataIndex: 'FlowBytesReceived',
    title: 'Flow Bytes Received  (sec)',
    key: 'FlowBytesReceived',
    sorter: (a, b) => a.FlowBytesReceived - b.FlowBytesReceived,
  },
  {
    dataIndex: 'FlowReceivedRate',
    title: 'Flow Received Rate (byte/sec)',
    key: 'FlowReceivedRate',
    render: v => to4Decimal(v),
    sorter: (a, b) => a.FlowReceivedRate - b.FlowReceivedRate,
  },
  {
    dataIndex: 'PacketLengthMean',
    title: 'Mean Packet Length (bit/sec)',
    key: 'PacketLengthMean',
    render: v => to4Decimal(v),
    sorter: (a, b) => a.PageLengthMean - b.PageLengthMean,
  },
  {
    dataIndex: 'PacketTimeMean',
    title: 'Mean Packet Time (sec)',
    key: 'PacketTimeMean',
    render: v => to4Decimal(v),
    sorter: (a, b) => a.PacketTimeMean - b.PacketTimeMean,
  },
  {
    dataIndex: 'ResponseTimeTimeMean',
    title: 'Mean Response Time (sec)',
    key: 'ResponseTimeTimeMean',
    render: v => to4Decimal(v),
    sorter: (a, b) => a.ResponseTimeTimeMean - b.ResponseTimeTimeMean,
  },
  {
    dataIndex: 'DoH',
    title: 'DNS over HTTPS',
    key: 'DoH',
    render: bool => (bool ? 'True' : 'False'),
    sorter: (a, b) => (a.DoH === b.DoH ? 0 : a.DoH ? -1 : 1),
  },
];
