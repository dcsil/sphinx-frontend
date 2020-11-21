import React from 'react';
import { connect } from 'react-redux';
import Traffic from '../../../../model/traffic.js';
import { int2sec } from '../../../../utils/timeStamp.js';
import './styles.css';

// const NUM_PT = 30;
var Chart = require('chart.js');
const WINDOW = 3600;
const INTERVAL = 5;
var randomColor = require('randomcolor');

const arrSum = arr => arr.reduce((a, b) => a + b, 0);

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    // var len = this.props.traffic.logs.length;

    // this.pt_col = randomColor({ luminosity: 'dark', hue: props.color });
    this.attr = props.attribute;
    this.title = props.title;
    this.chartRef = React.createRef();
    this.data = {
      labels: Traffic.partition(props.traffic.logs, this.attr[0], WINDOW, INTERVAL).labels.map(l =>
        int2sec(l)
      ),
      datasets: props.attribute.map((attr, i) => {
        let partition = Traffic.partition(props.traffic.logs, attr, WINDOW, INTERVAL);
        return {
          label: this.title[i],
          backgroundColor: randomColor({ luminosity: 'bright' }) + '50',
          data: partition.data.map(d => {
            if (d.length === 0) return 0;
            else return arrSum(d) / d.length;
          }),
        };
      }),
    };
    this.options = {
      //   title: {
      //     display: true,
      //     text: props.title,
      //     fontSize: 20,
      //   },
      legend: {
        display: true,
      },
      barValueSpacing: 20,
      scales: {
        xAxes: [
          {
            gridLines: {
              offsetGridLines: true,
            },
          },
        ],
      },
    };
  }

  updateData() {
    var logs = this.props.traffic.logs;
    this.chart.data = {
      labels: Traffic.partition(logs, this.attr[0], WINDOW, INTERVAL).labels.map(l => int2sec(l)),
      datasets: this.attr.map((attr, i) => {
        let partition = Traffic.partition(logs, attr, WINDOW, INTERVAL);
        return {
          label: this.title[i],
          backgroundColor: this.chart.data.datasets[i].backgroundColor,
          data: partition.data.map(d => {
            if (d.length === 0) return 0;
            else return arrSum(d) / d.length;
          }),
        };
      }),
    };
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
    return <canvas ref={this.chartRef} className="canvas" />;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(BarChart);
