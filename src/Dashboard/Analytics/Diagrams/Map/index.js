import React from 'react';
import { connect } from 'react-redux';
import { findIpLocation } from '../../../../api/geoLocation.js';
import { Button } from '@material-ui/core';

const Map = ({ traffic }) => {
  const [location, setLocation] = React.useState(undefined);
  const getGeo = ip => {
    findIpLocation(ip)
      .then(response => {
        console.log(response.data);
        setLocation(response.data);
      })
      .catch(err => console.log(err));
  };

  return (
    // <Dashboard>
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px 30px',
        height: 50,
        backgroundColor: 'black',
      }}
    >
      <Button variant="contained" color="primary" onClick={() => getGeo(traffic.logs[0].SourceIP)}>
        Primary
      </Button>
      <p>{location}</p>
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(Map);
