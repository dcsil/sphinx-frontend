import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Map from './Map';
import Packet from './Packet';
import Flow from './Flow';
import Monitoring from '../Diagrams/Monitoring';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-force-tabpanel-${index}`}
//       aria-labelledby={`scrollable-force-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography component={'span'} variant={'body2'}>
//             {children}
//           </Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  indicator: {
    backgroundColor: 'blue',
  },
});

const Block = props => {
  return (
    <div style={{ width: '100%', padding: 10, marginBottom: 40 }}>
      <p align={'left'} style={{ fontSize: 30, fontWeight: '700', marginBottom: 20 }}>
        {props.title}
      </p>
      {props.children}
    </div>
  );
};

export default function CenteredTabs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Block title="Incoming Traffic Monitoring">
        <Monitoring />
      </Block>
      <Block title="Malicious IP Location">
        <Map />
      </Block>
      <Block title="Network Packet">
        <Packet />
      </Block>
      <Block title="Data Flow">
        <Flow />
      </Block>

      {/* <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Location" />
        <Tab label="Network Packet" />
        <Tab label="Data Flow" />
        <Tab label="Response" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Map />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Packet />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Flow />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel> */}
    </div>
  );
}
