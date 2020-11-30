import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '../../../../components/IPTable';
import { makeStyles } from '@material-ui/core/styles';
import { int2time } from '../../../../utils/timeStamp.js';

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

export default IPItem;
