import React from 'react';
import Paper from '@material-ui/core/Paper';
import LineChart from './LineChart.js';
import CardPanel from './CardPanel.js';
import uuid from 'react-uuid';
import './styles.css';

var randomColor = require('randomcolor');
var getColor = () => randomColor({ luminosity: 'bright' });
const features = [
  { key: uuid(), title: 'Traffic Fequency', attribute: 'Duration', color: getColor() },
  { key: uuid(), title: 'Duration', attribute: 'Duration', color: getColor() },
  { key: uuid(), title: 'Packet Length', attribute: 'PacketLengthMean', color: getColor() },
  { key: uuid(), title: 'Packet Size', attribute: 'PacketTimeMean', color: getColor() },
  { key: uuid(), title: 'Byte Received', attribute: 'FlowBytesReceived', color: getColor() },
  { key: uuid(), title: 'Response Time', attribute: 'ResponseTimeTimeMean', color: getColor() },
  { key: uuid(), title: 'Response Time', attribute: 'ResponseTimeTimeMean', color: getColor() },
  { key: uuid(), title: 'Response Time', attribute: 'ResponseTimeTimeMean', color: getColor() },
];

const DashBoard = props => {
  const [select, setSelect] = React.useState(undefined);
  const renderCardPanel = features => {
    const onClick = index => setSelect(index);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          margin: '20px 0px',
        }}
      >
        {features
          .map((f, i) => {
            if (i < features.length - 1) {
              return <CardPanel {...f} onClick={() => onClick(f.key)} />;
            }
            return <CardPanel {...f} onClick={() => onClick(f.key)} islast />;
          })
          .flat(Infinity)}
      </div>
    );
  };
  const renderDetail = select => {
    if (select) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            // width: '100%',
            margin: '20px 0px',
          }}
        >
          <Paper elevation={1} style={{ width: '40%', padding: 2, marginRight: 20 }}>
            <LineChart {...features.find(f => f.key === select)} />
          </Paper>
        </div>
      );
    }
  };

  return (
    <div align="center" style={{ padding: '10px 30px', width: '100%' }}>
      {renderDetail(select)}
      {renderCardPanel(features.slice(0, 4))}
      {renderCardPanel(features.slice(4))}
    </div>
  );
};

export default DashBoard;
