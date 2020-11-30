import React from 'react';
import Plot from 'react-plotly.js';
import { cluster } from '../../../api/ai';
// import { LABELS } from '../../model/traffic';
import { Paper } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import RefreshIcon from '@material-ui/icons/Refresh';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { SyncOutlined } from '@ant-design/icons';
import StopIcon from '@material-ui/icons/Stop';
import CloseIcon from '@material-ui/icons/Close';
import Modal from './modal';
import Control from './control';
import Table from '../../../components/IPTable';

const SYMBOL = { BENIGN: 'circle', MALICIOUS: 'x', UNKNOWN: 'diamond' };
const COLOR = { BENIGN: '#004cbf70', MALICIOUS: '#fc0367', UNKNOWN: '#666666' };
const unique = arr => arr.filter((item, i) => arr.indexOf(item) === i);

class Cluster extends React.Component {
  constructor(props) {
    super(props);
    // this.chart = React.createRef();
    this.state = {
      portion: 1,
      play: false,
      logs: {},
      display_log: undefined,
      show_info: false,
      data: [],
      layout: {
        width: 1000,
        height: 900,
        margin: {
          l: 50,
          r: 50,
          b: 100,
          t: 50,
          pad: 4,
        },
        title: `Principal Component Analysis`,
        legend: {
          x: 0,
          y: 1,
          font: {
            size: 17,
          },
        },
      },
      frames: [],
      config: {},
    };
  }

  get_cluster = logs => {
    var that = this;
    cluster(logs)
      .then(res => {
        var clustered = res.data.data;
        this.setState({ logs: { origin: logs, clustered: clustered } });
        var cat = unique(logs.map(l => l[this.props.attribute || 'label']));
        var grouped = cat.map((c, i) => {
          var filtered = clustered.filter((p, i) => logs[i][this.props.attribute || 'label'] === c);
          return {
            x: filtered.map(p => p[0]),
            y: filtered.map(p => p[1]),
            z: filtered.map(p => p[2]),
            type: 'scatter3d',
            mode: 'markers',
            name: c,
            marker: {
              size: 7,
              color: COLOR[c],
              symbol: SYMBOL[c],
            },
          };
        });
        that.setState({ data: grouped });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.get_cluster(this.props.logs);
  }

  hide_display() {
    this.setState({ display_log: undefined });
  }

  onChangePercent(value, logs) {
    var len = Math.max(Math.round(logs.length * value), 10);
    this.setState({ portion: value });
    this.get_cluster(logs.slice(logs.length - len, logs.length));
  }

  refresh(value, logs) {
    this.hide_display();
    var len = Math.max(Math.round(logs.length * value), 10);
    this.get_cluster(logs.slice(logs.length - len, logs.length));
  }

  componentDidUpdate() {
    if (this.state.play) {
      var value = this.state.portion;
      var logs = this.props.logs;
      var len = Math.max(Math.round(logs.length * value), 10);
      this.get_cluster(logs.slice(logs.length - len, logs.length));
    }
  }

  show(data) {
    var index = this.state.logs.clustered.findIndex(
      p => p[0] === data.points[0].x && p[1] === data.points[0].y && p[2] === data.points[0].z
    );
    var log = this.state.logs.origin[index];
    this.setState({ display_log: log });
    // console.log(log)
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 10,
        }}
      >
        <div style={{ width: '25%', paddingBottom: 30, marginRight: 10 }}>
          <Paper elevation={3} style={{ padding: 10, marginBottom: 20 }}>
            <span align="center" style={{ width: '100%', padding: 10 }}>
              Control Panel
            </span>
            <div>
              <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                style={{ margin: 10, backgroundColor: '#5c9dff' }}
                onClick={() => this.refresh(this.state.portion, this.props.logs)}
              >
                <RefreshIcon /> Refresh
              </Fab>
              <Fab
                size="small"
                variant={!this.state.play ? 'extended' : 'rounded'}
                aria-label="play"
                color="primary"
                style={{ margin: 10, backgroundColor: this.state.play ? '#666' : '#5c9dff' }}
                onClick={() => {
                  this.setState({ play: !this.state.play });
                  this.hide_display();
                }}
              >
                {!this.state.play && (
                  <>
                    <PlayArrowIcon />
                    Real-time
                  </>
                )}
                {this.state.play && <StopIcon />}
              </Fab>
              {this.state.play && (
                <>
                  <SyncOutlined spin style={{ fontSize: 30 }} />
                  <span font-size="20"> Synchronizing </span>
                </>
              )}
            </div>

            <Control
              values={[
                { title: 'All', value: 1 },
                { title: '10%', value: 0.1 },
                { title: '30%', value: 0.3 },
                { title: '50%', value: 0.5 },
                { title: '70%', value: 0.7 },
              ]}
              onChange={value => this.onChangePercent(value, this.props.logs)}
            />
          </Paper>
          {this.state.display_log !== undefined && (
            <Paper>
              <Fab
                size="small"
                aria-label="add"
                color="primary"
                style={{ margin: 10, backgroundColor: this.state.play ? '#666' : '#5c9dff' }}
                onClick={() => this.hide_display()}
              >
                <CloseIcon />
              </Fab>
              <Table logs={this.state.display_log} />
            </Paper>
          )}
        </div>
        <Plot
          onClick={data => this.show(data)}
          // ref={this.chartRef}
          data={this.state.data}
          layout={this.state.layout}
          frames={this.state.frames}
          config={this.state.config}
        />
        <div
          style={{
            width: '20%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Modal />
        </div>
      </div>
    );
  }
}

export default Cluster;
