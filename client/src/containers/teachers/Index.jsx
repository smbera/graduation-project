import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ChangePassword from '../component/ChangePassword'
import CoursesInfo from './CoursesInfo'
import CheckStudentSelectedCourses from './CheckStudentSelectedCourses'
import ReleaseExamInfo from './ReleaseExamInfo'
import ReleaseScoreInfo from './ReleaseScoreInfo'
import CheckAssessment from './CheckAssessment'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

class TeachersIndex extends Component {
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
    }

  	render() {
        let selectMenu = () => {
            if(this.state.key === '1') {
                return <ChangePassword />
            }
            if(this.state.key === '3') {
                return <CoursesInfo />
            }
            if(this.state.key === '4') {
                return <CheckStudentSelectedCourses />
            }
            if(this.state.key === '5') {
                return <ReleaseExamInfo />
            }
            if(this.state.key === '6') {
                return <ReleaseScoreInfo />
            }
            if(this.state.key === '7') {
                return <CheckAssessment />
            }

            // 清除所有cookie
            if(this.state.key === '8') {
                let keys = document.cookie.match(/[^ =;]+(?==)/g);  
                if(keys) {  
                    for(let i = keys.length; i--;)  
                        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
                }  
                window.location.reload();
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
                        <Menu.Item key="3">
                            <Icon type="book" />
                            <span>发布/删除课程</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="switcher" />
                            <span>查看学生选课信息</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="export" />
                            <span>发布考试信息</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="switcher" />
                            <span>发布成绩</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="line-chart" />
                            <span>查看教学质量评价</span>
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
                        {
                             selectMenu()   
                        }
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
