import React from 'react';
import { Table } from 'antd';
import { LABELS } from '../../../model/traffic';
import { traffic } from '../../../redux/actions/traffic';
import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import Dropdown from './dropDown';
import { COLUMN } from './columns';

class AntTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      data: props.data.reverse(),
    };
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selected: selectedRowKeys });
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
  }

  handleMenuClick(e) {
    let newLabel;
    if (e.key === '1') newLabel = LABELS.BENIGN;
    else if (e.key === '2') newLabel = LABELS.MALICIOUS;
    else if (e.key === '3') newLabel = LABELS.UNKNOWN;
    let new_data = this.state.data;
    this.state.selected.forEach(i => {
      this.props.update_label(i, newLabel);
      new_data.forEach((d, index) => {
        if (d.key === i) {
          new_data[index].label = newLabel;
        }
      });
    });
    this.setState({ data: this.state.data });
    this.setState({ selected: [] });
  }

  renderButtonGroups() {
    return (
      <div style={{ width: '100%', padding: 20, display: 'flex', flexDirection: 'row' }}>
        <Button
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
          onClick={() => this.setState({ data: this.props.data.reverse() })}
        >
          <SyncOutlined /> Refresh
        </Button>
        <Dropdown
          handleMenuClick={this.handleMenuClick.bind(this)}
          disabled={this.state.selected.length === 0}
        />
      </div>
    );
  }

  render() {
    const selectedRowKeys = this.state.selected;
    const rowSelection = {
      selectedRowKeys,
      ...this.rowSelection,
    };
    return (
      <>
        {this.renderButtonGroups()}
        <Table
          columns={COLUMN}
          dataSource={this.state.data}
          rowSelection={{ ...rowSelection }}
          scroll={{ x: 4000, y: 500 }}
        />
      </>
    );
  }
}

const actions = {
  update_label: traffic.update_label,
};
export default connect(null, actions)(AntTable);
