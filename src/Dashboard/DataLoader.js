import React from 'react';
import { connect } from 'react-redux';
import { traffic } from '../redux/actions/traffic.js';

const DataLoader = ({ time, update_traffic }) => {
  React.useEffect(() => {
    update_traffic(time, time + 1);
  });

  return <></>;
};

const actions = {
  update_traffic: traffic.update_traffic,
};
export default connect(null, actions)(DataLoader);
