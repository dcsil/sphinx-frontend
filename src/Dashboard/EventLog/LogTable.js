import React from 'react';
import { int2time } from '../../utils/timeStamp.js';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';

const columns = [
  { field: 'SourceIP', headerName: 'Source IP' },
  { field: 'DestinationIP', headerName: 'Destination IP', width: 130 },
  { field: 'SourcePort', headerName: 'Source Port', width: 120 },
  { field: 'DestinationPort', headerName: 'Destination Port', width: 150 },
  {
    field: 'TimeStamp',
    headerName: 'Time Stamp',
    // description: 'This column has a value getter and is not sortable.',
    width: 170,
    valueGetter: params => int2time(params.getValue('TimeStamp')),
  },
  { field: 'Duration', headerName: 'Duration', width: 120 },
  { field: 'FlowBytesSent', headerName: 'Flow Bytes Sent', width: 140 },
  { field: 'FlowSentRate', headerName: 'Flow Sent Rate', width: 140 },
  { field: 'FlowBytesReceived', headerName: 'Flow Bytes Received', width: 170 },
  { field: 'FlowReceivedRate', headerName: 'Flow Received Rate', width: 160 },
  { field: 'PacketLengthMean', headerName: 'Mean Packet Length', width: 165 },
  { field: 'PacketTimeMean', headerName: 'Mean Packet Time', width: 160 },
  { field: 'ResponseTimeTimeMean', headerName: 'Mean Response Time', width: 170 },
  { field: 'DoH', headerName: 'DoH', width: 70 },
  { field: 'label', headerName: 'Prediction', width: 120 },
];

class LogTable extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  // componentDidUpdate() {
  //   console.log('update');
  // }

  render() {
    return (
      <div style={{ height: 500, width: '100%', textAlign: 'center' }}>
        <DataGrid pageSize={7} pagination columns={columns} rows={this.props.logs} align="center" />
      </div>
    );
  }
}

// export default EventLog;
function mapStateToProps(state, ownProps) {
  return {
    logs: state.traffic.logs,
    // malicious: state.traffic.logs.filter(l => l.label === LABELS.MALICIOUS),
  };
}
export default connect(mapStateToProps)(LogTable);
