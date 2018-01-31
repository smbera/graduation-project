import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Button, Select } from 'antd';
import {  adminOpenFunction } from '../../reducers/index'

const Option = Select.Option;

class OpenCoursesSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grade: 2014,
            isOpen: false
        };
    }

    handleChangeGrade = (value) => {
        this.setState({
            grade: parseInt(value, 10)
        });
    }
    handleChangeIsOpen = (value) => {
        this.setState({
            isOpen: value === 'true' ? true : false
        });
        
    }
    handleSubmit = () => {
        if(this.props.onAdminOpenFunction) {
            this.props.onAdminOpenFunction('openCoursesSelect', this.state)
        }
    }


    render() {
        return (
            <div className='open-courses-select-wrap'>
                <Select defaultValue={this.state.grade + '级'} style={{ width: 160 }} onChange={this.handleChangeGrade}>
                    <Option value="2014">2014级</Option>
                    <Option value="2015">2015级</Option>
                    <Option value="2016">2016级</Option>
                    <Option value="2017">2017级</Option>
                </Select>
                <Select defaultValue={this.state.isOpen === true ? '开启选课' : '关闭选课'} style={{ width: 160 }} onChange={this.handleChangeIsOpen}>
                    <Option value="true">开启选课</Option>
                    <Option value="false">关闭选课</Option>
                </Select>
                <Button type="primary" onClick={this.handleSubmit} style={{marginLeft: 20}}>确定</Button>
            </div>
        )
    }
}

OpenCoursesSelect.propTypes = { 
    onAdminOpenFunction: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdminOpenFunction: (functionType, obj) => {
            dispatch(adminOpenFunction(functionType, obj))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OpenCoursesSelect)
