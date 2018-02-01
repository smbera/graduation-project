import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form, Input, Button, Select, Popconfirm } from 'antd';
import { teacherGetInfo, teacherPostInfo } from '../../reducers/index'

const Option = Select.Option;
const grade = [2014, 2015, 2016, 2017];
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

class CoursesInfo extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '课程号',
            dataIndex: 'id',
            width: '9%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '课程名',
            dataIndex: 'name',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '课程描述',
            dataIndex: 'desc',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学时',
            dataIndex: 'period',
            width: '8%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学分',
            dataIndex: 'credit',
            width: '8%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '上课时间',
            dataIndex: 'schoolTime',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '上课地点',
            dataIndex: 'schoolAddress',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '考试时间',
            dataIndex: 'examTime',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '考试地点',
            dataIndex: 'examAddress',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '年级',
            dataIndex: 'grade',
            width: '7%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '专业号',
            dataIndex: 'majorId',
            width: '4%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '专业名',
            dataIndex: 'majorName',
            width: '15%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '操作栏',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <Popconfirm title="是否删除?" onConfirm={() => this.props.onTeacherPostInfo('deleteCourses', record.id)}>
                        <Button type="danger" size="small">删除</Button>
                    </Popconfirm>
                );
            },
        }];
    }

    state = {
        name: 'fsdf',
        desc: 'dbg',
        period: 12,
        credit: 12,
        schoolTime: '4sgh',
        schoolAddress: 'sgf',
        examTime: 'fgyk',
        examAddress: 'fasdf',
        grade: 2014,
        majorId: 1001,
        majorName: '网络工程'
    };
    handleChangeName = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            name: value
        });
    }
    handleChangeDesc = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            desc: value
        });
    }
    handleChangePeriod = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            period: parseInt(value, 10)
        });
    }
    handleChangeCredit = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            credit: parseInt(value, 10)
        });
    }
    handleChangeSchoolTime = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            schoolTime: value
        });
    }
    handleChangeSchoolAddress = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            schoolAddress: value
        });
    }
    handleChangeExamTime = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            examTime: value
        });
    }
    handleChangeExamAddress = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            examAddress: value
        });
    }
    handleChangeGrade = (value) => {
        this.setState({
            grade: value
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
        if(this.props.onTeacherPostInfo) {
            this.props.onTeacherPostInfo('addCourses', this.state)
        }
    }

    render() {
        return (
            <div className='manage-students-wrap'>
                <div className='input-add'>
                    <Input placeholder="请输入课程名" style={{ width: 120 } } onChange={e => this.handleChangeName(e.target.value)}/>
                    <Input placeholder="请输入课程描述" style={{ width: 130 }} onChange={e => this.handleChangeDesc(e.target.value)}/>
                    <Input placeholder="请输入学时" style={{ width: 100 }} onChange={e => this.handleChangePeriod(e.target.value)}/>
                    <Input placeholder="请输入学分" style={{ width: 100 }} onChange={e => this.handleChangeCredit(e.target.value)}/>
                    <Input placeholder="请输入上课时间" style={{ width: 130 }} onChange={e => this.handleChangeSchoolTime(e.target.value)}/>
                    <Input placeholder="请输入上课地点" style={{ width: 130 }} onChange={e => this.handleChangeSchoolAddress(e.target.value)}/>
                    <Input placeholder="请输入考试时间" style={{ width: 130 }} onChange={e => this.handleChangeExamTime(e.target.value)}/>
                    <Input placeholder="请输入考试地点" style={{ width: 130 }} onChange={e => this.handleChangeExamAddress(e.target.value)}/>
                    <Select defaultValue={this.state.grade} style={{ width: 90 }} onChange={this.handleChangeGrade}>
                        {
                            grade.map((item, index) => {
                                return (<Option value={item} key={index}>{item}级</Option>)
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
                   <Table bordered dataSource={this.props.getReleaseCoursesInfo} columns={this.columns} style={{marginTop: 30}}/>
                </div>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onTeacherGetInfo) {
            this.props.onTeacherGetInfo('getReleaseCoursesInfo');
        }
    }
}

const WrappedCoursesInfo = Form.create()(CoursesInfo);

WrappedCoursesInfo.propTypes = { 
    getReleaseCoursesInfo: PropTypes.array,
    onTeacherGetInfo: PropTypes.func,
    onTeacherPostInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        getReleaseCoursesInfo: state.getReleaseCoursesInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTeacherGetInfo: (identityType) => {
            dispatch(teacherGetInfo(identityType))
        },
        onTeacherPostInfo: (identityType, obj) => {
            dispatch(teacherPostInfo(identityType, obj))
        },

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedCoursesInfo)
