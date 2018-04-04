import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { studentGetCoursesInfo } from '../../reducers/index'
import ChangePassword from '../component/ChangePassword'
import SelectCourses from './SelectCourses'
import MyCourses from './MyCourses'
import MyCoursesSchedule from './MyCoursesSchedule'
import ExamInfo from './ExamInfo'
import ScoreInfo from './ScoreInfo'
import TeachersAssessment from './TeachersAssessment'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

class StudentsIndex extends Component {
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
                return <SelectCourses />
            }
            if(this.state.key === '4') {
                return <MyCourses />
            }
            if(this.state.key === '5') {
                return <MyCoursesSchedule />
            }
            if(this.state.key === '6') {
                return <ExamInfo />
            }
            if(this.state.key === '7') {
                return <ScoreInfo />
            }
            if(this.state.key === '8') {
                return <TeachersAssessment />
            }

            // 清除所有cookie
            if(this.state.key === '9') {
                let keys = document.cookie.match(/[^ =;]+(?==)/g);  
                if(keys) {  
                    for(let i = keys.length; i--;)  
                        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
                }  
                window.location.reload();
            }
            
        }

        let meunList = () => {
            if(this.props.isCanAddAssessment === true) {
                return (
                    <Menu.Item key="8">
                        <Icon type="line-chart"/>
                        <span>教学质量评价</span>
                    </Menu.Item>
                    )
            } else {
                return (
                    <Menu.Item key="8" disabled>
                        <Icon type="line-chart"/>
                        <span>教学质量评价</span>
                    </Menu.Item>
                    )
            }
        }

        let meunList1 = () => {
            if(this.props.isCanSelectCourses === true) {
                return (
                    <Menu.Item key="3">
                        <Icon type="book" />
                        <span>选择课程</span>
                    </Menu.Item>
                    )
            } else {
                return (
                    <Menu.Item key="3" disabled>
                        <Icon type="book" />
                        <span>选择课程</span>
                    </Menu.Item>
                    )
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
                        {
                            meunList1()
                        }
                        <Menu.Item key="4">
                            <Icon type="switcher" />
                            <span>我的课程</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="export" />
                            <span>我的课表</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="export" />
                            <span>考试安排</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="switcher" />
                            <span>查看成绩</span>
                        </Menu.Item>
                        {
                            meunList()
                        }
                        <Menu.Item key="9">
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

    componentWillMount() {
        if(this.props.onStudentGetCoursesInfo) {
            this.props.onStudentGetCoursesInfo('getIsCanAddAssessment');
        }
        if(this.props.onStudentGetCoursesInfo) {
            this.props.onStudentGetCoursesInfo('getIsCanSelectCourses');
        }
    }
}

StudentsIndex.propTypes = { 
    isCanAddAssessment: PropTypes.bool,
    isCanSelectCourses: PropTypes.bool,
    onStudentGetCoursesInfo: PropTypes.func,
} 

const mapStateToProps = (state) => {
    return {
        isCanAddAssessment: state.isCanAddAssessment,
        isCanSelectCourses: state.isCanSelectCourses,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStudentGetCoursesInfo: (functionType) => {
            dispatch(studentGetCoursesInfo(functionType))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentsIndex)
