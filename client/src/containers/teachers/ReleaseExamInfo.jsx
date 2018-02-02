import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Table, Form, Button, Input } from 'antd';
import { teacherGetInfo, teacherEditExamInfo, teacherChangeExamInfo, teacherPostInfo } from '../../reducers/index'

class ReleaseExamInfo extends Component {
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
            title: '考试时间',
            dataIndex: 'examTime',
            width: '10%',
            render: (text, record) => this.renderColumns(text, record, 'examTime'),
        }, {
            title: '考试地点',
            dataIndex: 'examAddress',
            width: '28%',
            render: (text, record) => this.renderColumns(text, record, 'examAddress'),
        }, {
            title: '操作栏',
            dataIndex: 'operation',
            render: (text, record) => {
                const {editable} = record;
                return (
                    <div className="editable-row-operations">
                        {editable 
                            ? <span>
                                <Button type="primary" size="small" onClick={() => this.props.onTeacherPostInfo('updateExamsInfo', record)}>发布</Button>
                            </span>
                            : <span>
                                <Button type="primary" size="small" onClick={() => this.props.onTeacherEditExamInfo(record.id)}>编辑</Button>
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
                    ? <Input style={{margin: '-5px 0'}} value={text} onChange={e => this.props.onTeacherChangeExamInfo(e.target.value, record.id, column)}/>
                    : text
                }
            </div>
        );
    }

    render() {
        return (
            <div className='select-courses-wrap'>
                <Table bordered dataSource={this.props.getExamInfo} columns={this.columns}/>
            </div>
        )
    }

    componentWillMount() {
        if(this.props.onTeacherGetInfo) {
            this.props.onTeacherGetInfo('getExamsInfo');
        }
    }
}

const WrappedReleaseExamInfo = Form.create()(ReleaseExamInfo);

WrappedReleaseExamInfo.propTypes = { 
    getExamInfo: PropTypes.array,
    onTeacherGetInfo: PropTypes.func,
    onTeacherEditExamInfo: PropTypes.func,
    onTeacherChangeExamInfo: PropTypes.func,
    onTeacherPostInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        getExamInfo: state.getExamInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTeacherGetInfo: (identityType) => {
            dispatch(teacherGetInfo(identityType))
        },
        onTeacherEditExamInfo: (id) => {
            dispatch(teacherEditExamInfo(id))
        },
        onTeacherChangeExamInfo: (value, id, column) => {
            dispatch(teacherChangeExamInfo(value, id, column))
        },
        onTeacherPostInfo: (identityType, obj) => {
            dispatch(teacherPostInfo(identityType, obj))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedReleaseExamInfo)
