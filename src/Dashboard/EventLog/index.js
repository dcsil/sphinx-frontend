import React from 'react';
import LogTable from './LogTable.js';

const EventLog = props => {
  return (
    // <Dashboard>
    <div width={'full'} align={'center'} style={{ padding: 10 }}>
      <LogTable />
    </div>
    // </Dashboard>
  );
};

export default EventLog;
