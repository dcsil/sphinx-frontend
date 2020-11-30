import { Paper } from '@material-ui/core';

const Count = props => {
  return (
    <Paper
      elevation={3}
      style={{ width: '100%', padding: 10, display: 'flex', flexDirection: 'column' }}
      align={'center'}
    >
      {props.children}
    </Paper>
  );
};

export default Count;
