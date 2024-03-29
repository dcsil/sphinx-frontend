import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { int2time } from '../utils/timeStamp';

const PARAM = {
  SourceIP: { unit: '', naming: 'Source IP' },
  DestinationIP: { unit: '', naming: 'Destination IP' },
  SourcePort: { unit: '', naming: 'Source Port' },
  DestinationPort: { unit: '', naming: 'Destination Port' },
  TimeStamp: { unit: '', naming: 'Time Stamp' },
  Duration: { unit: 'seconds', naming: 'Duration' },
  FlowBytesSent: { unit: 'bytes', naming: 'Total Bytes Sent' },
  FlowSentRate: { unit: 'bytes / sec', naming: 'Flow Sent Rate' },
  FlowBytesReceived: { unit: 'bytes', naming: 'Total Bytes Received' },
  FlowReceivedRate: { unit: 'bytes / sec', naming: 'Flow Received Rate' },
  PacketLengthMean: { unit: 'bytes / sec', naming: 'Avg Packet Length' },
  PacketTimeMean: { unit: 'seconds', naming: 'Packet Time' },
  ResponseTimeTimeMean: { unit: 'seconds', naming: 'Avg Response Time' },
  DoH: { unit: '', naming: 'DNS over HTTPS' },
  label: { unit: '', naming: 'label' },
};

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    width: '100%',
  },
});

const to3Decimal = (number, attr) => {
  if (attr === 'TimeStamp') return int2time(number);
  return Math.round(number * 1000) / 1000;
};

export default function InfoTable(props) {
  const classes = useStyles();
  const renderHeader = () => {
    return (
      <TableHead>
        <TableRow>
          {['Parameters', 'Values']
            .map((title, i) => (
              <TableCell
                key={title}
                style={{ fontWeight: '800' }}
                align={i === 1 ? 'right' : 'left'}
              >
                {title}
              </TableCell>
            ))
            .flat(Infinity)}
        </TableRow>
      </TableHead>
    );
  };

  const renderBody = logs => {
    return (
      <TableBody>
        {Object.keys(logs).map(key => {
          if (['id'].findIndex(l => l === key) === -1) {
            return (
              <TableRow key={key}>
                <TableCell key={logs.id + key} component="th" scope="row">
                  {PARAM[key]?.naming}
                </TableCell>
                <TableCell key={logs.id + logs[key]} align="right">
                  {typeof logs[key] === 'number'
                    ? to3Decimal(logs[key], key).toString()
                    : logs[key].toString()}
                  <span style={{ color: '#666', marginLeft: 5 }}>{PARAM[key]?.unit}</span>
                </TableCell>
              </TableRow>
            );
          } else return null;
        })}
      </TableBody>
    );
  };

  return (
    <TableContainer component={Paper} style={{ width: '100%' }}>
      <Table className={classes.table} aria-label="table">
        {renderHeader()}
        {renderBody(props.logs)}
      </Table>
    </TableContainer>
  );
}
