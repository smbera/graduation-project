import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form, Button, Input } from 'antd';
import { studentGetCoursesInfo, studentEditAssessmentInfo, studentChangeAssessmentInfo, adminSaveUsersInfo } from '../../reducers/index'


class TeachersAssessment extends Component {
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
        },{
            title: '教师姓名',
            dataIndex: 'teacherName',
            width: '10%',
            render: (text) => <div>{text}</div>
        }, {
            title: '教师职称',
            dataIndex: 'teacherTitle',
            width: '10%',
            render: (text) => <div>{text}</div>
        },  {
            title: '评教评分',
            dataIndex: 'score',
            width: '10%',
            render: (text, record) => this.renderColumns(text, record, 'score'),
        }, {
            title: '评教内容',
            dataIndex: 'content',
            width: '28%',
            render: (text, record) => this.renderColumns(text, record, 'content'),
        }, {
            title: '操作栏',
            dataIndex: 'operation',
            render: (text, record) => {
                const {editable} = record;
                return (
                    <div className="editable-row-operations">
                        {editable 
                            ? <span>
                                <Button type="primary" size="small" onClick={() => this.props.onAdminSaveUsersInfo('addTeachersAssessment', record)}>保存</Button>
                            </span>
                            : <span>
                                <Button type="primary" size="small" onClick={() => this.props.onStudentEditAssessmentInfo(record.id)}>评教</Button>
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
                    ? <Input style={{margin: '-5px 0'}} value={text} onChange={e => this.props.onStudentChangeAssessmentInfo(e.target.value, record.id, column)}/>
                    : text
                }
            </div>
        );
    }

    render() {
        return (
            <div className='select-courses-wrap'>
                <Table bordered dataSource={this.props.studentGetTeachersAssessmentInfo} columns={this.columns}/>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onStudentGetCoursesInfo) {
            this.props.onStudentGetCoursesInfo('getTeachersAssessmentInfo');
        }
    }
}

const WrappedTeachersAssessment = Form.create()(TeachersAssessment);

WrappedTeachersAssessment.propTypes = { 
    studentGetTeachersAssessmentInfo: PropTypes.array,
    onStudentGetCoursesInfo: PropTypes.func,
    onStudentEditAssessmentInfo: PropTypes.func,
    onStudentChangeAssessmentInfo: PropTypes.func,
    onAdminSaveUsersInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        studentGetTeachersAssessmentInfo: state.studentGetTeachersAssessmentInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStudentGetCoursesInfo: (functionType) => {
            dispatch(studentGetCoursesInfo(functionType))
        },
        onStudentEditAssessmentInfo: (id) => {
            dispatch(studentEditAssessmentInfo(id))
        },
        onStudentChangeAssessmentInfo: (value, id, column) => {
            dispatch(studentChangeAssessmentInfo(value, id, column))
        },
        onAdminSaveUsersInfo: (identityType, obj) => {
            dispatch(adminSaveUsersInfo(identityType, obj))
        },
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedTeachersAssessment)
