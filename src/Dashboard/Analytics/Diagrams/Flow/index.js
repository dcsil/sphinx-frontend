import React from 'react';
import { connect } from 'react-redux';
import { findIpLocation } from '../../../../api/geoLocation.js';
import { Paper } from '@material-ui/core';
import BarChart from './bar.js';

const Flow = ({ traffic }) => {
  return (
    // <Dashboard>
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 30px',
      }}
    >
      <Paper elevation={3} style={{ width: '48%' }}>
        <BarChart
          title={['FlowBytesSent', 'FlowBytesReceived']}
          attribute={['FlowBytesSent', 'FlowBytesReceived']}
          colors={['#0022ff50', '#ff007b50']}
        />
      </Paper>
      <Paper elevation={3} style={{ width: '48%' }}>
        <BarChart
          title={['FlowSentRate', 'FlowReceivedRate']}
          attribute={['FlowSentRate', 'FlowReceivedRate']}
          colors={['#19d90050', '#f2aa0050']}
        />
      </Paper>
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(Flow);
