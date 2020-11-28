import React from 'react';
import AntTable from './table';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { LABELS } from '../../model/traffic.js';
import BlockList from './BlockList';

var percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
];
var getColorForPercentage = function (pct) {
  // CREDIT: https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
    r: Math.floor((lower.color.r * pctLower + upper.color.r * pctUpper) * 0.8),
    g: Math.floor((lower.color.g * pctLower + upper.color.g * pctUpper) * 0.8),
    b: Math.floor((lower.color.b * pctLower + upper.color.b * pctUpper) * 0.8),
  };
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  // or output as hex if preferred
};

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
