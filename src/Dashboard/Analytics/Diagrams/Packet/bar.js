import React from 'react';
import { connect } from 'react-redux';
import Traffic from '../../../../model/traffic.js';
import { int2sec } from '../../../../utils/timeStamp.js';
import { getData, getTimeWindow } from '../../../../utils/timeStamp';
import './styles.css';

// const NUM_PT = 30;
var Chart = require('chart.js');
const WINDOW = 10;
const INTERVAL = 10;

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
        props.INTERVAL || INTERVAL
      ).labels.map(l => int2sec(l * 1000)),
      datasets: props.attribute.map((attr, i) => {
        return {
          label: this.title[i],
          backgroundColor: this.colors[i],
          data: getData(props.logs, attr, props.INTERVAL || INTERVAL, props.WINDOW || WINDOW),
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
    ).labels.map(l => int2sec(l * 1000));
    this.attr.forEach((attr, i) => {
      this.chart.data.datasets[i].data = getData(
        logs,
        attr,
        this.props.INTERVAL || INTERVAL,
        window
      );
    });
    this.chart.update();
    // this.chart.update({
    //   duration: 800,
    //   easing: 'easeInSine',
    // });
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
    // setTimeout(() => this.updateData(), 5000);
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
