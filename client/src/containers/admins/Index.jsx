import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

class AdminsIndex extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }

    checkoutMenu = ({ key }) => {
        // 清除所有cookie
        if(key === '8') {
            let keys = document.cookie.match(/[^ =;]+(?==)/g);  
            if(keys) {  
                for(let i = keys.length; i--;)  
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
            }  
            window.location.reload();
        }
    }

    render() {
        return (
            <Layout>
                <Sider
                  trigger={null}
                  collapsible
                  collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" onClick={this.checkoutMenu} defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="setting" />
                            <span>修改密码</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="bar-chart" />
                            <span>个人信息</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="book" />
                            <span>选择课程</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="export" />
                            <span>我的课表</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="export" />
                            <span>考试安排</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="switcher" />
                            <span>查看成绩</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="line-chart" />
                            <span>教学质量评价</span>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="logout" />
                            <span>退出登录</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        adminContent
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

AdminsIndex.propTypes = { 
    languageType: PropTypes.string,
} 

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminsIndex)
