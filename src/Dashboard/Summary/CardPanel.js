import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import './styles.css';

var Chart = require('chart.js');
const NUM_PT = 20;

class CardPanel extends React.Component {
  constructor(props) {
    super(props);
    var len = this.props.traffic.logs.length;
    var attr = this.props.traffic.logs.map(d => d[this.props.attribute]);
    this.title = props.title;
    this.line_col = props.color || '#9ecaff';
    this.chartRef = React.createRef();
    this.data = {
      labels: [...Array(NUM_PT).keys()],
      datasets: [
        {
          data: attr.slice(Math.max(0, len - NUM_PT), len),
          backgroundColor: this.line_col + '20',
          borderColor: this.line_col,
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          borderWidth: 1,
          pointBorderWidth: 0,
          lineTension: 0.1,
        },
      ],
    };
    this.options = {
      tooltips: {
        enabled: false,
      },
      responsive: true,
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
    };
    this.state = {
      bgc: 'white',
      elevate: 2,
    };
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach(dataset => {
      dataset.data.push(data);
    });
    chart.update();
  }

  updateData() {
    var len = this.props.traffic.logs.length;
    var data = this.props.traffic.logs.map(d => d[this.props.attribute]);
    this.chart.data.labels = [...Array(NUM_PT).keys()];
    this.chart.data.datasets[0].data = data.slice(Math.max(0, len - NUM_PT), len);
    this.chart.update();
  }

  componentDidMount() {
    // this.updateData();
    this.chart = new Chart(this.chartRef.current, {
      type: 'line',
      data: this.data,
      options: this.options,
    });
  }

  componentDidUpdate() {
    this.updateData();
    // console.log()
    // this.setState({
    //   data: this.props.data,
    // });
  }

  render() {
    var len = this.data.datasets[0].data.length;
    var percent =
      (this.data.datasets[0].data[len - 1] - this.data.datasets[0].data[len - 2]) /
      this.data.datasets[0].data[len - 2];
    return (
      <Paper
        elevation={this.state.elevate}
        style={{
          width: '24%',
          padding: 10,
          margin: 20,
          marginRight: this.props.islast ? 0 : 20,
          marginLeft: 0,
          backgroundColor: this.state.bgc,
        }}
        onClick={this.props.onClick}
        onMouseOver={() => this.setState({ bgc: '#9ecaff20', elevate: 5 })}
        onMouseLeave={() => this.setState({ bgc: 'white', elevate: 2 })}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ marginBottom: 10, marginLeft: 10, fontWeight: '700' }}>{this.title}</span>
          <div>
            <span style={{ marginBottom: 10, marginLeft: 10, fontSize: 30 }}>
              {this.data.datasets[0].data[len - 1]}
            </span>
            <span
              style={{
                marginBottom: 10,
                marginLeft: 10,
                fontSize: 30,
                color: percent >= 0 ? 'green' : 'red',
              }}
            >
              {Math.round(percent * 1000) / 10}%
            </span>
          </div>

          <canvas ref={this.chartRef} className="cardPanel" height="70%" />
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(CardPanel);
