import React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import BarChart from '../../../../../components/BarChart';

const PACKET = [
  {
    yLabel: 'Bits / Sec',
    title: 'Average Packet Length',
    attribute: 'PacketLengthMean',
    color: '#00ffb270',
  },
  {
    yLabel: 'Seconds',
    title: 'Average Packet Time',
    attribute: 'PacketTimeMean',
    color: '#00c8ff70',
  },
];

const Packet = props => {
  return (
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
      {PACKET.map(item => (
        <Paper key={item.title} elevation={3} style={{ width: '48%' }}>
          <BarChart logs={props.traffic.logs} {...item} />
        </Paper>
      )).flat(Infinity)}
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(Packet);
