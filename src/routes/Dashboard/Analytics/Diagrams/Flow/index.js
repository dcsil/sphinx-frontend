import React from 'react';
import { Paper } from '@material-ui/core';
import BarChart from '../../../../../components/BarChart';
import { connect } from 'react-redux';

const FLOW = [
  [
    {
      yLabel: 'Bytes',
      title: 'Average Flow Bytes Sent',
      attribute: 'FlowBytesSent',
      color: '#0022ff50',
    },
    {
      yLabel: 'Bytes',
      title: 'Average Flow Bytes Received',
      attribute: 'FlowBytesReceived',
      color: '#ff007b50',
    },
  ],
  [
    {
      yLabel: 'Bytes / Sec',
      title: 'Average Flow Sent Rate',
      attribute: 'FlowSentRate',
      color: '#19d90050',
    },
    {
      yLabel: 'Bytes / Sec',
      title: 'Average Flow Received Rate',
      attribute: 'FlowReceivedRate',
      color: '#f2aa0050',
    },
  ],
];

const Flow = ({ traffic }) => {
  return (
    <div
      style={{
        // width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'space-between',
        // justifyContent: 'space-between',
        padding: '10px 30px',
      }}
    >
      {FLOW.map((F, i) => (
        <div
          key={i.toString()}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // padding: '10px 30px',
            marginBottom: 20,
          }}
        >
          {F.map(f => (
            <Paper key={f.title} elevation={3} style={{ width: '48%' }}>
              <BarChart logs={traffic.logs} {...f} />
            </Paper>
          )).flat(Infinity)}
        </div>
      )).flat(Infinity)}
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(Flow);
