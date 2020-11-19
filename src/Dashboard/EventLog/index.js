import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
