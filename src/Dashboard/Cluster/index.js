import React from 'react';
import PCA from './pca';
import { connect } from 'react-redux';

function Cluster(props) {
  // const [logs, setLogs] = React.useState(props.logs);
  // const [attr, setAttr] = React.useState('label')

  // const onChangePercent = value => {
  //   var len = Math.round(props.logs.length * value);
  //   setLogs(props.logs.slice(props.logs.length - len, props.logs.length))
  // }

  return (
    <div
      style={{
        width: '100%',
        height: 950,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        padding: 10,
      }}
    >
      <PCA logs={props.logs} />
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    logs: state.traffic.logs,
  };
}
export default connect(mapStateToProps)(Cluster);
