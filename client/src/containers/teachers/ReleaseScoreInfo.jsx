import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form, Button, Input } from 'antd';
import { teacherGetInfo, teacherEditScoreInfo, teacherChangeScoreInfo, teacherPostInfo } from '../../reducers/index'

class ReleaseScoreInfo extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '课程号',
            dataIndex: 'coursesid',
            width: '6%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '课程名',
            dataIndex: 'coursesname',
            width: '6%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '课程对应年级',
            dataIndex: 'coursesgrade',
            width: '6%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '课程对应专业号',
            dataIndex: 'coursesmajorId',
            width: '6%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '课程对应专业名',
            dataIndex: 'coursesmajorName',
            width: '8%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生学号',
            dataIndex: 'studentId',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生名',
            dataIndex: 'studentName',
            width: '8%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生性别',
            dataIndex: 'studentGender',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生年级',
            dataIndex: 'studentGrade',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生班别',
            dataIndex: 'studentClass',
            width: '6%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生专业号',
            dataIndex: 'studentMajorId',
            width: '4%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生专业名',
            dataIndex: 'studentMajorName',
            width: '8%',
            render: (text) => <div>{text}</div>,
        },
         {
            title: '成绩',
            dataIndex: 'studentScore',
            width: '28%',
            render: (text, record) => this.renderColumns(text, record, 'studentScore'),
        }, {
            title: '操作栏',
            dataIndex: 'operation',
            render: (text, record) => {
                const {editable} = record;
                return (
                    <div className="editable-row-operations">
                        {editable 
                            ? <span>
                                <Button type="primary" size="small" onClick={() => this.props.onTeacherPostInfo('updateStudentsScoreInfo', record)}>发布</Button>
                            </span>
                            : <span>
                                <Button type="primary" size="small" onClick={() => this.props.onTeacherEditScoreInfo(record.studentId)}>编辑</Button>
                            </span>
                        }
                    </div>
                );
            },
        }];
    }

    renderColumns(text, record, column) {
        return (
            <div>
                {record.editable
                    ? <Input style={{margin: '-5px 0'}} value={text} onChange={e => this.props.onTeacherChangeScoreInfo(e.target.value, record.studentId, column)}/>
                    : text
                }
            </div>
        );
    }

    render() {
        return (
            <div className='select-courses-wrap'>
                <Table bordered dataSource={this.props.getScoreInfo} columns={this.columns}/>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onTeacherGetInfo) {
            this.props.onTeacherGetInfo('getStudentsScoreInfo');
        }
    }
}

const WrappedReleaseScoreInfo = Form.create()(ReleaseScoreInfo);

WrappedReleaseScoreInfo.propTypes = { 
    getScoreInfo: PropTypes.array,
    onTeacherGetInfo: PropTypes.func,
    onTeacherEditScoreInfo: PropTypes.func,
    onTeacherChangeScoreInfo: PropTypes.func,
    onTeacherPostInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        getScoreInfo: state.getScoreInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTeacherGetInfo: (identityType) => {
            dispatch(teacherGetInfo(identityType))
        },
        onTeacherEditScoreInfo: (id) => {
            dispatch(teacherEditScoreInfo(id))
        },
        onTeacherChangeScoreInfo: (value, id, column) => {
            dispatch(teacherChangeScoreInfo(value, id, column))
        },
        onTeacherPostInfo: (identityType, obj) => {
            dispatch(teacherPostInfo(identityType, obj))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedReleaseScoreInfo)
