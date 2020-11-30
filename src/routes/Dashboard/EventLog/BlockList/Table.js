import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { int2time } from '../../../../utils/timeStamp';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline-block',
    paddingTop: 5,
    fontSize: 14,
  },
}));

export default function FolderList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root} key={Math.random()}>
      {props.blockList.map((ip, i) => {
        let logs = props.blockLogs.filter(l => l.SourceIP === ip);
        let num = logs.length;
        let recent = Math.max(...logs.map(l => l.TimeStamp));
        return (
          <div key={ip}>
            <ListItem>
              <ListItemText
                primary={`Source IP: ${ip}`}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Total attempts:{' '}
                      <span style={{ fontWeight: '500', color: 'black' }}>{num}</span>
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Most recent:{' '}
                      <span style={{ fontWeight: '500', color: 'black' }}>{int2time(recent)}</span>
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    console.log(ip);
                    props.remove(ip);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {i < props.blockList.length - 1 && <Divider />}
          </div>
        );
      })}
    </List>
  );
}
