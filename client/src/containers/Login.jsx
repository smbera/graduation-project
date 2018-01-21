import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Tabs } from 'antd';
import { connect } from 'react-redux'
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
                    this.props.onLogin(this.state.identity, values.userName, values.password)
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
        onLogin: (identity, userName, password) => {
            dispatch(login(identity, userName, password))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedLogin)
