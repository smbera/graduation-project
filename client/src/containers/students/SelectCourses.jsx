import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form, Button } from 'antd';
import { studentGetCoursesInfo } from '../../reducers/index'


class SelectCourses extends Component {
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
            width: '10%',
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
            width: '12%',
            render: (text) => <div>{text}</div>
        }, {
            title: '上课地点',
            dataIndex: 'schoolAddress',
            width: '12%',
            render: (text) => <div>{text}</div>
        }, {
            title: '年级',
            dataIndex: 'grade',
            width: '7%',
            render: (text) => <div>{text}</div>
        }, {
            title: '专业号',
            dataIndex: 'majorId',
            width: '8%',
            render: (text) =><div>{text}</div>
        }, {
            title: '专业名',
            dataIndex: 'majorName',
            width: '15%',
            render: (text) => <div>{text}</div>
        }, {
            title: '操作栏',
            dataIndex: 'operation',
            render: (text, record) => {
                const {selected} = record;
                return (
                    <div className="editable-row-operations">
                        {selected 
                            ? <span>
                                <Button type="primary" size="small" disabled >已选择</Button>
                            </span>
                            : <span>
                                <Button type="primary" size="small" onClick={() => this.props.onAdminEditStudentsInfo(record.id)}>选择</Button>
                            </span>
                        }
                    </div>
                );
            },
        }];
    }

    render() {
        return (
            <div className='select-courses-wrap'>
                <Table bordered dataSource={this.props.studentGetCoursesInfo} columns={this.columns}/>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onStudentGetCoursesInfo) {
            this.props.onStudentGetCoursesInfo();
        }
    }
}

const WrappedSelectCourses = Form.create()(SelectCourses);

WrappedSelectCourses.propTypes = { 
    studentGetCoursesInfo: PropTypes.array,
    onStudentGetCoursesInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        studentGetCoursesInfo: state.studentGetCoursesInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStudentGetCoursesInfo: () => {
            dispatch(studentGetCoursesInfo())
        },
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedSelectCourses)
