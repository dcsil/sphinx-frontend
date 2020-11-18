import React from 'react';
import './styles.css';

var Chart = require('chart.js');

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.pt_col = '#0046a3';
    this.line_col = '#9ecaff';
    this.chartRef = React.createRef();
    this.data = {
      labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
      datasets: [
        {
          data: [896, 914, 1060, 1016, 107, 111, 133, 221, 783, 1478],
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
            },
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.chart = new Chart(this.chartRef.current, {
      type: 'line',
      data: this.data,
      options: this.options,
    });
  }

  render() {
    return <canvas ref={this.chartRef} className="canvas" />;
  }
}

// var ctx = document.getElementById('myChart');
export default LineChart;
