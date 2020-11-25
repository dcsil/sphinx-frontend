import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import Traffic from '../../../../model/traffic.js';
import { int2sec } from '../../../../utils/timeStamp.js';

var Chart = require('chart.js');
var randomColor = require('randomcolor');
const WINDOW = 3600;
const INTERVAL = 7;
const NOW = Date.now();

const arrSum = arr => arr.reduce((a, b) => a + b, 0);
const getTimeWindow = logs => {
  var times = logs.map(l => l.TimeStamp);
  var min = Math.min(...times);
  var max = Math.max(...times);
  return Math.max(max - min, WINDOW);
};

const getCurrentTimeWindow = time => {
  var results = [...Array(INTERVAL).keys()];
  for (var i in results) {
    results[i] = int2sec(time - results[i] * 750);
  }
  return results;
};

const getData = (logs, attr) => {
  if (attr) {
    return logs.length === 0
      ? Array(INTERVAL).fill(0)
      : Traffic.partition(logs, attr, getTimeWindow(logs), INTERVAL).data.map(d =>
          d.length !== 0 ? arrSum(d) / d.length : 0
        );
  }
  return logs.length === 0
    ? Array(INTERVAL).fill(0)
    : Traffic.partition(logs, undefined, getTimeWindow(logs), INTERVAL).data.map(d => d.length);
};

class MonitoringLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.pt_col = randomColor({ luminosity: 'dark', hue: props.color });
    this.line_col = props.color;
    this.chartRef = React.createRef();
    this.data = {
      labels:
        props.logs.length === 0
          ? getCurrentTimeWindow(NOW)
          : Traffic.partition(
              props.logs,
              undefined,
              getTimeWindow(props.logs),
              INTERVAL
            ).labels.map(l => int2sec(l)),
      datasets: [
        {
          data: getData(props.logs, props.attribute),
          backgroundColor: this.line_col + '50',
          borderColor: this.line_col,
          pointBorderColor: this.pt_col,
          pointBackgroundColor: this.pt_col,
          borderWidth: 1,
        },
      ],
    };
    this.options = {
      responsive: true,
      title: {
        display: true,
        text: props.title,
        fontSize: 20,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
              callback: function (value) {
                if (value >= 0 && value % 1 === 0) {
                  return value;
                }
              },
            },
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: props.yLabel,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'Time Interval',
            },
          },
        ],
      },
    };
  }

  updateData() {
    var window = getTimeWindow(this.props.logs);
    this.chart.data.labels =
      this.props.logs.length === 0
        ? getCurrentTimeWindow(Date.now())
        : Traffic.partition(this.props.logs, undefined, window, INTERVAL).labels.map(l =>
            int2sec(l)
          );
    this.chart.data.datasets[0].data = getData(this.props.logs, this.props.attribute);
    this.chart.update();
  }

  componentDidMount() {
    this.chart = new Chart(this.chartRef.current, {
      type: 'line',
      data: this.data,
      options: this.options,
    });
  }

  componentDidUpdate() {
    this.updateData();
  }

  render() {
    return <canvas ref={this.chartRef} className="canvas" />;
  }
}

// export default connect(mapStateToProps)(MonitoringLineChart);
export default MonitoringLineChart;
