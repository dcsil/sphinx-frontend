import React from 'react';
// import { connect } from 'react-redux';
import './styles.css';
import Traffic from '../../../model/traffic.js';
// import { LABELS } from '../../../model/traffic.js';
import { int2sec } from '../../../utils/timeStamp.js';

var Chart = require('chart.js');
var randomColor = require('randomcolor');
const WINDOW = 3600;
const INTERVAL = 5;
// const NOW = Date.now();

const getTimeWindow = logs => {
  var times = logs.map(l => l.TimeStamp);
  var min = Math.min(...times);
  var max = Math.max(...times);
  return Math.max(max - min, WINDOW);
};

const getCurrentTimeWindow = time => {
  var results = [...Array(INTERVAL).keys()];
  for (var i in results) {
    results[i] = int2sec(time - results[i] * 1000);
  }
  return results;
};

class AnomalyLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.pt_col = randomColor({ luminosity: 'light', hue: props.color });
    this.line_col = props.color;
    this.chartRef = React.createRef();
    this.data = {
      labels: Traffic.partition(
        props.malicious,
        undefined,
        getTimeWindow(props.malicious),
        INTERVAL
      ).labels.map(l => int2sec(l * 1000)),
      datasets: [
        {
          data:
            props.malicious.length === 0
              ? Array(INTERVAL).fill(0)
              : Traffic.partition(
                  props.malicious,
                  undefined,
                  getTimeWindow(props.malicious),
                  INTERVAL
                ).data.map(d => d.length),
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
        display: false,
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
              labelString: 'Num Occurrence',
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
            },
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
    var window = getTimeWindow(this.props.malicious);
    if (this.props.malicious.length > 0) {
      this.chart.options.scales.xAxes[0].ticks.display = true;
    }
    this.chart.data.labels =
      this.props.malicious.length === 0
        ? getCurrentTimeWindow(Date.now())
        : Traffic.partition(this.props.malicious, undefined, window, INTERVAL).labels.map(l =>
            int2sec(l * 1000)
          );
    this.chart.data.datasets[0].data =
      this.props.malicious.length === 0
        ? Array(INTERVAL).fill(0)
        : Traffic.partition(this.props.malicious, undefined, window, INTERVAL).data.map(
            d => d.length
          );
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

// function mapStateToProps(state, ownProps) {
//   return {
//     malicious: state.traffic.logs.filter(t => t.label === LABELS.MALICIOUS),
//   };
// }
// export default connect(mapStateToProps)(AnomalyLineChart);
export default AnomalyLineChart;
