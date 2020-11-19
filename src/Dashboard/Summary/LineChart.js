import React from 'react';
import { connect } from 'react-redux';
import './styles.css';

const NUM_PT = 30;
var Chart = require('chart.js');
var randomColor = require('randomcolor');

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    var len = this.props.traffic.logs.length;
    var attr = this.props.traffic.logs.map(d => d[this.props.attribute]);
    this.pt_col = randomColor({ luminosity: 'dark', hue: props.color });
    this.line_col = props.color;
    this.chartRef = React.createRef();
    this.data = {
      labels: [...Array(NUM_PT).keys()],
      datasets: [
        {
          data: attr.slice(Math.max(0, len - NUM_PT), len),
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

  updateData() {
    var len = this.props.traffic.logs.length;
    var data = this.props.traffic.logs.map(d => d[this.props.attribute]);
    this.chart.data.labels = [...Array(NUM_PT).keys()];
    this.chart.data.datasets[0].data = data.slice(Math.max(0, len - NUM_PT), len);
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

function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(LineChart);
