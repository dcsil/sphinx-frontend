import React from 'react';
import { connect } from 'react-redux';
import MonitoringLineChart from './LineChart.js';

const Monitoring = ({ traffic }) => {
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <div style={{ width: '48%' }}>
        <MonitoringLineChart
          logs={traffic.logs}
          color={'#3093fc'}
          title="Traffic Occurrence"
          yLabel="Num Occurrence"
        />
      </div>
      <div style={{ width: '48%' }}>
        {/* <Button onClick={refresh}>REFRESH</Button> */}
        <MonitoringLineChart
          logs={traffic.logs}
          color={'#00ff00'}
          title="Average Duration"
          attribute={'Duration'}
          yLabel="Seconds"
        />
      </div>
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(Monitoring);
