import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

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
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
    fontSize: 13,
    fontWeight: 'bold',
  },
}));

const IPHeader = ({ checked, handleChange }) => {
  const classes = itemStyles();
  return (
    <Accordion
      className={classes.container}
      style={{ backgroundColor: '#66666620', border: 'none' }}
      expanded={false}
    >
      <AccordionSummary
        id="ip-list-header-summary"
        expandIcon={<ExpandMoreIcon style={{ opacity: 0 }} />}
        className={classes.root}
      >
        <div style={{ width: '50%' }}>
          <FormControlLabel
            className={classes.header}
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox checked={checked} onChange={handleChange} name="All" />}
            label={<Typography style={{ fontSize: 13, fontWeight: 'bold' }}>IP Address</Typography>}
          />
        </div>
        <div>
          <Typography className={classes.header}>Time Stamp</Typography>
        </div>
      </AccordionSummary>
    </Accordion>
  );
};

export default IPHeader;
