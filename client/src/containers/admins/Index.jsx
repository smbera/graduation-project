import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ChangePassword from '../component/ChangePassword'
import ManageStudents from './ManageStudents'
import ManageTeachers from './ManageTeachers'
import OpenCoursesSelect from './OpenCoursesSelect'
import OpenTeachersAssessment from './OpenTeachersAssessment'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

class AdminsIndex extends Component {
    state = {
        collapsed: false,
        key: '1'
    };

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }

    checkoutMenu = ({ key }) => {
        this.setState({
            key: key
        })

        // 清除所有cookie
        if(key === '7') {
            let keys = document.cookie.match(/[^ =;]+(?==)/g);  
            if(keys) {  
                for(let i = keys.length; i--;)  
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
            }  
            window.location.reload();
        }
    }

    render() {
        let selectMenu = () => {
            if(this.state.key === '1') {
                return <ChangePassword />
            }
            if(this.state.key === '3') {
                return <ManageStudents />
            }
            if(this.state.key === '4') {
                return <ManageTeachers />
            }
            if(this.state.key === '5') {
                return <OpenCoursesSelect />
            }
            if(this.state.key === '6') {
                return <OpenTeachersAssessment />
            }
        }

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
                            <span>管理学生</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="export" />
                            <span>管理教师</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="export" />
                            <span>开启/关闭选课</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="switcher" />
                            <span>开启/关闭评教</span>
                        </Menu.Item>
                        <Menu.Item key="7">
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
                        {
                             selectMenu()   
                        }
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
