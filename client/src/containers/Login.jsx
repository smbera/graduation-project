import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Tabs } from 'antd';
import { connect } from 'react-redux'
import md5 from 'md5';
import { login } from '../reducers/index'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identity: "1"
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.onLogin){
                    this.props.onLogin(this.state.identity, values.userName, md5(values.password), false)
                }
            }
        });
    }

    selectIdentity = (identity) => {
        this.setState({
            identity: identity
        });
    }

  	render() {
    	const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-wrap'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h1 className="login-title">中小学生兴趣班管理系统</h1>
                    <Tabs defaultActiveKey={this.state.identity} onChange={this.selectIdentity}>
                        <Tabs.TabPane tab="学生登录" key="1"></Tabs.TabPane>
                        <Tabs.TabPane tab="教师登录" key="2"></Tabs.TabPane>
                        <Tabs.TabPane tab="管理员登录" key="3"></Tabs.TabPane> 
                    </Tabs>
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-button">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        );
	}

    componentWillMount() {
        let identityReg = new RegExp("(^| )identity=([^;]*)(;|$)"),
            userNameReg = new RegExp("(^| )un=([^;]*)(;|$)"),
            passwordReg = new RegExp("(^| )pw=([^;]*)(;|$)");

        if (document.cookie.match(identityReg) && document.cookie.match(userNameReg) && document.cookie.match(passwordReg)) {
            if (this.props.onLogin){
                this.props.onLogin(document.cookie.match(identityReg)[2], document.cookie.match(userNameReg)[2], document.cookie.match(passwordReg)[2], true)
            }
        }
    }
}

const WrappedLogin = Form.create()(Login);

WrappedLogin.propTypes = { 
    onLogin: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (identity, userName, password, isLoginWithCookie) => {
            dispatch(login(identity, userName, password, isLoginWithCookie))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedLogin)
