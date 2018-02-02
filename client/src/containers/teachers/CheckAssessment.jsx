import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form, Button, Input } from 'antd';
import { teacherGetInfo } from '../../reducers/index'

class CheckAssessment extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '课程号',
            dataIndex: 'courseId',
            width: '14%',
            render: (text) => <div>{text}</div>
        }, {
            title: '课程名称',
            dataIndex: 'courseName',
            width: '20%',
            render: (text) => <div>{text}</div>
        }, {
            title: '评教分数',
            dataIndex: 'score',
            width: '28%',
            render: (text) => <div>{text}</div>
        }, {
            title: '评教内容',
            dataIndex: 'content',
            width: '28%',
            render: (text) => <div>{text}</div>
        }];
    }

    render() {
        return (
            <div className='select-courses-wrap'>
                <Table bordered dataSource={this.props.getAssementInfo} columns={this.columns}/>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onTeacherGetInfo) {
            this.props.onTeacherGetInfo('getAssessmentInfo');
        }
    }
}

const WrappedCheckAssessment = Form.create()(CheckAssessment);

WrappedCheckAssessment.propTypes = { 
    getAssementInfo: PropTypes.array,
    onTeacherGetInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        getAssementInfo: state.getAssementInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTeacherGetInfo: (identityType) => {
            dispatch(teacherGetInfo(identityType))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedCheckAssessment)
