import React from 'react';
import AntTable from './table';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { LABELS } from '../../../model/traffic.js';
import BlockList from './BlockList';
import { getColorForPercentage } from '../../../utils/color';

const EventLog = props => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          width: '22%',
          padding: 20,
        }}
      >
        <Paper
          elevation={3}
          style={{ padding: 20, display: 'flex', flexDirection: 'column', marginBottom: 20 }}
          align={'center'}
        >
          <span> Total Malicious Count </span>
          <span
            style={{
              fontSize: 40,
              color: getColorForPercentage(Math.max(5 - props.malicious.length, 0) / 5),
            }}
          >
            {props.malicious.length}
          </span>
        </Paper>
        <BlockList />
      </div>
      <div
        style={{
          width: '77%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        {/* <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
        </div> */}
        <AntTable
          data={props.logs.map(l => {
            return { key: l.id, ...l };
          })}
        />
        {/* <LogTable logs={props.logs} /> */}
      </div>
    </div>
  );
};

// export default EventLog;
function mapStateToProps(state, ownProps) {
  return {
    logs: state.traffic.logs,
    malicious: state.traffic.logs.filter(
      t =>
        t.label === LABELS.MALICIOUS && state.traffic.blockList.findIndex(b => b === t.SourceIP) < 0
    ),
  };
}
export default connect(mapStateToProps)(EventLog);
