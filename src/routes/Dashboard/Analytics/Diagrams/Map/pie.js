import React from 'react';
import { connect } from 'react-redux';
import './styles.css';

// const NUM_PT = 30;
var Chart = require('chart.js');
const COLOR = ['#3093fc90', '#2ade7b90', '#ff616190', '#ffcc0080', '#d400d080'];
const createData = data => {
  var labels = [];
  var count = [];
  data.forEach(item => {
    var index = labels.findIndex(l => l === item.continent);
    if (index < 0) {
      labels.push(item.continent);
      count.push(1);
    } else {
      count[index] = count[index] + 1;
    }
  });
  return { labels, count };
};

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    var { labels, count } = createData(props.data);
    this.state = {
      logs: props.data,
    };
    this.chartRef = React.createRef();
    this.data = {
      labels: labels,
      datasets: [
        {
          data: count,
          backgroundColor: COLOR.slice(0, count.length),
        },
      ],
    };
    this.options = {
      title: {
        display: true,
        text: 'IP Location Composition (grouped by continent)',
        fontSize: 20,
      },
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: 'black',
          fontSize: 15,
        },
      },
    };
  }

  updateData() {
    var { labels, count } = createData(this.props.data);
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = count;
    this.chart.data.datasets[0].backgroundColor = COLOR.slice(0, count.length);
    this.chart.update({
      duration: 800,
      easing: 'easeInSine',
    });
  }

  componentDidMount() {
    this.chart = new Chart(this.chartRef.current, {
      type: 'pie',
      data: this.data,
      options: this.options,
    });
  }

  componentDidUpdate() {
    if (this.state.logs.length !== this.props.data.length) {
      this.updateData();
      this.setState({ logs: this.props.data });
    }
  }

  render() {
    return (
      <canvas ref={this.chartRef} className="canvas" style={{ height: '30%', width: '50%' }} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    traffic: state.traffic,
  };
}
export default connect(mapStateToProps)(PieChart);
