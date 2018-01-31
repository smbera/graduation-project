import $ from 'jquery';
import { message } from 'antd'
import status from '../statusCode/index'
const SERVER_PROTOCAL = 'http';
const SERVER_HOST = 'localhost';
const SERVER_PORT = '3001';
const SERVER_PATH =  `${SERVER_PROTOCAL}://${SERVER_HOST}:${SERVER_PORT}`;
const STUDENTS_INFO = 'studentsInfo';
const TEACHERS_INFO = 'teachersInfo';
const ADMINS_INFO = 'adminsInfo';

let newAdminGetStudentsInfo,
    target;

function ajaxSignIn(identityType, identity, userName, password, isLoginWithCookie, dispatch) {
    $.ajax({
        url:`${SERVER_PATH}/${identityType}/signIn`,
        type: 'post',
        data: { 
            'id': userName,
            'psw': password,
        },
        async: false,
        success: function (response) {
            let msg = response.msg;
            if(response.code === status.LOGIN_SUCC) {
                let exp = new Date();
                exp.setTime(exp.getTime() + 1000 * 60 * 30); // 有效期为30分钟
                document.cookie = "identity=" + identity + ";expires=" + exp.toGMTString();
                document.cookie = "un=" + userName + ";expires=" + exp.toGMTString();
                document.cookie = "pw=" + password + ";expires=" + exp.toGMTString();

                if(!isLoginWithCookie) {
                    message.success(msg); 
                }
                dispatch(loginSucc(identity))
            } else if(response.code === status.LOGIN_FAILE) {
                message.error(msg);
                dispatch(loginFaile(identity))
            }
        }
    });
}

function getUserInfoFromCookie() {
    let identityReg = new RegExp("(^| )identity=([^;]*)(;|$)"),
        userNameReg = new RegExp("(^| )un=([^;]*)(;|$)"),
        passwordReg = new RegExp("(^| )pw=([^;]*)(;|$)");

    if (document.cookie.match(identityReg) && document.cookie.match(userNameReg) && document.cookie.match(passwordReg)) {
        return {
            identity: document.cookie.match(identityReg)[2],
            userName: document.cookie.match(userNameReg)[2],
            password: document.cookie.match(passwordReg)[2]
        }
    } else {
        message.error('登录时间已失效，3秒将跳转到登录页面，请重新登录');
        setTimeout(function(){
            window.location.reload();
        },3000)
    }
}

function ajaxChangePassword(identityType, userInfo, originalPassword, confirmPassword, dispatch) {
    $.ajax({
        url:`${SERVER_PATH}/${identityType}/updateInfo`,
        type: 'post',
        data: { 
            'id': userInfo.userName,
            'psw': originalPassword,
            'password': confirmPassword
        },
        async: false,
        success: function (response) {
            let msg = response.msg;
            if(response.code === status.NO_ACCESS_UPDATE_INFO || response.code === status.UPDATE_INFO_FAILE) {
                message.error(msg);
            } else if(response.code === status.UPDATE_INFO_SUCC) {
                message.success(msg); 
                let exp = new Date();
                exp.setTime(exp.getTime() + 1000 * 60 * 30); // 有效期为30分钟
                document.cookie = "identity=" + userInfo.identity + ";expires=" + exp.toGMTString();
                document.cookie = "un=" + userInfo.userName + ";expires=" + exp.toGMTString();
                document.cookie = "pw=" + confirmPassword + ";expires=" + exp.toGMTString();
            }
        }
    });
}

// action types
const LOGIN_SUCC = 'LOGIN_SUCC';
const LOGIN_FAILE = 'LOGIN_FAILE';
const ADD_STUDENTS_INFO_SUCC = 'ADD_STUDENTS_INFO_SUCC';
const ADMIN_GET_STUDENTS_INFO = 'ADMIN_GET_STUDENTS_INFO';
const ADMIN_GET_TEACHERS_INFO = 'ADMIN_GET_TEACHERS_INFO';
const ADMIN_EDIT_STUDENTS_INFO = 'ADMIN_EDIT_STUDENTS_INFO';
const ADMIN_CHANGE_STUDENTS_INFO = 'ADMIN_CHANGE_STUDENTS_INFO';
const ADMIN_SAVE_STUDENTS_INFO = 'ADMIN_SAVE_STUDENTS_INFO';
const ADMIN_DELETE_STUDENTS_INFO = 'ADMIN_DELETE_STUDENTS_INFO';

