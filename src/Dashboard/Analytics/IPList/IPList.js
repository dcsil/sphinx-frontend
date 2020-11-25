import React from 'react';
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LABELS } from '../../../model/traffic.js';
import { makeStyles } from '@material-ui/core/styles';
import Table from './Table.js';
import { connect } from 'react-redux';
import { int2time } from '../../../utils/timeStamp.js';
import { traffic } from '../../../redux/actions/traffic.js';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import { ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import AnomalyLineChart from './LineChart.js';

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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));
const itemStyles = makeStyles(theme => ({
  container: {
    borderWidth: '0px',
    borderRadius: 5,
    boxShadow: 'none',
    '&.MuiAccordion-root:before': {
      backgroundColor: 'white',
    },
  },
  root: {
    boxShadow: 'none',
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    height: '100%',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexShrink: 0,
    height: '100%',
  },
  column: {
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonIcon: {
    marginRight: 100,
  },
}));

const IPItem = ({ item, selected, onClick, handleChange, checked }) => {
  const classes = itemStyles();
  return (
    <Accordion
      key={item.id}
      className={classes.container}
      style={{
        boxShadow: selected ? '0px 1px 5px #66666650' : 'none',
      }}
      expanded={selected}
      onClick={onClick}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.root}
      >
        <div className={classes.column}>
          <FormControlLabel
            className={classes.heading}
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox name={item.id} onChange={handleChange} checked={checked} />}
            label={item.SourceIP}
          />
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>{int2time(item.TimeStamp)}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails onClick={event => event.stopPropagation()}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Table logs={item} />
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const IPHeader = ({ checked, handleChange }) => {
  const classes = itemStyles();
  return (
    <Accordion
      className={classes.container}
      style={{ backgroundColor: '#66666620', border: 'none' }}
      expanded={false}
    >
      <AccordionSummary
        // aria-controls="panel1a-content"
        // id="panel1a-header"
        expandIcon={<ExpandMoreIcon style={{ opacity: 0 }} />}
        className={classes.root}
      >
        <div style={{ width: '40%' }}>
          <FormControlLabel
            className={classes.header}
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox checked={checked} onChange={handleChange} name="All" />}
            label={'IP Address'}
          />
        </div>
        <div>
          <Typography className={classes.header}>Time Stamp</Typography>
        </div>

        {/* <Typography className={classes.heading}>{}</Typography> */}
      </AccordionSummary>
    </Accordion>
  );
};

const IPList = ({ malicious, update_label }) => {
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
      for (var k in keys) {
        if (keys[k] !== 'All') {
          update_label(keys[k], LABELS.BENIGN);
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
          <AnomalyLineChart color={'#ff0000'} />
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
              disabled={malicious.length === 0}
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
    malicious: state.traffic.logs.filter(t => t.label === LABELS.MALICIOUS),
  };
}
const update_label = {
  update_label: traffic.update_label,
};
export default connect(mapStateToProps, update_label)(IPList);
