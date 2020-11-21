import React from 'react';
import { Paper, Accordion } from '@material-ui/core';
import IPList from './IPList.js';
import Tabs from './Diagrams/DiagramTabs.js';

export default function Analytics() {
  return (
    // <Dashboard>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', padding: '10px 30px' }}>
      {/* Malicious IP List */}
      <div style={{ width: '25%', padding: 10, height: 50 }} align={'center'}>
        <IPList />
      </div>
      {/* Graph */}
      <div style={{ width: '75%', padding: 10, height: 50 }} align={'center'}>
        {/* <div style={{width: '100%', height: 50, padding: 10, backgroundColor: 'blue', }} align={'center'} > */}
        <Tabs />
      </div>
    </div>
  );
}