// reducer
export default function (state, action) {
    if (!state) {
        return {
            isLogined: false,
            identity: '1', // 学生为1，教师为2, 管理员为3
            adminGetStudentsInfo: [],
            adminGetTeachersInfo: [],
        }
    }
    switch (action.type) {
        case LOGIN_SUCC:
            return { ...state, isLogined: true, identity: action.identity }
        case LOGIN_FAILE:
            return { ...state, isLogined: false, identity: action.identity }
        case ADD_STUDENTS_INFO_SUCC:
            newAdminGetStudentsInfo = [...state.adminGetStudentsInfo]
            newAdminGetStudentsInfo.unshift(action.newStudentInfo)
            
            return { ...state, adminGetStudentsInfo: newAdminGetStudentsInfo }
        case ADMIN_GET_STUDENTS_INFO:
            return { ...state, adminGetStudentsInfo: action.data }
        case ADMIN_GET_TEACHERS_INFO:
            return { ...state, adminGetTeachersInfo: action.data }
        case ADMIN_EDIT_STUDENTS_INFO:
            newAdminGetStudentsInfo = [...state.adminGetStudentsInfo]
            target = newAdminGetStudentsInfo.filter(item => action.id === item.id)[0];
            target.editable = true;
            return { ...state, adminGetStudentsInfo: newAdminGetStudentsInfo }
        case ADMIN_CHANGE_STUDENTS_INFO:
            newAdminGetStudentsInfo = [...state.adminGetStudentsInfo]
            target = newAdminGetStudentsInfo.filter(item => action.id === item.id)[0];
            target[action.column] = action.value;
            return { ...state, adminGetStudentsInfo: newAdminGetStudentsInfo }
        case ADMIN_SAVE_STUDENTS_INFO:
            newAdminGetStudentsInfo = [...state.adminGetStudentsInfo]
            target = newAdminGetStudentsInfo.filter(item => action.obj.id === item.id)[0];
            delete target.editable;
            return { ...state, adminGetStudentsInfo: newAdminGetStudentsInfo }
        case ADMIN_DELETE_STUDENTS_INFO:
            newAdminGetStudentsInfo = [...state.adminGetStudentsInfo]
            return { ...state, adminGetStudentsInfo: newAdminGetStudentsInfo.filter(item => action.id !== item.id) }
        default:
            return state
    }
}

// action creators
function loginSucc(identity) {
    return { type: LOGIN_SUCC, identity }
}

function loginFaile(identity) {
    return { type: LOGIN_FAILE, identity }
}

function postLoginInfo(identity, userName, password, isLoginWithCookie) {
    return function (dispatch) {
        if(identity === '1') {
            return ajaxSignIn(STUDENTS_INFO, identity, userName, password, isLoginWithCookie, dispatch)
        } else if(identity === '2') {
            return ajaxSignIn(TEACHERS_INFO, identity, userName, password, isLoginWithCookie, dispatch)
        } else if(identity === '3') {
            return ajaxSignIn(ADMINS_INFO, identity, userName, password, isLoginWithCookie, dispatch)
        }
    }
}

export const login = (identity, userName, password, isLoginWithCookie) => {
    return (dispatch, getState) => {
        return dispatch(postLoginInfo(identity, userName, password, isLoginWithCookie))
    }
}

function postPassword(originalPassword, confirmPassword) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        if(userInfo.identity === '1') {
            return ajaxChangePassword(STUDENTS_INFO, userInfo, originalPassword, confirmPassword, dispatch)
        } else if(userInfo.identity === '2') {
            return ajaxChangePassword(TEACHERS_INFO, userInfo, originalPassword, confirmPassword, dispatch)
        } else if(userInfo.identity === '3') {
            return ajaxChangePassword(ADMINS_INFO, userInfo, originalPassword, confirmPassword, dispatch)
        }
    }
}

export const changePassword = (originalPassword, confirmPassword) => {
    return (dispatch, getState) => {
        return dispatch(postPassword(originalPassword, confirmPassword))
    }
}

function addStudentsInfoSucc(newStudentInfo) {
    return { type: ADD_STUDENTS_INFO_SUCC, newStudentInfo }
}

