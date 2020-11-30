import React from 'react';
import { Paper } from '@material-ui/core';

import { LABELS } from '../../../../model/traffic.js';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import { traffic } from '../../../../redux/actions/traffic.js';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import { ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { getColorForPercentage } from '../../../../utils/color';
import AnomalyLineChart from './LineChart.js';
import IPHeader from './IPHeader';
import IPItem from './IPItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const IPList = ({ malicious, update_label, add2blockList }) => {
  const classes = useStyles();
  const [IP, setIP] = React.useState(undefined);
  const [state, setState] = React.useState({ All: false });
  React.useEffect(() => {
    malicious.forEach(m => {
      if (!(m.id in state)) {
        state[m.id] = false;
        setState(state);
      }
    });
  }, [malicious, state]);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const onClickAction = eventKey => {
    let keys = [];
    if (state['All']) keys = Object.keys(state);
    else {
      Object.keys(state).forEach(key => {
        if (state[key]) {
          keys.push(key);
        }
      });
    }
    if (eventKey === 1) {
      for (let k in keys) {
        if (keys[k] !== 'All') {
          update_label(keys[k], LABELS.BENIGN);
        }
      }
    } else if (eventKey === 2) {
      for (let k in keys) {
        if (keys[k] !== 'All') {
          let index = malicious.findIndex(m => m.id === keys[k]);
          add2blockList(malicious[index].SourceIP);
        }
      }
    }
    setState({ ...state, All: false });
  };

  return (
    <ClickAwayListener onClickAway={() => setIP(undefined)}>
      <Paper
        elevation={3}
        style={{ width: '100%', padding: 10, display: 'flex', flexDirection: 'column' }}
        align={'center'}
      >
        <span> Total Malicious Count </span>
        <span
          style={{
            fontSize: 40,
            color: getColorForPercentage(Math.max(5 - malicious.length, 0) / 5),
          }}
        >
          {' '}
          {malicious.length}{' '}
        </span>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '10px 0px',
          }}
        >
          <AnomalyLineChart malicious={malicious} color={'#ff0000'} />
        </div>

        <div className={classes.root}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <DropdownButton
              disabled={Object.keys(state).every(key => !state[key])}
              as={ButtonGroup}
              title="Action"
              id="bg-vertical-dropdown-1"
            >
              <Dropdown.Item
                onClick={() => onClickAction(1)}
                className={classes.button}
                eventKey="1"
              >
                <CheckCircleOutlineTwoToneIcon style={{ marginRight: 10, color: 'green' }} /> Mark
                as Benign IP
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onClickAction(2)}
                className={classes.button}
                eventKey="2"
              >
                <BlockOutlinedIcon style={{ marginRight: 10, color: 'red' }} /> Add to Block List
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <IPHeader checked={state['All']} handleChange={handleChange} />
          {malicious.length === 0 && <p style={{ padding: 20, color: '#66666680' }}>No Anomaly</p>}
          {malicious.map(item => (
            <IPItem
              key={item.id}
              item={item}
              checked={state[item.id] || state['All']}
              selected={item.SourceIP === IP}
              handleChange={handleChange}
              update_label={update_label}
              onClick={() => {
                if (item.SourceIP === IP) {
                  setIP(undefined);
                } else {
                  setIP(item.SourceIP);
                }
              }}
            />
          ))}
        </div>
      </Paper>
    </ClickAwayListener>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
    malicious: state.traffic.logs.filter(
      t =>
        t.label === LABELS.MALICIOUS && state.traffic.blockList.findIndex(b => b === t.SourceIP) < 0
    ),
  };
}
const actions = {
  update_label: traffic.update_label,
  add2blockList: traffic.blocklist_add,
};
export default connect(mapStateToProps, actions)(IPList);
