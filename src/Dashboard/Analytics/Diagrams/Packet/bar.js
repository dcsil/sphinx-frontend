import React from 'react';
import { connect } from 'react-redux';
import Traffic from '../../../../model/traffic.js';
import { int2sec } from '../../../../utils/timeStamp.js';
import './styles.css';

// const NUM_PT = 30;
var Chart = require('chart.js');
const WINDOW = 3600;
const INTERVAL = 5;

const arrSum = arr => arr.reduce((a, b) => a + b, 0);

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    // var len = this.props.traffic.logs.length;

    // this.pt_col = randomColor({ luminosity: 'dark', hue: props.color });
    this.attr = props.attribute;
    this.title = props.title;
    this.chartRef = React.createRef();
    this.colors = props.colors;
    this.data = {
      labels: Traffic.partition(props.traffic.logs, this.attr[0], WINDOW, INTERVAL).labels.map(l =>
        int2sec(l)
      ),
      datasets: props.attribute.map((attr, i) => {
        let partition = Traffic.partition(props.traffic.logs, attr, WINDOW, INTERVAL);
        return {
          label: this.title[i],
          backgroundColor: this.colors[i],
          data: partition.data.map(d => {
            if (d.length === 0) return 0;
            else return arrSum(d) / d.length;
          }),
        };
      }),
    };
    this.options = {
      title: {
        display: props.title.length === 1,
        text: props.title,
        fontSize: 20,
      },
      legend: {
        display: props.title.length > 1,
      },
      barValueSpacing: 20,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            // ticks: {
            //   display: false,
            // },
          },
        ],
      },
    };
  }

  updateData() {
    var logs = this.props.traffic.logs;
    this.chart.data.labels = Traffic.partition(logs, this.attr[0], WINDOW, INTERVAL).labels.map(l =>
      int2sec(l)
    );
    this.chart.data.datasets = this.attr.map((attr, i) => {
      let partition = Traffic.partition(logs, attr, WINDOW, INTERVAL);
      return {
        label: this.title[i],
        backgroundColor: this.colors[i],
        data: partition.data.map(d => {
          if (d.length === 0) return 0;
          else return arrSum(d) / d.length;
        }),
      };
    });
    this.chart.update({
      duration: 800,
      easing: 'easeInSine',
    });
  }

  componentDidMount() {
    this.chart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: this.data,
      options: this.options,
    });
  }

  componentDidUpdate() {
    // setTimeout(() => this.updateData(), 5000);
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
