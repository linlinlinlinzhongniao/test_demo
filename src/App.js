import React, { Component } from 'react';
import { Table, Tooltip, Tag, Modal, Button, Input } from 'antd';
import axios from 'axios'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableIndeDataSource: [],
      modalIndeDataSource: [],
      tableIndeDataSource_Copy:[],
      visible: false
    }
    this.overFlowStyle = {
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "whiteSpace": "nowrap",
      "width": '200px'
    }
    this.moadlIndeCol = [{
      title: 'type',
      key:'type',
      dataIndex: 'type',
    }, {
      title: 'url',
      key: 'url',
      dataIndex: 'url',
      render: (text, record, index) => (
        <a href={record.url} target='_blank'>详情</a>
      ),
    }]
    this.tableIndeCol = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (text, record, index) => {
        return (
          <div >
            <Tooltip title={record.description}>
              <p style={this.overFlowStyle}>{record.description}</p>
            </Tooltip>
          </div>
        )
      }
    }, {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      width: 200,
      render: (text, record, index) => {
        return (
          <img style={{ width: '100px', height: '35px' }} src={record.image} />
        )
      }
    }, {
      title: 'tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: tags => (
        <span>
          {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    }, {
      title: 'baseURL',
      dataIndex: 'baseURL',
      key: 'baseURL',
      width: 200,
      render: (text, record, index) => (
        <a href={record.baseURL} target='_blank'>详情</a>
      ),
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      render: (text, record, index) => (
        <Button type="primary" onClick={this.showModalDialog.bind(this, record)}>编辑</Button>
      ),
    }]
  }
  componentDidMount() {
    axios.get('http://www.mocky.io/v2/5b766d7b3000005700848af9')
      .then((res) => {
        const { apis } = res.data
        this.setState({
          tableIndeDataSource: apis,
          tableIndeDataSource_Copy: apis
        })

      })
      .catch((err) => {
        console.log(2, err)
      });
  }
  showModalDialog = (record) => {
    this.setState({
      modalIndeDataSource: record.properties
    }, () => {
      this.showModal()
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  filterTable = (e) => {
    const { value } = e.target;
    const { tableIndeDataSource_Copy } = this.state
    const newData = tableIndeDataSource_Copy.filter((item, ind) => {
      const arrToString = item.tags.join(',')
      if (arrToString.includes(value)) {
        return item
      }
    })
    this.setState({
      tableIndeDataSource: newData
    })
  }

  render() {
    const { tableIndeDataSource, modalIndeDataSource } = this.state
    return (
      <div className="App" style={{ padding: '25px' }}>
        <Input placeholder="过滤表格" onChange={this.filterTable} style={{ marginBottom: '20px' }} />
        <Table
          columns={this.tableIndeCol}
          dataSource={tableIndeDataSource}
          pagination={false} />
        <Modal
          title="action show modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table
            columns={this.moadlIndeCol}
            dataSource={modalIndeDataSource}
            pagination={false} />
        </Modal>

      </div>
    );
  }
}

export default App;
