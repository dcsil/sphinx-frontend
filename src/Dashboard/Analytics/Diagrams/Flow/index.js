import React from 'react';
import { Paper } from '@material-ui/core';
import BarChart from './bar.js';

const Flow = () => {
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
          yLabel="Bytes"
          title={['Average Flow Bytes Sent', 'Average Flow Bytes Received']}
          attribute={['FlowBytesSent', 'FlowBytesReceived']}
          colors={['#0022ff50', '#ff007b50']}
        />
      </Paper>
      <Paper elevation={3} style={{ width: '48%' }}>
        <BarChart
          yLabel="Bytes / Sec"
          title={['Average Flow Sent Rate', 'Average Flow Received Rate']}
          attribute={['FlowSentRate', 'FlowReceivedRate']}
          colors={['#19d90050', '#f2aa0050']}
        />
      </Paper>
    </div>
  );
};
// function mapStateToProps(state, ownProps) {
//   return {
//     traffic: state.traffic,
//   };
// }
// export default connect(mapStateToProps)(Flow);
export default Flow;
