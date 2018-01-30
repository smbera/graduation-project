import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, message } from 'antd';
import { changePassword } from '../../reducers/index'
import md5 from 'md5';

class ChangePassword extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.newPassword !== values.confirmPassword) {
                    message.error('新的密码和确认密码不一致，请重新输入！')
                } else if(values.originalPassword === values.confirmPassword) {
                    message.error('新的密码和新填写的原始密码一致，请重新输入！')
                } else {
                    if(this.props.onChangePassword) {
                        this.props.onChangePassword(md5(values.originalPassword), md5(values.confirmPassword))
                    }
                }
                console.log(values.originalPassword)
                console.log(values.newPassword)
                console.log(values.confirmPassword)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='change-password-wrap'>
                <Form onSubmit={this.handleSubmit} className="change-password-form">
                    <h1 className="change-password-title">修改密码</h1>
                    <Form.Item>
                        {getFieldDecorator('originalPassword', {
                            rules: [{ required: true, message: '请输入原始密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="原始密码" />
                        )}
                    </Form.Item>
                     <Form.Item>
                        {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message: '请输入新的密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新的密码" />
                        )}
                    </Form.Item>
                     <Form.Item>
                        {getFieldDecorator('confirmPassword', {
                            rules: [{ required: true, message: '请输入确认密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="change-password-button">确认修改</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedchangePassword = Form.create()(ChangePassword);

WrappedchangePassword.propTypes = { 
    onChangePassword: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangePassword: (originalPassword, confirmPassword) => {
            dispatch(changePassword(originalPassword, confirmPassword))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedchangePassword)
