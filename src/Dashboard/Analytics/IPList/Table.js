import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    width: '100%',
  },
});

const DATA_UNIT = {
  DestinationIP: '',
  SourcePort: '',
  DestinationPort: '',
  Duration: 'seconds',
  FlowBytesSent: 'bytes',
  FlowSentRate: 'bytes / sec',
  FlowBytesReceived: 'bytes',
  FlowReceivedRate: 'bytes / sec',
  PacketLengthMean: 'bytes / sec',
  PacketTimeMean: 'seconds',
  ResponseTimeTimeMean: 'seconds',
  DoH: '',
};
const DATA_NAMING = {
  DestinationIP: 'Destination IP',
  SourcePort: 'Source Port',
  DestinationPort: 'Destination Port',
  Duration: 'Duration',
  FlowBytesSent: 'Total Bytes Sent',
  FlowSentRate: 'Flow Sent Rate',
  FlowBytesReceived: 'Total Bytes Received',
  FlowReceivedRate: 'Flow Received Rate',
  PacketLengthMean: 'Avg Packet Length',
  PacketTimeMean: 'Packet Time',
  ResponseTimeTimeMean: 'Avg Response Time',
  DoH: 'DNS over HTTPS',
};

export default function InfoTable(props) {
  const classes = useStyles();
  var logs = props.logs;
  console.log(logs);
  return (
    <TableContainer component={Paper} style={{ width: '100%' }}>
      <Table className={classes.table} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: '800' }}>Paramters</TableCell>
            <TableCell style={{ fontWeight: '800' }} align="right">
              Values
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(logs).map(key => {
            if (['id', 'SourceIP', 'label', 'TimeStamp'].findIndex(l => l === key) === -1) {
              return (
                <TableRow key={key}>
                  <TableCell key={logs.id + key} component="th" scope="row">
                    {DATA_NAMING[key]}
                  </TableCell>
                  <TableCell key={logs.id + logs[key]} align="right">
                    {logs[key].toString()}
                    <span style={{ color: '#666', marginLeft: 5 }}>{DATA_UNIT[key]}</span>
                  </TableCell>
                </TableRow>
              );
            } else return null;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
