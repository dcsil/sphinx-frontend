import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Traffic from '../../model/traffic.js';
// import Paper from '@material-ui/core/Paper';
// import './styles.css';

class LogTable extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.line_col = props.color || '#9ecaff';
    this.state = {
      items: [Traffic.random()],
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      var items = this.state.items;
      items.splice(0, 0, Traffic.random());
      this.setState({
        items: items,
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getTableItem(traffic) {
    return (
      <tr onClick={() => console.log('item')}>
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
        <td>{traffic.DoH ? 'Malicious' : 'Benign'}</td>
      </tr>
    );
  }

  render() {
    return (
      // <div style={{ width: '100%' }}>
      <Table striped bordered hover>
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
          </tr>
        </thead>
        <tbody>{this.state.items.map(traffic => this.getTableItem(traffic)).flat(Infinity)}</tbody>
      </Table>
      // </div>
    );
  }
}

// var ctx = document.getElementById('myChart');
export default LogTable;
