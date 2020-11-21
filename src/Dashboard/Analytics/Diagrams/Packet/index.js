import React from 'react';
import { connect } from 'react-redux';
import { findIpLocation } from '../../../../api/geoLocation.js';
import { Paper } from '@material-ui/core';
import BarChart from './bar.js';

var randomColor = require('randomcolor');

const Packet = ({ traffic }) => {
  return (
    // <Dashboard>
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 30px',
      }}
    >
      <Paper elevation={3} style={{ width: '90%' }}>
        <BarChart
          title={['Packet Length', 'Packet Time']}
          attribute={['PacketLengthMean', 'PacketTimeMean']}
          colors={[
            randomColor({ luminosity: 'bright' }) + '50',
            randomColor({ luminosity: 'bright' }) + '50',
          ]}
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
export default connect(mapStateToProps)(Packet);
