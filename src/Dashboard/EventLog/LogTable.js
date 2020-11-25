import React from 'react';
import { connect } from 'react-redux';
// import { traffic } from '../../redux/actions/traffic.js';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { LABELS } from '../../model/traffic.js';
// import Paper from '@material-ui/core/Paper';
// import './styles.css';

class LogTable extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.line_col = props.color || '#9ecaff';
    this.state = {
      data: props.data,
    };
  }

  getTableItems(items) {
    return items
      .map(traffic => (
        <tr key={traffic.id} onClick={() => console.log('item')}>
          <td>{traffic.SourceIP}</td>
          <td>{traffic.DestinationIP}</td>
          <td>{traffic.SourcePort}</td>
          <td>{traffic.DestinationPort}</td>
          <td>{traffic.TimeStamp}</td>
          <td>{traffic.Duration}</td>
          <td>{traffic.FlowBytesSent}</td>
          <td>{traffic.FlowSentRate}</td>
          <td>{traffic.FlowBytesReceived}</td>
          <td>{traffic.FlowReceivedRate}</td>
          <td>{traffic.PacketLengthMean}</td>
          <td>{traffic.PacketTimeMean}</td>
          <td>{traffic.ResponseTimeTimeMean}</td>
          <td>{traffic.DoH ? 'True' : 'False'}</td>
          <td>{traffic.label}</td>
        </tr>
      ))
      .flat(Infinity);
  }

  render() {
    var len = this.props.traffic.logs.length;
    return (
      // <div style={{ width: '100%' }}>
      <Table striped bordered hover responsive>
        <thead>
          <tr style={{ fontSize: 12 }}>
            <th>Source IP</th>
            <th>Destination IP</th>
            <th>Source Port</th>
            <th>Destination Port</th>
            <th>Time Stamp</th>
            <th>Duration</th>
            <th>Flow Bytes Sent</th>
            <th>Flow Sent Rate</th>
            <th>Flow Bytes Received</th>
            <th>Flow Received Rate</th>
            <th>Packet Length Mean</th>
            <th>Packet Time Mean</th>
            <th>Response Time Mean</th>
            <th>DoH</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          {this.getTableItems(this.props.traffic.logs.slice(Math.max(0, len - 15), len))}
        </tbody>
      </Table>
      // </div>
    );
  }
}

// var ctx = document.getElementById('myChart');
function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(LogTable);
