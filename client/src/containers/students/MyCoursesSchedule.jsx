import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form } from 'antd';
import { studentGetCoursesInfo } from '../../reducers/index'

class MyCoursesSchedule extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '课程号',
            dataIndex: 'id',
            width: '8%',
            render: (text) => <div>{text}</div>
        }, {
            title: '课程名称',
            dataIndex: 'name',
            width: '12%',
            render: (text) => <div>{text}</div>
        }, {
            title: '教师姓名',
            dataIndex: 'teachersName',
            width: '10%',
            render: (text) => <div>{text}</div>
        }, {
            title: '课程介绍',
            dataIndex: 'desc',
            width: '16%',
            render: (text) => <div>{text}</div>
        }, {
            title: '学时',
            dataIndex: 'period',
            width: '6%',
            render: (text) => <div>{text}</div>
        }, {
            title: '学分',
            dataIndex: 'credit',
            width: '6%',
            render: (text) => <div>{text}</div>
        }, {
            title: '上课时间',
            dataIndex: 'schoolTime',
            width: '16%',
            render: (text) => <div>{text}</div>
        }, {
            title: '上课地点',
            dataIndex: 'schoolAddress',
            width: '16%',
            render: (text) => <div>{text}</div>
        }];
    }

    render() {
        return (
            <div className='select-courses-wrap'>
                <Table bordered dataSource={this.props.studentGetSelectCoursesInfo} columns={this.columns}/>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onStudentGetCoursesInfo) {
            this.props.onStudentGetCoursesInfo('getSelectCoursesInfo');
        }
    }
}

const WrappedMyCoursesSchedule = Form.create()(MyCoursesSchedule);

WrappedMyCoursesSchedule.propTypes = { 
    studentGetSelectCoursesInfo: PropTypes.array,
    onStudentGetCoursesInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        studentGetSelectCoursesInfo: state.studentGetSelectCoursesInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStudentGetCoursesInfo: (functionType) => {
            dispatch(studentGetCoursesInfo(functionType))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedMyCoursesSchedule)
