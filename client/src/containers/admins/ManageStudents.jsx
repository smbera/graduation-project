import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form, Input, Button, Select, Popconfirm } from 'antd';
import { addStudentsInfo, adminGetUsersInfo, adminEditStudentsInfo, adminChangeStudentsInfo, adminSaveStudentsInfo, adminDeleteStudentsInfo } from '../../reducers/index'
import md5 from 'md5';

const Option = Select.Option;
const grade = [2014, 2015, 2016, 2017];
const classes = [1, 2, 3, 4];
const major = [{
    id: 1001,
    name: '网络工程'
},{
    id: 1002,
    name: '软件工程'
},{
    id: 1003,
    name: '计算机科学'
},{
    id: 1004,
    name: '信息管理'
}]

class ManageStudents extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '学号',
            dataIndex: 'id',
            width: '12%',
            render: (text, record) => this.renderColumns(text, record, 'id'),
        }, {
            title: '密码',
            dataIndex: 'password',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'password'),
        }, {
            title: '姓名',
            dataIndex: 'name',
            width: '8%',
            render: (text, record) => this.renderColumns(text, record, 'name'),
        }, {
            title: '性别',
            dataIndex: 'gender',
            width: '6%',
            render: (text, record) => this.renderColumns(text, record, 'gender'),
        }, {
            title: '联系方式',
            dataIndex: 'tel',
            width: '12%',
            render: (text, record) => this.renderColumns(text, record, 'tel'),
        }, {
            title: '年级',
            dataIndex: 'grade',
            width: '7%',
            render: (text, record) => this.renderColumns(text, record, 'grade'),
        }, {
            title: '班别',
            dataIndex: 'class',
            width: '7%',
            render: (text, record) => this.renderColumns(text, record, 'class'),
        }, {
            title: '专业号',
            dataIndex: 'majorId',
            width: '8%',
            render: (text, record) => this.renderColumns(text, record, 'majorId'),
        }, {
            title: '专业名',
            dataIndex: 'majorName',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'majorName'),
        }, {
            title: '操作栏',
            dataIndex: 'operation',
            render: (text, record) => {
                const {editable} = record;
                return (
                    <div className="editable-row-operations">
                        {editable 
                            ? <span>
                                <Button type="primary" size="small" onClick={() => this.props.onAdminSaveStudentsInfo(record)}>保存</Button>
                            </span>
                            : <span>
                                <Button type="primary" size="small" onClick={() => this.props.onAdminEditStudentsInfo(record.id)}>编辑</Button>
                                <Popconfirm title="是否删除?" onConfirm={() => this.props.onAdminDeleteStudentsInfo(record.id)}>
                                    <Button type="danger" size="small">删除</Button>
                                </Popconfirm>
                            </span>
                        }
                    </div>
                );
            },
        }];
    }

    state = {
        id: 1,
        password: '1',
        name: 'q',
        gender: '男',
        tel: 1,
        grade: 2014,
        classes: 1,
        majorId: 1001,
        majorName: '网络工程'
    };
    handleChangeId = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            id: parseInt(value, 10)
        });
    }
    handleChangePsw = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            password: md5(value)
        });
    }
    handleChangeName = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            name: value
        });
    }
    handleChangeGender = (value) => {
        this.setState({
            gender: value
        });
    }
    handleChangeTel = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            tel: parseInt(value, 10)
        });
    }
    handleChangeGrade = (value) => {
        this.setState({
            grade: value
        });
    }
    handleChangeClass = (value) => {
        this.setState({
            classes: value
        });
    }
    handleChangeMajor = (value) => {
        let tempArr = value.split(' ');
        this.setState({
            majorId: parseInt(tempArr[0], 10)
        });
        this.setState({
            majorName: tempArr[1]
        });
    }
    handleAdd = () => {
        if(this.props.onAddStudentsInfo) {
            this.props.onAddStudentsInfo(this.state)
        }
    }

    renderColumns(text, record, column) {
        return (
            <div>
                {record.editable
                    ? <Input style={{margin: '-5px 0'}} value={text} onChange={e => this.props.onAdminChangeStudentsInfo(e.target.value, record.id, column)}/>
                    : text
                }
            </div>
        );
    }

    render() {
        return (
            <div className='manage-students-wrap'>
                <div className='input-add'>
                    <Input placeholder="请输入学号" style={{ width: 150 } } onChange={e => this.handleChangeId(e.target.value)}/>
                    <Input placeholder="请输入密码" style={{ width: 150 }} onChange={e => this.handleChangePsw(e.target.value)}/>
                    <Input placeholder="请输入姓名" style={{ width: 150 }} onChange={e => this.handleChangeName(e.target.value)}/>
                    <Select defaultValue={this.state.gender} style={{ width: 60 }} onChange={this.handleChangeGender}>
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                    <Input placeholder="请输入联系方式" style={{ width: 150 }} onChange={e => this.handleChangeTel(e.target.value)}/>
                    <Select defaultValue={this.state.grade} style={{ width: 90 }} onChange={this.handleChangeGrade}>
                        {
                            grade.map((item, index) => {
                                return (<Option value={item} key={index}>{item}级</Option>)
                            })
                        }
                    </Select>
                    <Select defaultValue={this.state.classes} style={{ width: 70 }} onChange={this.handleChangeClass}>
                        {
                            classes.map((item, index) => {
                                return (<Option value={item} key={index}>{item}班</Option>)
                            })
                        }
                    </Select>
                    <Select defaultValue={this.state.majorId + ' ' + this.state.majorName} style={{ width: 150 }} onChange={this.handleChangeMajor}>
                        {
                            major.map((item, index) => {
                                return (<Option value={item.id + ' ' + item.name} key={index}>{item.id + ' ' + item.name}</Option>)
                            })
                        }
                    </Select>
                    <Button type="primary" onClick={this.handleAdd} style={{marginLeft: 20}}>添加</Button>
                </div>
                <div className='list'>
                   <Table bordered dataSource={this.props.adminGetStudentsInfo} columns={this.columns} style={{marginTop: 30}}/>
                </div>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onAdminGetUsersInfo) {
            this.props.onAdminGetUsersInfo('student');
        }
    }
}

const WrappedmanageStudents = Form.create()(ManageStudents);

WrappedmanageStudents.propTypes = { 
    adminGetStudentsInfo: PropTypes.array,
    onAddStudentsInfo: PropTypes.func,
    onAdminGetUsersInfo: PropTypes.func,
    onAdminEditStudentsInfo: PropTypes.func,
    onAdminChangeStudentsInfo: PropTypes.func,
    onAdminSaveStudentsInfo: PropTypes.func,
    onAdminDeleteStudentsInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        adminGetStudentsInfo: state.adminGetStudentsInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddStudentsInfo: (obj) => {
            dispatch(addStudentsInfo(obj))
        },
        onAdminGetUsersInfo: (identityType) => {
            dispatch(adminGetUsersInfo(identityType))
        },
        onAdminEditStudentsInfo: (id) => {
            dispatch(adminEditStudentsInfo(id))
        },
        onAdminChangeStudentsInfo: (value, id, column) => {
            dispatch(adminChangeStudentsInfo(value, id, column))
        },
        onAdminSaveStudentsInfo: (value, id, column) => {
            dispatch(adminSaveStudentsInfo(value, id, column))
        },
        onAdminDeleteStudentsInfo: (value, id, column) => {
            dispatch(adminDeleteStudentsInfo(value, id, column))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedmanageStudents)
