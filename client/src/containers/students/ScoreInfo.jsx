import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form } from 'antd';
import { studentGetCoursesInfo } from '../../reducers/index'

class ScoreInfo extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '课程名称',
            dataIndex: 'name',
            width: '25%',
            render: (text) => <div>{text}</div>
        }, {
            title: '学时',
            dataIndex: 'period',
            width: '25%',
            render: (text) => <div>{text}</div>
        }, {
            title: '学分',
            dataIndex: 'credit',
            width: '25%',
            render: (text) => <div>{text}</div>
        }, {
            title: '成绩',
            dataIndex: 'score',
            width: '25%',
            render: (text) => <div>{text}</div>
        }];
    }

    render() {
        return (
            <div className='select-courses-wrap'>
                <Table bordered dataSource={this.props.studentGetScoreInfo} columns={this.columns}/>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onStudentGetCoursesInfo) {
            this.props.onStudentGetCoursesInfo('getScoreInfo');
        }
    }
}

const WrappedScoreInfo = Form.create()(ScoreInfo);

WrappedScoreInfo.propTypes = { 
    studentGetScoreInfo: PropTypes.array,
    onStudentGetCoursesInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        studentGetScoreInfo: state.studentGetScoreInfo,
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
)(WrappedScoreInfo)
