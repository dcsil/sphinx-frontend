import React from 'react';
import { connect } from 'react-redux';
import { findIpLocation } from '../../../../../api/geoLocation.js';
import './styles.css';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { LABELS } from '../../../../../model/traffic.js';
import MapChart from './map.js';
import PieChart from './pie.js';

// const markers = [
//   { name: 'EU', coordinates: [2.3387, 48.8582], color: 'blue' },
//   { name: 'NY', coordinates: [-74.006, 40.7128], color: 'red' },
// ];

const Map = ({ malicious }) => {
  const [IP_DICT, setIP_DICT] = React.useState({});
  const [data, setData] = React.useState([]);
  const getGeo = ip => {
    return findIpLocation(ip);
  };

  // update data
  React.useEffect(() => {
    let new_data = [];
    malicious.forEach(m => {
      [
        { ip: m.SourceIP, color: 'red' },
        { ip: m.DestinationIP, color: 'blue' },
      ].forEach(v => {
        if (!(v.ip in IP_DICT)) {
          getGeo(v.ip)
            .then(response => {
              // console.log(response);
              var res = response.data;
              if (res.country_name !== null) {
                var point = {
                  name: res.country_name,
                  continent: res.continent_name,
                  coordinates: [res.longitude, res.latitude],
                  color: v.color,
                };
                IP_DICT[v.ip] = point;
                setIP_DICT(IP_DICT);
                var exist = new_data.findIndex(d => d.name === res.country_name);
                if (exist < 0) new_data.push(point);
              } else {
                IP_DICT[v.ip] = null;
                setIP_DICT(IP_DICT);
              }
            })
            .catch(err => console.log(err));
        } else if (IP_DICT[v.ip] !== null) {
          var exist = new_data.findIndex(d => d.name === IP_DICT[v.ip].name);
          if (exist < 0) new_data.push(IP_DICT[v.ip]);
        }
      });
    });
    setData(new_data);
  }, [malicious, IP_DICT]);

  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <div style={{ width: '48%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginRight: 100,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            {' '}
            <RoomOutlinedIcon style={{ marginRight: 10, color: 'blue' }} />{' '}
            <span>Destination IP</span>{' '}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            {' '}
            <Brightness1Icon style={{ marginRight: 10, color: 'red' }} /> <span>Source IP</span>{' '}
          </div>
        </div>
        <MapChart data={data} />
      </div>
      <div style={{ width: '48%' }}>
        {/* <Button onClick={refresh}>REFRESH</Button> */}
        <PieChart data={data} />
      </div>
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  return {
    malicious: state.traffic.logs.filter(
      t =>
        t.label === LABELS.MALICIOUS && state.traffic.blockList.findIndex(b => b === t.SourceIP) < 0
    ),
  };
}
export default connect(mapStateToProps)(Map);
