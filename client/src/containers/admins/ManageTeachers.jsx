import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form, Input, Button, Select, Popconfirm } from 'antd';
import { addUsersInfo, adminGetUsersInfo, adminEditTeachersInfo, adminChangeTeachersInfo, adminSaveUsersInfo, adminDeleteUsersInfo } from '../../reducers/index'
import md5 from 'md5';

const Option = Select.Option;
const grade = [2014, 2015, 2016, 2017];

class ManageTeachers extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '学号',
            dataIndex: 'id',
            width: '15%',
            render: (text, record) => this.renderColumns(text, record, 'id'),
        }, {
            title: '密码',
            dataIndex: 'password',
            width: '16%',
            render: (text, record) => this.renderColumns(text, record, 'password'),
        }, {
            title: '姓名',
            dataIndex: 'name',
            width: '10%',
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
            title: '职称',
            dataIndex: 'title',
            width: '17%',
            render: (text, record) => this.renderColumns(text, record, 'title'),
        }, {
            title: '操作栏',
            dataIndex: 'operation',
            render: (text, record) => {
                const {editable} = record;
                return (
                    <div className="editable-row-operations">
                        {editable 
                            ? <span>
                                <Button type="primary" size="small" onClick={() => this.props.onAdminSaveUsersInfo('teacher', record)}>保存</Button>
                            </span>
                            : <span>
                                <Button type="primary" size="small" onClick={() => this.props.onAdminEditTeachersInfo(record.id)}>编辑</Button>
                                <Popconfirm title="是否删除?" onConfirm={() => this.props.onAdminDeleteUsersInfo('teacher', record.id)}>
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
        title: '高级教师',
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
    handleChangeTitle = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            title: value
        });
    }

    handleAdd = () => {
        if(this.props.onAddUsersInfo) {
            this.props.onAddUsersInfo('teacher', this.state)
        }
    }

    renderColumns(text, record, column) {
        return (
            <div>
                {record.editable
                    ? <Input style={{margin: '-5px 0'}} value={text} onChange={e => this.props.onAdminChangeTeachersInfo(e.target.value, record.id, column)}/>
                    : text
                }
            </div>
        );
    }

    render() {
        return (
            <div className='manage-students-wrap'>
                <div className='input-add'>
                    <Input placeholder="请输入工号" style={{ width: 150 } } onChange={e => this.handleChangeId(e.target.value)}/>
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
                    <Input placeholder="请输入教师职称" style={{ width: 150 }} onChange={e => this.handleChangeTitle(e.target.value)}/>
                    <Button type="primary" onClick={this.handleAdd} style={{marginLeft: 20}}>添加</Button>
                </div>
                <div className='list'>
                   <Table bordered dataSource={this.props.adminGetTeachersInfo} columns={this.columns} style={{marginTop: 30}}/>
                </div>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onAdminGetUsersInfo) {
            this.props.onAdminGetUsersInfo('teacher');
        }
    }
}

const WrappedmanageTeachers = Form.create()(ManageTeachers);

WrappedmanageTeachers.propTypes = { 
    adminGetStudentsInfo: PropTypes.array,
    adminGetTeachersInfo: PropTypes.array,
    onAddUsersInfo: PropTypes.func,
    onAdminGetUsersInfo: PropTypes.func,
    onAdminEditTeachersInfo: PropTypes.func,
    onAdminChangeTeachersInfo: PropTypes.func,
    onAdminSaveUsersInfo: PropTypes.func,
    onAdminDeleteUsersInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        adminGetStudentsInfo: state.adminGetStudentsInfo,
        adminGetTeachersInfo: state.adminGetTeachersInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddUsersInfo: (identityType, obj) => {
            dispatch(addUsersInfo(identityType, obj))
        },
        onAdminGetUsersInfo: (identityType) => {
            dispatch(adminGetUsersInfo(identityType))
        },
        onAdminEditTeachersInfo: (id) => {
            dispatch(adminEditTeachersInfo(id))
        },
        onAdminChangeTeachersInfo: (value, id, column) => {
            dispatch(adminChangeTeachersInfo(value, id, column))
        },
        onAdminSaveUsersInfo: (identityType, record) => {
            dispatch(adminSaveUsersInfo(identityType, record))
        },
        onAdminDeleteUsersInfo: (identityType, id) => {
            dispatch(adminDeleteUsersInfo(identityType, id))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedmanageTeachers)
