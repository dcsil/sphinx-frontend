import React from 'react';
import { connect } from 'react-redux';
// import { findIpLocation } from '../../../../api/geoLocation.js';
import { Paper } from '@material-ui/core';
import BarChart from './bar.js';

const Packet = ({ traffic }) => {
  return (
    // <Dashboard>
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '10px 30px',
      }}
    >
      <Paper elevation={3} style={{ width: '48%' }}>
        <BarChart
          title={['Packet Length']}
          attribute={['PacketLengthMean']}
          colors={['#00ffb270']}
        />
      </Paper>
      <Paper elevation={3} style={{ width: '48%' }}>
        <BarChart title={['Packet Time']} attribute={['PacketTimeMean']} colors={['#00c8ff70']} />
      </Paper>
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(Packet);
