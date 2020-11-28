import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from './Table.js';
import { connect } from 'react-redux';
import { traffic } from '../../../redux/actions/traffic.js';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const BlockList = ({ blockList, blockLogs, remove_block }) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={3}
      style={{ width: '100%', padding: 10, display: 'flex', flexDirection: 'column' }}
      align={'center'}
    >
      <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <BlockOutlinedIcon style={{ marginRight: 10 }} /> IP Block List{' '}
      </span>
      <span
        style={{
          fontSize: 50,
          color: '#666',
        }}
      >
        {' '}
        {blockList.length}{' '}
      </span>

      <div className={classes.root}>
        <Table blockLogs={blockLogs} blockList={blockList} remove={remove_block} />
      </div>
    </Paper>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    // traffic: state.traffic,
    // malicious: state.traffic.logs.filter(t => t.label === LABELS.MALICIOUS),
    blockList: state.traffic.blockList,
    blockLogs: state.traffic.logs.filter(
      t => state.traffic.blockList.findIndex(b => b === t.SourceIP) > -1
    ),
  };
}
const actions = {
  remove_block: traffic.blocklist_remove,
};
export default connect(mapStateToProps, actions)(BlockList);
