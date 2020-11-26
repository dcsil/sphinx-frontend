import React from 'react';
import { connect } from 'react-redux';
import Traffic from '../../../../model/traffic.js';
import { int2sec } from '../../../../utils/timeStamp.js';
import { getData, getTimeWindow } from '../../../../utils/timeStamp';
import './styles.css';

// const NUM_PT = 30;
var Chart = require('chart.js');
const WINDOW = 3600;
const INTERVAL = 5;

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    // var len = this.props.logs.length;

    // this.pt_col = randomColor({ luminosity: 'dark', hue: props.color });
    this.attr = props.attribute;
    this.title = props.title;
    this.chartRef = React.createRef();
    this.colors = props.colors;
    this.data = {
      labels: Traffic.partition(
        props.logs,
        undefined,
        getTimeWindow(props.logs, props.WINDOW || WINDOW),
        INTERVAL
      ).labels.map(l => int2sec(l)),
      datasets: props.attribute.map((attr, i) => {
        return {
          label: this.title[i],
          backgroundColor: this.colors[i],
          data: getData(props.logs, attr, props.INTERVAL || INTERVAL, props.WINDOW || WINDOW),
        };
      }),
    };
    this.options = {
      responsive: true,
      legend: {
        display: true,
      },
      barValueSpacing: 20,
      scales: {
        xAxes: [
          {
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
    this.chart.data.labels = Traffic.partition(
      logs,
      this.attr[0],
      window,
      this.props.INTERVAL || INTERVAL
    ).labels.map(l => int2sec(l));
    this.attr.forEach((attr, i) => {
      this.chart.data.datasets[i].data = getData(
        logs,
        attr,
        this.props.INTERVAL || INTERVAL,
        window
      );
    });
    // this.chart.data.datasets = this.attr.map((attr, i) => {
    //     let partition = Traffic.partition(logs, attr, WINDOW, INTERVAL);
    //     return {
    //       label: this.title[i],
    //       backgroundColor: this.colors[i],
    //       data: partition.data.map(d => {
    //         if (d.length === 0) return 0;
    //         else return arrSum(d) / d.length;
    //       }),
    //     };
    //   });
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
    logs: state.traffic.logs,
  };
}
export default connect(mapStateToProps)(BarChart);
