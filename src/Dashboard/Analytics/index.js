import React from 'react';
import IPList from './IPList';
import Tabs from './Diagrams';

export default function Analytics() {
  return (
    // <Dashboard>
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px 30px 50px 30px',
      }}
    >
      {/* Malicious IP List */}
      <div style={{ width: '27%', padding: 10, height: 50 }} align={'center'}>
        <IPList />
      </div>
      {/* Graph */}
      <div style={{ width: '72%', padding: 10, height: 50 }} align={'center'}>
        <Tabs />
      </div>
    </div>
  );
}
