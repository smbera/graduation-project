import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

class TeachersIndex extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }

    checkoutMenu = ({ item, key, selectedKeys }) => {
        console.log(item)
        console.log(key)
        console.log(selectedKeys)
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
                            <span>发布课程</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="export" />
                            <span>发布考试信息</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="switcher" />
                            <span>发布成绩</span>
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
                        Content
                    </Content>
                </Layout>
            </Layout>
	    )
	}
}

TeachersIndex.propTypes = { 
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
)(TeachersIndex)
