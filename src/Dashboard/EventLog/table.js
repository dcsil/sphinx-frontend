import React from 'react';
import { Table, Tag } from 'antd';
import { LABELS } from '../../model/traffic';
import { traffic } from '../../redux/actions/traffic';
import { int2time } from '../../utils/timeStamp';
import { Button, Menu, Dropdown } from 'antd';
import {
  DownOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';

const to4Decimal = number => {
  return Math.round(number * 10000) / 10000;
};

const columns = [
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
  { dataIndex: 'SourceIP', title: 'Source IP', key: 'SourceIP', fixed: 'left' },
  { dataIndex: 'DestinationIP', title: 'Destination IP', key: 'DestinationIP' },
  { dataIndex: 'SourcePort', title: 'Source Port', key: 'SourcePort' },
  { dataIndex: 'DestinationPort', title: 'Destination Port', key: 'DestinationPort' },
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

class AntTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      data: props.data.reverse(),
    };
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selected: selectedRowKeys });
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
  }

  handleMenuClick(e) {
    let newLabel;
    if (e.key === '1') newLabel = LABELS.BENIGN;
    else if (e.key === '2') newLabel = LABELS.MALICIOUS;
    else if (e.key === '3') newLabel = LABELS.UNKNOWN;
    let new_data = this.state.data;
    this.state.selected.forEach(i => {
      this.props.update_label(i, newLabel);
      new_data.forEach((d, index) => {
        if (d.key === i) {
          new_data[index].label = newLabel;
        }
      });
    });
    this.setState({ data: this.state.data });
    this.setState({ selected: [] });
  }

  render() {
    const selectedRowKeys = this.state.selected;
    const rowSelection = {
      selectedRowKeys,
      ...this.rowSelection,
    };
    return (
      <>
        <div
          style={{
            width: '100%',
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'flex-end',
          }}
        >
          <Button
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
            onClick={() => this.setState({ data: this.props.data.reverse() })}
          >
            <SyncOutlined /> Refresh
          </Button>
          <Dropdown
            disabled={this.state.selected.length === 0}
            overlay={
              <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item
                  key="1"
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                >
                  <CheckCircleOutlined style={{ color: 'seagreen', fontSize: 20 }} /> Mark as Benign
                </Menu.Item>
                <Menu.Item
                  key="2"
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                >
                  <ExclamationCircleOutlined style={{ color: 'red', fontSize: 20 }} />
                  Mark as Malicious
                </Menu.Item>
                <Menu.Item
                  key="3"
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                >
                  <QuestionCircleOutlined style={{ color: 'grey', fontSize: 20 }} />
                  Mark as Unknown
                </Menu.Item>
              </Menu>
            }
          >
            <Button>
              Actions <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          rowSelection={{ ...rowSelection }}
          scroll={{ x: 4000, y: 500 }}
        />
      </>
    );
  }
}

const actions = {
  update_label: traffic.update_label,
};
export default connect(null, actions)(AntTable);