function postStudentsInfo(obj) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        $.ajax({
            url:`${SERVER_PATH}/${ADMINS_INFO}/addStudentsInfo`,
            type: 'post',
            data: {
                'adminId': userInfo.userName,
                'adminPsw': userInfo.password,
                'id': obj.id,
                'password': obj.password,
                'name': obj.name,
                'gender': obj.gender,
                'tel': obj.tel,
                'grade': obj.grade,
                'class': obj.classes,
                'majorId': obj.majorId,
                'majorName': obj.majorName,
                'admins_info_id': userInfo.userName
            },
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.NO_ACCESS_ADD_USER || response.code === status.ADD_USER_FAILE) {
                    message.error(msg);
                } else if(response.code === status.ADD_USER_SUCC) {
                    message.success(msg); 
                    dispatch(addStudentsInfoSucc(response.data))
                }
            }
        });
    }
}

export const addStudentsInfo = (obj) => {
    return (dispatch, getState) => {
        return dispatch(postStudentsInfo(obj))
    }
}

function adminGetStudentsInfoSucc(data) {
    return { type: ADMIN_GET_STUDENTS_INFO, data }
}

function adminGetTeachersInfoSucc(data) {
    return { type: ADMIN_GET_TEACHERS_INFO, data }
}

function getAdminGetUsersInfo(identityType) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        let path = identityType === 'student' ? 'getStudentsInfo' : 'getTeachersInfo'
        $.ajax({
            url:`${SERVER_PATH}/${ADMINS_INFO}/${path}`,
            type: 'get',
            data: {
                'adminId': userInfo.userName,
                'adminPsw': userInfo.password
            },
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.NO_ACCESS_GET_USER || response.code === status.GET_USER_FAILE) {
                    message.error(msg);
                } else if(response.code === status.GET_USER_SUCC) {
                    message.success(msg); 
                    if(identityType === 'student') {
                        dispatch(adminGetStudentsInfoSucc(response.data))
                    } else if(identityType === 'teacher') {
                        dispatch(adminGetTeachersInfoSucc(response.data))
                    }
                }
            }
        });
    }
}

export const adminGetUsersInfo = (identityType) => {
    return (dispatch, getState) => {
        return dispatch(getAdminGetUsersInfo(identityType))
    }
}

export const adminEditStudentsInfo = (id) => {
    return {type: ADMIN_EDIT_STUDENTS_INFO, id}
}

export const adminChangeStudentsInfo = (value, id, column) => {
    return {type: ADMIN_CHANGE_STUDENTS_INFO, value, id, column}
}

function adminSaveStudentsInfoSucc(obj) {
    return { type: ADMIN_SAVE_STUDENTS_INFO, obj }
}

function postAdminSaveStudentsInfo(obj) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        $.ajax({
            url:`${SERVER_PATH}/${ADMINS_INFO}/updateStudentsInfo`,
            type: 'post',
            data: {
                'adminId': userInfo.userName,
                'adminPsw': userInfo.password,
                'id': obj.id,
                'password': obj.password,
                'name': obj.name,
                'gender': obj.gender,
                'tel': obj.tel,
                'grade': obj.grade,
                'class': obj.class,
                'majorId': obj.majorId,
                'majorName': obj.majorName,
                'admins_info_id': userInfo.userName
            },
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.NO_ACCESS_UPDATE_USER || response.code === status.UPDATE_USER_FAILE) {
                    message.error(msg);
                } else if(response.code === status.UPDATE_USER_SUCC) {
                    message.success(msg); 
                    dispatch(adminSaveStudentsInfoSucc(obj))
                }
            }
        });
    }
}

export const adminSaveStudentsInfo = (obj) => {
    return (dispatch, getState) => {
        return dispatch(postAdminSaveStudentsInfo(obj))
    }
}

function adminDeleteStudentsInfoSucc(id) {
    return { type: ADMIN_DELETE_STUDENTS_INFO, id }
}

function postAdminDeleteStudentsInfo(id) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        $.ajax({
            url:`${SERVER_PATH}/${ADMINS_INFO}/deleteStudentsInfo`,
            type: 'post',
            data: {
                'adminId': userInfo.userName,
                'adminPsw': userInfo.password,
                'id': id
            },
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.NO_ACCESS_DELETE_USER || response.code === status.DELETE_USER_FAILE) {
                    message.error(msg);
                } else if(response.code === status.DELETE_USER_SUCC) {
                    message.success(msg); 
                    dispatch(adminDeleteStudentsInfoSucc(id))
                }
            }
        });
    }
}

export const adminDeleteStudentsInfo = (id) => {
    return (dispatch, getState) => {
        return dispatch(postAdminDeleteStudentsInfo(id))
    }
}
