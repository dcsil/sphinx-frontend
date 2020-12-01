import React from 'react';
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
import Count from '../../../../components/Counting';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const DROPDOWN = [
  {
    text: 'Mark as Benign IP',
    component: () => <CheckCircleOutlineTwoToneIcon style={{ marginRight: 10, color: 'green' }} />,
  },
  {
    text: 'Add to Block List',
    component: () => <BlockOutlinedIcon style={{ marginRight: 10, color: 'red' }} />,
  },
];

const IPList = ({ malicious, update_label, add2blockList }) => {
  const classes = useStyles();
  const [ID, setID] = React.useState(undefined);
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
    console.log(eventKey);
    let keys = [];
    if (state['All']) keys = Object.keys(state);
    else {
      Object.keys(state).forEach(key => {
        if (state[key]) {
          keys.push(key);
        }
      });
    }
    if (eventKey === 0) {
      for (let k in keys) {
        if (keys[k] !== 'All') {
          update_label(keys[k], LABELS.BENIGN);
        }
      }
    } else if (eventKey === 1) {
      for (let k in keys) {
        if (keys[k] !== 'All') {
          let index = malicious.findIndex(m => m.id === keys[k]);
          add2blockList(malicious[index].SourceIP);
        }
      }
    }
    setState({ ...state, All: false });
  };

  const renderDropdown = () => {
    return (
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
          {DROPDOWN.map((d, i) => (
            <Dropdown.Item
              key={i.toString()}
              onClick={() => onClickAction(i)}
              className={classes.button}
              eventKey={i.toString()}
            >
              {d.component()} {d.text}
            </Dropdown.Item>
          )).flat(Infinity)}
        </DropdownButton>
      </div>
    );
  };

  const renderIPItem = () => {
    return malicious.map(item => (
      <IPItem
        key={item.id}
        item={item}
        checked={state[item.id] || state['All']}
        selected={item.id === ID}
        handleChange={handleChange}
        update_label={update_label}
        onClick={() => {
          if (item.id === ID) {
            setID(undefined);
          } else {
            setID(item.id);
          }
        }}
      />
    ));
  };

  const renderAnomalyChart = () => {
    return (
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
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setID(undefined)}>
      <div>
        <Count>
          <span> Total Malicious Count </span>
          <span
            style={{
              fontSize: 40,
              color: getColorForPercentage(Math.max(5 - malicious.length, 0) / 5),
            }}
          >
            {malicious.length}
          </span>
          {renderAnomalyChart()}
          <div className={classes.root}>
            {renderDropdown()}
            <IPHeader checked={state['All']} handleChange={handleChange} />
            {malicious.length === 0 && (
              <p style={{ padding: 20, color: '#66666680' }}>No Anomaly</p>
            )}
            {renderIPItem()}
          </div>
        </Count>
      </div>
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
