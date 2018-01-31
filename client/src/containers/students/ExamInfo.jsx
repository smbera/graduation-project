import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form } from 'antd';
import { studentGetCoursesInfo } from '../../reducers/index'

class ExamInfo extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '课程号',
            dataIndex: 'id',
            width: '25%',
            render: (text) => <div>{text}</div>
        }, {
            title: '课程名称',
            dataIndex: 'name',
            width: '25%',
            render: (text) => <div>{text}</div>
        }, {
            title: '考试时间',
            dataIndex: 'examTime',
            width: '25%',
            render: (text) => <div>{text}</div>
        }, {
            title: '考试地点',
            dataIndex: 'examAddress',
            width: '25%',
            render: (text) => <div>{text}</div>
        }];
    }

    render() {
        return (
            <div className='select-courses-wrap'>
                <Table bordered dataSource={this.props.studentGetExamsInfo} columns={this.columns}/>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onStudentGetCoursesInfo) {
            this.props.onStudentGetCoursesInfo('getExamsInfo');
        }
    }
}

const WrappedExamInfo = Form.create()(ExamInfo);

WrappedExamInfo.propTypes = { 
    studentGetExamsInfo: PropTypes.array,
    onStudentGetCoursesInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        studentGetExamsInfo: state.studentGetExamsInfo,
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
)(WrappedExamInfo)
