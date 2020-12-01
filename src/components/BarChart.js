import React from 'react';
import Traffic from '../model/traffic.js';
import { int2sec, getData, getTimeWindow } from '../utils/timeStamp';
// import './styles.css';

// const NUM_PT = 30;
var Chart = require('chart.js');
const WINDOW = 10;
const INTERVAL = 10;

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.attr = props.attribute;
    this.title = props.title;
    this.chartRef = React.createRef();
    this.color = props.color;
    this.data = {
      labels: Traffic.partition(
        props.logs,
        undefined,
        getTimeWindow(props.logs, props.WINDOW || WINDOW),
        props.INTERVAL || INTERVAL
      ).labels.map(l => int2sec(l * 1000)),
      datasets: [
        {
          label: this.title,
          backgroundColor: this.color,
          data: getData(props.logs, this.attr, props.INTERVAL || INTERVAL, props.WINDOW || WINDOW),
        },
      ],
    };
    this.options = {
      title: {
        display: true,
        text: props.title,
        fontSize: 20,
      },
      legend: { display: false },
      barValueSpacing: 20,
      scales: {
        xAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Time Interval',
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: props.yLabel || '',
            },
          },
        ],
      },
    };
  }

  updateData() {
    var logs = this.props.logs;
    var window = getTimeWindow(logs, this.props.WINDOW || WINDOW);
    if (logs.length > 0) {
      this.chart.options.scales.xAxes[0].ticks.display = true;
    }
    this.chart.data.labels = Traffic.partition(
      logs,
      this.attr,
      window,
      this.props.INTERVAL || INTERVAL
    ).labels.map(l => int2sec(l * 1000));

    this.chart.data.datasets[0].data = getData(
      logs,
      this.attr,
      this.props.INTERVAL || INTERVAL,
      window
    );
    this.chart.update();
  }

  componentDidMount() {
    this.chart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: this.data,
      options: this.options,
    });
  }

  componentDidUpdate() {
    this.updateData();
  }

  render() {
    return (
      <canvas
        id={`bar-chart: ${this.props.title}`}
        ref={this.chartRef}
        aria-label={`bar-chart: ${this.props.title}`}
        role="img"
      >
        <p>{`bar-chart: ${this.props.title}`}</p>
      </canvas>
    );
  }
}

export default BarChart;
