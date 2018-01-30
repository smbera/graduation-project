import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Form, Input, Button, Select } from 'antd';
import { addStudentsInfo } from '../../reducers/index'
import md5 from 'md5';

const Option = Select.Option;
const grade = [2014, 2015, 2016, 2017];
const classes = [1, 2, 3, 4];
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

class ManageStudents extends Component {
    state = {
        id: 1,
        password: '1',
        name: 'q',
        gender: '男',
        tel: 1,
        grade: 2014,
        classes: 1,
        majorId: 1001,
        majorName: '网络工程'
    };
    handleChangeId = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            id: parseInt(value, 10)
        });
    }
    handleChangePsw = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            password: md5(value)
        });
    }
    handleChangeName = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            name: value
        });
    }
    handleChangeGender = (value) => {
        this.setState({
            gender: value
        });
    }
    handleChangeTel = (value) => {
        value = value.replace(/\s+/g, '')
        this.setState({
            tel: parseInt(value, 10)
        });
    }
    handleChangeGrade = (value) => {
        this.setState({
            grade: value
        });
    }
    handleChangeClass = (value) => {
        this.setState({
            classes: value
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
        if(this.props.onAddStudentsInfo) {
            this.props.onAddStudentsInfo(this.state)
        }
    }

    render() {
        return (
            <div className='manage-students-wrap'>
                <Input placeholder="请输入学号" style={{ width: 150 } } onChange={e => this.handleChangeId(e.target.value)}/>
                <Input placeholder="请输入密码" style={{ width: 150 }} onChange={e => this.handleChangePsw(e.target.value)}/>
                <Input placeholder="请输入姓名" style={{ width: 150 }} onChange={e => this.handleChangeName(e.target.value)}/>
                <Select defaultValue={this.state.gender} style={{ width: 60 }} onChange={this.handleChangeGender}>
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                </Select>
                <Input placeholder="请输入联系方式" style={{ width: 150 }} onChange={e => this.handleChangeTel(e.target.value)}/>
                <Select defaultValue={this.state.grade} style={{ width: 90 }} onChange={this.handleChangeGrade}>
                    {
                        grade.map((item, index) => {
                            return (<Option value={item} key={index}>{item}级</Option>)
                        })
                    }
                </Select>
                <Select defaultValue={this.state.classes} style={{ width: 70 }} onChange={this.handleChangeClass}>
                    {
                        classes.map((item, index) => {
                            return (<Option value={item} key={index}>{item}班</Option>)
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
                <Button type="primary" onClick={this.handleAdd}>添加</Button>
            </div>
        )
    }
}

const WrappedmanageStudents = Form.create()(ManageStudents);

WrappedmanageStudents.propTypes = { 
    onAddStudentsInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddStudentsInfo: (obj) => {
            dispatch(addStudentsInfo(obj))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedmanageStudents)
