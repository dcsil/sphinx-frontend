import React from 'react';
import Paper from '@material-ui/core/Paper';
import './styles.css';

var Chart = require('chart.js');

class CardPanel extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.line_col = props.color || '#9ecaff';
    this.chartRef = React.createRef();
    this.data = {
      labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
      datasets: [
        {
          data: [896, 914, 1060, 1016, 107, 111, 133, 22221, 783, 1478],
          backgroundColor: 'transparent',
          borderColor: this.line_col,
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          borderWidth: 2,
          pointBorderWidth: 0,
          lineTension: 0.1,
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
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
    };
    this.state = {
      bgc: 'white',
      elevate: 2,
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
    return (
      <Paper
        elevation={this.state.elevate}
        style={{
          width: '24%',
          padding: 10,
          margin: 20,
          marginRight: this.props.islast ? 0 : 20,
          marginLeft: 0,
          backgroundColor: this.state.bgc,
        }}
        onMouseOver={() => this.setState({ bgc: '#9ecaff20', elevate: 5 })}
        onMouseLeave={() => this.setState({ bgc: 'white', elevate: 2 })}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <text style={{ marginBottom: 10, marginLeft: 10, fontWeight: '700' }}>{this.title}</text>
          <div>
            <text style={{ marginBottom: 10, marginLeft: 10, fontSize: 30 }}>10000</text>
            <text style={{ marginBottom: 10, marginLeft: 10, fontSize: 30, color: 'green' }}>
              10%
            </text>
          </div>

          <canvas ref={this.chartRef} className="cardPanel" height="100%" />
        </div>
      </Paper>
    );
  }
}

// var ctx = document.getElementById('myChart');
export default CardPanel;
