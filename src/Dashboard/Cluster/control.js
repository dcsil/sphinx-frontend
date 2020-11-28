import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '80%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Control(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.values[0].value);

  const handleChange = event => {
    props.onChange(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div width="100%">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Select a subsect of data</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          autoWidth
          value={value}
          onChange={handleChange}
          label={props.title}
        >
          {props.values.map(v => (
            <MenuItem key={v.value} value={v.value}>
              {v.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
