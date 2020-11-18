import React from 'react';
import Paper from '@material-ui/core/Paper';
import './styles.css';
import LineChart from './LineChart.js';
import CardPanel from './CardPanel.js';

var randomColor = require('randomcolor');

export default function Summary() {
  var temp_col = 'primary.700';
  const getColor = () => randomColor({ luminosity: 'bright' });

  return (
    <div align="center" style={{ padding: '10px 30px', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          margin: '20px 0px',
        }}
      >
        <CardPanel title="Traffic Fequency" color={getColor} />
        <CardPanel title="Avg Duration" color={getColor} />
        <CardPanel title="Packet Length" color={getColor} />
        <CardPanel title="Packet Size" color={getColor} islast />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          margin: '20px 0px',
        }}
      >
        <CardPanel title="Byte Received" color={getColor} />
        <CardPanel title="Response Time" color={getColor} />
        <CardPanel title="Byte Received" color={getColor} />
        <CardPanel title="Byte Received" color={getColor} islast />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          margin: '20px 0px',
        }}
      >
        <Paper elevation={1} style={{ width: '50%', padding: 2, marginRight: 20 }}>
          <LineChart title="Traffic Fequency" />
        </Paper>

        <Paper elevation={1} style={{ width: '50%', padding: 2 }}>
          <LineChart title="Traffic Fequency" />
        </Paper>
      </div>
      {/* <Flex color="white" p={ 5} w="100%">
        <SimpleGrid w="40%" columns={1} spacing={5}>

          <Box bg={temp_col} height="80px">
            <text>Geo-Map</text>
          </Box>
          <CustomBox>
            
          </CustomBox>
          <CustomBox>
            <LineChart title="Avg Packect Length" />
          </CustomBox>
          <CustomBox>
            <LineChart title="Avg Packect Size" />
          </CustomBox>
          <Box bg="#66666650" height="80px"></Box>
        </SimpleGrid>


        <SimpleGrid w="33%" columns={1} spacing={5}>
          <Box bg={temp_col} height="80px">
            <text>Health Score</text>
          </Box>
          <Box bg="#66666650" height="80px"></Box>
          <Box bg="#66666650" height="80px"></Box>
          <Box bg="#66666650" height="80px"></Box>
          <Box bg="#66666650" height="80px"></Box>
        </SimpleGrid>
      </Flex> */}
    </div>
  );
}
