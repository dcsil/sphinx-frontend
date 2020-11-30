import React from 'react';
import './styles.css';
import Traffic from '../../../../../model/traffic.js';
import { int2sec } from '../../../../../utils/timeStamp.js';
import { getData, getTimeWindow } from '../../../../../utils/timeStamp';

var Chart = require('chart.js');
var randomColor = require('randomcolor');
const WINDOW = 10;
const INTERVAL = 10;

class MonitoringLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.pt_col = randomColor({ luminosity: 'dark', hue: props.color });
    this.line_col = props.color;
    this.chartRef = React.createRef();
    this.data = {
      labels: Traffic.partition(
        props.logs,
        undefined,
        getTimeWindow(props.logs, props.WINDOW || WINDOW),
        INTERVAL
      ).labels.map(l => int2sec(l * 1000)),
      datasets: [
        {
          data: getData(props.logs, props.attribute, INTERVAL, props.WINDOW || WINDOW),
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
    var window = getTimeWindow(this.props.logs, this.props.WINDOW || WINDOW);
    if (this.props.logs.length > 0) {
      this.chart.options.scales.xAxes[0].ticks.display = true;
    }
    this.chart.data.labels = Traffic.partition(
      this.props.logs,
      undefined,
      window,
      INTERVAL
    ).labels.map(l => int2sec(l * 1000));
    this.chart.data.datasets[0].data = getData(
      this.props.logs,
      this.props.attribute,
      INTERVAL,
      window
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

export default MonitoringLineChart;
