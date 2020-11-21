import React from 'react';
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LABELS } from '../../model/traffic.js';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { int2time } from '../../utils/timeStamp.js';
import { traffic } from '../../redux/actions/traffic.js';

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
}));

const IPItem = ({ item, selected, onClick, update_label }) => {
  const classes = itemStyles();
  return (
    <Accordion
      className={classes.container}
      style={{
        // backgroundColor: selected ? '#ff2a0020' : 'white',
        boxShadow: selected ? '0px 1px 5px #66666650' : 'none',
      }}
      expanded={selected}
      onClick={onClick}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        // aria-controls="panel1a-content"
        // id="panel1a-header"
        className={classes.root}
      >
        <div className={classes.column}>
          <FormControlLabel
            className={classes.heading}
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox />}
            label={item.SourceIP}
          />
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>{int2time(item.TimeStamp)}</Typography>
        </div>

        {/* <Typography className={classes.heading}>{}</Typography> */}
      </AccordionSummary>
      <AccordionDetails>
        <Button onClick={() => update_label(item.id, LABELS.BENIGN)}>Delete</Button>
      </AccordionDetails>
    </Accordion>
  );
};

const IPHeader = () => {
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
            control={<Checkbox />}
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

const IPList = ({ traffic, malicious, update_label }) => {
  const classes = useStyles();
  const [IP, setIP] = React.useState(undefined);
  // const [data, setData] = React.useState();
  // React.useEffect(() => {
  //   var new_data = traffic.logs.filter(t => t.label === LABELS.MALICIOUS);
  //   if (data.length < new_data.length) setData(new_data);
  // }, [traffic.logs]);

  return (
    <Paper
      elevation={3}
      style={{ width: '100%', padding: 10, display: 'flex', flexDirection: 'column' }}
      align={'center'}
    >
      <span> Total Malicious Count </span>
      <span style={{ fontSize: 40 }}> {malicious.length} </span>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '10px 0px',
        }}
      >
        {/* <span style={{ fontSize: 15, fontWeight: '700', color: '#666666', padding: 5 }}>
          Suspicious IP List:
        </span> */}
      </div>

      <div className={classes.root}>
        <IPHeader />
        {malicious.length === 0 && <p style={{ padding: 20, color: '#66666680' }}>No Anomaly</p>}
        {malicious.map(item => (
          <IPItem
            key={item.id}
            item={item}
            selected={item.SourceIP === IP}
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
