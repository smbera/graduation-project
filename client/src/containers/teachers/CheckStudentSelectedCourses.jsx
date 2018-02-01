import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form } from 'antd';
import { teacherGetInfo } from '../../reducers/index'

class CheckStudentSelectedCourses extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '课程号',
            dataIndex: 'coursesid',
            width: '8%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '课程名',
            dataIndex: 'coursesname',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '课程对应年级',
            dataIndex: 'coursesgrade',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '课程对应专业号',
            dataIndex: 'coursesmajorId',
            width: '8%',
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
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生性别',
            dataIndex: 'studentGender',
            width: '10%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生联系方式',
            dataIndex: 'studentTel',
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
            width: '7%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生专业号',
            dataIndex: 'studentMajorId',
            width: '4%',
            render: (text) => <div>{text}</div>,
        }, {
            title: '学生专业名',
            dataIndex: 'studentMajorName',
            width: '15%',
            render: (text) => <div>{text}</div>,
        }];
    }


    render() {
        return (
            <div className='manage-students-wrap'>
                <div className='list'>
                   <Table bordered dataSource={this.props.getStudentsSelectCoursesInfo} columns={this.columns}/>
                </div>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onTeacherGetInfo) {
            this.props.onTeacherGetInfo('getStudentsSelectCoursesInfo');
        }
    }
}

const WrappedCheckStudentSelectedCourses = Form.create()(CheckStudentSelectedCourses);

WrappedCheckStudentSelectedCourses.propTypes = { 
    getStudentsSelectCoursesInfo: PropTypes.array,
    onTeacherGetInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        getStudentsSelectCoursesInfo: state.getStudentsSelectCoursesInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTeacherGetInfo: (identityType) => {
            dispatch(teacherGetInfo(identityType))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedCheckStudentSelectedCourses)
