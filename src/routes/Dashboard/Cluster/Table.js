import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { int2time } from '../../../utils/timeStamp';
import { DATA_NAMING, DATA_UNIT } from './constant';

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    width: '100%',
  },
});

export default function InfoTable(props) {
  const classes = useStyles();
  var logs = props.logs;
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
            if (['id'].findIndex(l => l === key) === -1) {
              return (
                <TableRow key={key}>
                  <TableCell key={logs.id + key} component="th" scope="row">
                    {DATA_NAMING[key]}
                  </TableCell>
                  <TableCell key={logs.id + logs[key]} align="right">
                    {key === 'TimeStamp' ? int2time(logs[key]) : logs[key].toString()}
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
