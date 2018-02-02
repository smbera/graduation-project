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

let tempData,
    target;

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

// action types
const LOGIN_SUCC = 'LOGIN_SUCC';
const LOGIN_FAILE = 'LOGIN_FAILE';
const ADD_STUDENTS_INFO_SUCC = 'ADD_STUDENTS_INFO_SUCC';
const ADD_TEACHERS_INFO_SUCC = 'ADD_TEACHERS_INFO_SUCC';
const ADMIN_GET_STUDENTS_INFO = 'ADMIN_GET_STUDENTS_INFO';
const ADMIN_GET_TEACHERS_INFO = 'ADMIN_GET_TEACHERS_INFO';
const ADMIN_EDIT_STUDENTS_INFO = 'ADMIN_EDIT_STUDENTS_INFO';
const ADMIN_EDIT_TEACHERS_INFO = 'ADMIN_EDIT_TEACHERS_INFO';
const STUDENT_EDIT_ASSESSMENT_INFO = 'STUDENT_EDIT_ASSESSMENT_INFO';
const ADMIN_CHANGE_STUDENTS_INFO = 'ADMIN_CHANGE_STUDENTS_INFO';
const ADMIN_CHANGE_TEACHERS_INFO = 'ADMIN_CHANGE_TEACHERS_INFO';
const STUDENT_CHANGE_ASSESSMENT_INFO = 'STUDENT_CHANGE_ASSESSMENT_INFO';
const ADMIN_SAVE_STUDENTS_INFO = 'ADMIN_SAVE_STUDENTS_INFO';
const ADMIN_SAVE_TEACHERS_INFO = 'ADMIN_SAVE_TEACHERS_INFO';
const STUDENT_ADD_ASSESSMENT_INFO = 'STUDENT_ADD_ASSESSMENT_INFO';
const ADMIN_DELETE_STUDENTS_INFO = 'ADMIN_DELETE_STUDENTS_INFO';
const ADMIN_DELETE_TEACHERS_INFO = 'ADMIN_DELETE_TEACHERS_INFO';
const STUDENT_GET_ALL_COURSES = 'STUDENT_GET_ALL_COURSES';
const STUDENT_GET_SELECT_COURSES = 'STUDENT_GET_SELECT_COURSES';
const STUDENT_GET_EXAMS = 'STUDENT_GET_EXAMS';
const STUDENT_GET_SCORE = 'STUDENT_GET_SCORE';
const STUDENT_GET_TEACHERS_ASSESSMENT = 'STUDENT_GET_TEACHERS_ASSESSMENT';
const STUDENT_GET_IS_CAN_ADD_ASSESSMENT = 'STUDENT_GET_IS_CAN_ADD_ASSESSMENT';
const STUDENT_SELECT_COURSES = 'STUDENT_SELECT_COURSES';
const STUDENT_DELETE_SELECT_COURSES = 'STUDENT_DELETE_SELECT_COURSES';
const GET_RELEASE_COURSES_INFO = 'GET_RELEASE_COURSES_INFO';
const GET_STUDENTS_SELECT_COURSES_INFO = 'GET_STUDENTS_SELECT_COURSES_INFO';
const GET_EXAM_INFO = 'GET_EXAM_INFO';
const ADD_COURSES_INFO = 'ADD_COURSES_INFO';
const DELETE_COURSES_INFO = 'DELETE_COURSES_INFO';
const TEACHER_EDIT_EXAM_INFO = 'TEACHER_EDIT_EXAM_INFO';
const TEACHER_CHANGE_EXAM_INFO = 'TEACHER_CHANGE_EXAM_INFO';
const UPDATE_EXAMS_INFO_SUCC = 'UPDATE_EXAMS_INFO_SUCC';

// reducer
export default function (state, action) {
    if (!state) {
        return {
            isLogined: false,
            identity: '1', // 学生为1，教师为2, 管理员为3
            adminGetStudentsInfo: [],
            adminGetTeachersInfo: [],
            studentGetAllCoursesInfo: [],
            studentGetSelectCoursesInfo: [],
            studentGetExamsInfo: [],
            studentGetScoreInfo: [],
            studentGetTeachersAssessmentInfo: [],
            isCanAddAssessment: false,
            getReleaseCoursesInfo: [],
            getStudentsSelectCoursesInfo: [],
            getExamInfo: [],
        }
    }
    switch (action.type) {
        case LOGIN_SUCC:
            return { ...state, isLogined: true, identity: action.identity }
        case LOGIN_FAILE:
            return { ...state, isLogined: false, identity: action.identity }
        case ADD_STUDENTS_INFO_SUCC:
            tempData = [...state.adminGetStudentsInfo]
            tempData.unshift(action.newStudentInfo)
            
            return { ...state, adminGetStudentsInfo: tempData }
        case ADD_TEACHERS_INFO_SUCC:
            tempData = [...state.adminGetTeachersInfo]
            tempData.unshift(action.newTeacherInfo)
            
            return { ...state, adminGetTeachersInfo: tempData }
        case ADMIN_GET_STUDENTS_INFO:
            return { ...state, adminGetStudentsInfo: action.data }
        case ADMIN_GET_TEACHERS_INFO:
            return { ...state, adminGetTeachersInfo: action.data }
        case ADMIN_EDIT_STUDENTS_INFO:
            tempData = [...state.adminGetStudentsInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            target.editable = true;
            return { ...state, adminGetStudentsInfo: tempData }
        case STUDENT_EDIT_ASSESSMENT_INFO:
            tempData = [...state.studentGetTeachersAssessmentInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            target.editable = true;
            return { ...state, studentGetTeachersAssessmentInfo: tempData }
        case ADMIN_EDIT_TEACHERS_INFO:
            tempData = [...state.adminGetTeachersInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            target.editable = true;
            return { ...state, adminGetTeachersInfo: tempData }
        case ADMIN_CHANGE_STUDENTS_INFO:
            tempData = [...state.adminGetStudentsInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            target[action.column] = action.value;
            return { ...state, adminGetStudentsInfo: tempData }
        case ADMIN_CHANGE_TEACHERS_INFO:
            tempData = [...state.adminGetTeachersInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            target[action.column] = action.value;
            return { ...state, adminGetTeachersInfo: tempData } 
        case STUDENT_CHANGE_ASSESSMENT_INFO:
            tempData = [...state.studentGetTeachersAssessmentInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            target[action.column] = action.value;
            return { ...state, studentGetTeachersAssessmentInfo: tempData }  
        case ADMIN_SAVE_STUDENTS_INFO:
            tempData = [...state.adminGetStudentsInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            delete target.editable;
            return { ...state, adminGetStudentsInfo: tempData }
        case ADMIN_SAVE_TEACHERS_INFO:
            tempData = [...state.adminGetTeachersInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            delete target.editable;
            return { ...state, adminGetTeachersInfo: tempData }
        case STUDENT_ADD_ASSESSMENT_INFO:
            tempData = [...state.studentGetTeachersAssessmentInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            delete target.editable;
            return { ...state, studentGetTeachersAssessmentInfo: tempData }
        case ADMIN_DELETE_STUDENTS_INFO:
            tempData = [...state.adminGetStudentsInfo]
            return { ...state, adminGetStudentsInfo: tempData.filter(item => action.id !== item.id) }
        case ADMIN_DELETE_TEACHERS_INFO:
            tempData = [...state.adminGetTeachersInfo]
            return { ...state, adminGetTeachersInfo: tempData.filter(item => action.id !== item.id) }
        case STUDENT_GET_ALL_COURSES:
            return { ...state, studentGetAllCoursesInfo: action.data }
        case STUDENT_GET_SELECT_COURSES:
            return { ...state, studentGetSelectCoursesInfo: action.data }
        case STUDENT_GET_EXAMS:
            return { ...state, studentGetExamsInfo: action.data }
        case STUDENT_GET_SCORE:
            return { ...state, studentGetScoreInfo: action.data }
        case STUDENT_GET_TEACHERS_ASSESSMENT:
            return { ...state, studentGetTeachersAssessmentInfo: action.data }
        case STUDENT_GET_IS_CAN_ADD_ASSESSMENT:
            return { ...state, isCanAddAssessment: action.flag }
        case STUDENT_SELECT_COURSES:
            tempData = [...state.studentGetAllCoursesInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            target.selected = true;
            return { ...state, studentGetAllCoursesInfo: tempData }
        case STUDENT_DELETE_SELECT_COURSES:
            tempData = [...state.studentGetSelectCoursesInfo]
            return { ...state, studentGetSelectCoursesInfo: tempData.filter(item => action.id !== item.id) }
        case GET_RELEASE_COURSES_INFO:
            return { ...state, getReleaseCoursesInfo: action.data}
        case GET_STUDENTS_SELECT_COURSES_INFO:
            return { ...state, getStudentsSelectCoursesInfo: action.data}
        case GET_EXAM_INFO:
            return { ...state, getExamInfo: action.data}
        case ADD_COURSES_INFO:
            tempData = [...state.getReleaseCoursesInfo]
            tempData.unshift(action.data)
            
            return { ...state, getReleaseCoursesInfo: tempData }
        case DELETE_COURSES_INFO:
            tempData = [...state.getReleaseCoursesInfo]
            return { ...state, getReleaseCoursesInfo: tempData.filter(item => action.id !== item.id) }
        case TEACHER_EDIT_EXAM_INFO:
            tempData = [...state.getExamInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            target.editable = true;
            return { ...state, getExamInfo: tempData }
        case TEACHER_CHANGE_EXAM_INFO:
            tempData = [...state.getExamInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            target[action.column] = action.value;
            return { ...state, getExamInfo: tempData } 
        case UPDATE_EXAMS_INFO_SUCC:
            tempData = [...state.getExamInfo]
            target = tempData.filter(item => action.id === item.id)[0];
            delete target.editable;
            return { ...state, getExamInfo: tempData }
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

function addTeachersInfoSucc(newTeacherInfo) {
    return { type: ADD_TEACHERS_INFO_SUCC, newTeacherInfo }
}

function postUsersInfo(identityType, obj) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        let tempObj,
            path;
        if(identityType === 'student') {
            tempObj = {
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
            }
            path = 'addStudentsInfo';
        } else if(identityType === 'teacher') {
            tempObj = {
                'adminId': userInfo.userName,
                'adminPsw': userInfo.password,
                'id': obj.id,
                'password': obj.password,
                'name': obj.name,
                'gender': obj.gender,
                'tel': obj.tel,
                'grade': obj.grade,
                'title': obj.title,
                'admins_info_id': userInfo.userName
            }
            path = 'addTeachersInfo';
        }

        $.ajax({
            url:`${SERVER_PATH}/${ADMINS_INFO}/${path}`,
            type: 'post',
            data: tempObj,
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.NO_ACCESS_ADD_USER || response.code === status.ADD_USER_FAILE) {
                    message.error(msg);
                } else if(response.code === status.ADD_USER_SUCC) {
                    message.success(msg); 
                    if(identityType === 'student') {
                        dispatch(addStudentsInfoSucc(response.data))
                    } else if(identityType === 'teacher') {
                        dispatch(addTeachersInfoSucc(response.data))
                    }
                }
            }
        });
    }
}

export const addUsersInfo = (identityType, obj) => {
    return (dispatch, getState) => {
        return dispatch(postUsersInfo(identityType, obj))
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

export const adminEditTeachersInfo = (id) => {
    return {type: ADMIN_EDIT_TEACHERS_INFO, id}
}

export const studentEditAssessmentInfo = (id) => {
    return {type: STUDENT_EDIT_ASSESSMENT_INFO, id}
}

export const adminChangeStudentsInfo = (value, id, column) => {
    return {type: ADMIN_CHANGE_STUDENTS_INFO, value, id, column}
}

export const adminChangeTeachersInfo = (value, id, column) => {
    return {type: ADMIN_CHANGE_TEACHERS_INFO, value, id, column}
}

export const studentChangeAssessmentInfo = (value, id, column) => {
    return {type: STUDENT_CHANGE_ASSESSMENT_INFO, value, id, column}
}

function adminSaveStudentsInfoSucc(id) {
    return { type: ADMIN_SAVE_STUDENTS_INFO, id }
}

function adminSaveTeachersInfoSucc(id) {
    return { type: ADMIN_SAVE_TEACHERS_INFO, id }
}

function addTeachersAssessmentSucc(id) {
    return { type: STUDENT_ADD_ASSESSMENT_INFO, id }
}

function postAdminSaveUsersInfo(identityType, obj) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        let tempObj,
            path;
        if(identityType === 'student') {
            tempObj = {
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
            }
            path = `${ADMINS_INFO}/updateStudentsInfo`;
        } else if(identityType === 'teacher') {
            tempObj = {
                'adminId': userInfo.userName,
                'adminPsw': userInfo.password,
                'id': obj.id,
                'password': obj.password,
                'name': obj.name,
                'gender': obj.gender,
                'tel': obj.tel,
                'grade': obj.grade,
                'title': obj.title,
                'admins_info_id': userInfo.userName
            }
            path = `${ADMINS_INFO}/updateTeachersInfo`;
        } else if(identityType === 'addTeachersAssessment') {
            tempObj = {
                'studentId': userInfo.userName,
                'studentPsw': userInfo.password,
                'teacherId': obj.teachers_info_id,
                'course_id': obj.id,
                'score': obj.score,
                'content': obj.content,
                'isOpen': 'true'
            }
            path = `${STUDENTS_INFO}/addTeachersAssessment`;
        }
        $.ajax({
            url:`${SERVER_PATH}/${path}`,
            type: 'post',
            data: tempObj,
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.NO_ACCESS_UPDATE_USER || response.code === status.UPDATE_USER_FAILE 
                    || response.code === status.NO_ACCESS_ADD_TEACHERS_ASSESSMENT_INFO || response.code === status.ADD_TEACHERS_ASSESSMENT_INFO_FAILE) {
                    message.error(msg);
                } else if(response.code === status.UPDATE_USER_SUCC || response.code === status.ADD_TEACHERS_ASSESSMENT_INFO_SUCC) {
                    message.success(msg); 
                    if(identityType === 'student') {
                        dispatch(adminSaveStudentsInfoSucc(obj.id))
                    } else if(identityType === 'teacher') {
                        dispatch(adminSaveTeachersInfoSucc(obj.id))
                    } else if(identityType === 'addTeachersAssessment') {
                        dispatch(addTeachersAssessmentSucc(obj.id))
                    }
                }
            }
        });
    }
}

export const adminSaveUsersInfo = (identityType, obj) => {
    return (dispatch, getState) => {
        return dispatch(postAdminSaveUsersInfo(identityType, obj))
    }
}

function adminDeleteStudentsInfoSucc(id) {
    return { type: ADMIN_DELETE_STUDENTS_INFO, id }
}

function adminDeleteTeachersInfoSucc(id) {
    return { type: ADMIN_DELETE_TEACHERS_INFO, id }
}

function postAdminDeleteUsersInfo(identityType, id) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        let path;
        if(identityType === 'student') {
            path = 'deleteStudentsInfo'
        } else if(identityType === 'teacher') {
            path = 'deleteTeachersInfo'
        }
        $.ajax({
            url:`${SERVER_PATH}/${ADMINS_INFO}/${path}`,
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
                    if(identityType === 'student') {
                        dispatch(adminDeleteStudentsInfoSucc(id))
                    } else if(identityType === 'teacher') {
                        dispatch(adminDeleteTeachersInfoSucc(id))
                    }
                }
            }
        });
    }
}

export const adminDeleteUsersInfo = (identityType, id) => {
    return (dispatch, getState) => {
        return dispatch(postAdminDeleteUsersInfo(identityType, id))
    }
}


function postAdminOpenFunction(functionType, obj) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        let path;

        if(functionType === 'openCoursesSelect') {
            path = 'openCoursesSelect'
        } else if(functionType === 'openTeachersAssessment') {
            path = 'openTeachersAssessment'
        }

        $.ajax({
            url:`${SERVER_PATH}/${ADMINS_INFO}/${path}`,
            type: 'post',
            data: {
                'adminId': userInfo.userName,
                'adminPsw': userInfo.password,
                'grade': obj.grade,
                'isOpen': obj.isOpen
            },
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.NO_ACCESS_OPERATE || response.code === status.OPERATE_FAILE || response.code === status.OPERATE_FAILE_FOR_NO_GRADE) {
                    message.error(msg);
                } else if(response.code === status.OPERATE_SUCC) {
                    message.success(msg); 
                }
            }
        });
    }
}

export const adminOpenFunction = (functionType, obj) => {
    return (dispatch, getState) => {
        return dispatch(postAdminOpenFunction(functionType, obj))
    }
}

function studentGetAllCoursesInfoSucc(data) {
    return { type: STUDENT_GET_ALL_COURSES, data }
}

function studentGetSelectCoursesInfoSucc(data) {
    return { type: STUDENT_GET_SELECT_COURSES, data }
}

function studentGetExamsInfoSucc(data) {
    return { type: STUDENT_GET_EXAMS, data }
}

function studentGetScoreInfoSucc(data) {
    return { type: STUDENT_GET_SCORE, data }
}

function studentGetTeachersAssessmentInfo(data) {
    return { type: STUDENT_GET_TEACHERS_ASSESSMENT, data }
}

function studentGetIsCanNotAddAssessment() {
    return { type: STUDENT_GET_IS_CAN_ADD_ASSESSMENT, flag: false }
}

function studentGetIsCanAddAssessment() {
    return { type: STUDENT_GET_IS_CAN_ADD_ASSESSMENT, flag: true }
}

function getStudentGetCoursesInfo(functionType) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        let path;
        if(functionType === 'getAllCoursesInfo') {
            path = 'getAllCoursesInfo'
        } else if(functionType === 'getSelectCoursesInfo') {
            path = 'getSelectCoursesInfo'
        } else if(functionType === 'getExamsInfo') {
            path = 'getExamsInfo'
        } else if(functionType === 'getScoreInfo') {
            path = 'getScoreInfo'
        } else if(functionType === 'getTeachersAssessmentInfo') {
            path = 'getTeachersAssessmentInfo'
        } else if(functionType === 'getIsCanAddAssessment') {
            path = 'getIsCanAddAssessment'
        }

        $.ajax({
            url:`${SERVER_PATH}/${STUDENTS_INFO}/${path}`,
            type: 'get',
            data: {
                'studentId': userInfo.userName,
                'studentPsw': userInfo.password
            },
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.NO_COURSE_CAN_SELECT || response.code === status.LOGIN_FAILE 
                    || response.code === status.NO_ACCESS_GET_EXAM_INFO || response.code === status.NO_EXAM_INFO_FOR_NO_SELECT_COURSES 
                    || response.code === status.NO_EXAM_INFO || response.code === status.NO_ACCESS_GET_SCORE_INFO 
                    || response.code === status.NO_SCORE_INFO_FOR_NO_SELECT_COURSES || response.code === status.NO_ACCESS_GET_TEACHERS_ASSESSMENT_INFO 
                    || response.code === status.NO_TEACHERS_ASSESSMENT_INFO_FOR_NO_SELECT_COURSES || response.code === status.CAN_NOT_ADD_ASSESSMENT_INFO) {
                    message.error(msg);
                    if(functionType === 'getIsCanAddAssessment') {
                        dispatch(studentGetIsCanNotAddAssessment())
                    }
                } else if(response.code === status.GET_CAN_SELECT_SUCC || response.code === status.GET_EXAM_INFO_SUCC 
                    || response.code === status.GET_SCORE_INFO_SUCC || response.code === status.GET_TEACHERS_ASSESSMENT_INFO_SUCC
                    || response.code === status.CAN_ADD_ASSESSMENT_INFO) {
                    message.success(msg);
                    if(functionType === 'getAllCoursesInfo') {
                        dispatch(studentGetAllCoursesInfoSucc(response.data))
                    } else if(functionType === 'getSelectCoursesInfo'){
                        dispatch(studentGetSelectCoursesInfoSucc(response.data))
                    } else if(functionType === 'getExamsInfo') {
                        dispatch(studentGetExamsInfoSucc(response.data))
                    } else if(functionType === 'getScoreInfo') {            
                        dispatch(studentGetScoreInfoSucc(response.data))
                    } else if(functionType === 'getTeachersAssessmentInfo') {
                        dispatch(studentGetTeachersAssessmentInfo(response.data))
                    } else if(functionType === 'getIsCanAddAssessment') {
                        dispatch(studentGetIsCanAddAssessment())
                    }
                }
            }
        });
    }
}

export const studentGetCoursesInfo = (functionType) => {
    return (dispatch, getState) => {
        return dispatch(getStudentGetCoursesInfo(functionType))
    }
}

function studentSelectCoursesSucc(id) {
    return { type: STUDENT_SELECT_COURSES, id }
}

function postStudentSelectCourse(id) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        $.ajax({
            url:`${SERVER_PATH}/${STUDENTS_INFO}/selectedCourseInfo`,
            type: 'post',
            data: {
                'studentId': userInfo.userName,
                'studentPsw': userInfo.password,
                'isOpen': 'true',
                'students_info_id': userInfo.userName,
                'courses_info_id': id
            },
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.NO_ACCESS_SELECT_COURSE || response.code === status.SELECT_COURSE_FAILE) {
                    message.error(msg);
                } else if(response.code === status.SELECT_COURSE_SUCC) {
                    message.success(msg); 
                    dispatch(studentSelectCoursesSucc(id))
                }
            }
        });
    }
}

export const studentSelectCourse = (id) => {
    return (dispatch, getState) => {
        return dispatch(postStudentSelectCourse(id))
    }
}

function studentDeleteSelectCoursesSucc(id) {
    return { type: STUDENT_DELETE_SELECT_COURSES, id }
}

function postStudentDeleteSelectCourse(id) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        $.ajax({
            url:`${SERVER_PATH}/${STUDENTS_INFO}/deleteSelectedCourseInfo`,
            type: 'post',
            data: {
                'studentId': userInfo.userName,
                'studentPsw': userInfo.password,
                'courses_info_id': id
            },
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.NO_ACCESS_DELETE_SELECT_COURSE || response.code === status.DELETE_SELECT_COURSE_FAILE) {
                    message.error(msg);
                } else if(response.code === status.DELETE_SELECT_COURSE_SUCC) {
                    message.success(msg); 
                    dispatch(studentDeleteSelectCoursesSucc(id))
                }
            }
        });
    }
}

export const studentDeleteSelectCourse = (id) => {
    return (dispatch, getState) => {
        return dispatch(postStudentDeleteSelectCourse(id))
    }
}

function ReleaseCoursesInfoSucc(data) {
    return { type: GET_RELEASE_COURSES_INFO, data }
}

function StudentsSelectCoursesInfoSucc(data) {
    return { type: GET_STUDENTS_SELECT_COURSES_INFO, data }
}

function getExamsInfoSucc(data) {
    return { type: GET_EXAM_INFO, data }
}

function getTeacherGetInfo(identityType) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        let path;
        if(identityType === 'getReleaseCoursesInfo') {
            path = 'getReleaseCoursesInfo'
        } else if(identityType === 'getStudentsSelectCoursesInfo') {
            path = 'getStudentsSelectCoursesInfo'
        } else if(identityType === 'getExamsInfo') {
            path = 'getExamsInfo'
        }
        $.ajax({
            url:`${SERVER_PATH}/${TEACHERS_INFO}/${path}`,
            type: 'get',
            data: {
                'teacherId': userInfo.userName,
                'teacherPsw': userInfo.password
            },
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.USER_NO_EXIST || response.code === status.NO_RELEASE_COURSES) {
                    message.error(msg);
                } else if(response.code === status.GET_INFO_SUCC) {
                    message.success(msg); 
                    if(identityType === 'getReleaseCoursesInfo') {
                        dispatch(ReleaseCoursesInfoSucc(response.data))
                    } else if(identityType === 'getStudentsSelectCoursesInfo') {
                        dispatch(StudentsSelectCoursesInfoSucc(response.data))
                    } else if(identityType === 'getExamsInfo') {
                        dispatch(getExamsInfoSucc(response.data))
                    }
                }
            }
        });
    }
}

export const teacherGetInfo = (identityType) => {
    return (dispatch, getState) => {
        return dispatch(getTeacherGetInfo(identityType))
    }
}

function addCoursesSucc(data) {
    return { type: ADD_COURSES_INFO, data }
}

function deleteCoursesSucc(id) {
    return { type: DELETE_COURSES_INFO, id }
}

function updateExamsInfoSucc(id) {
    return { type: UPDATE_EXAMS_INFO_SUCC, id }
}

function postTeacherPostInfo(identityType, obj) {
    return function (dispatch) {
        let userInfo = getUserInfoFromCookie();
        let tempObj,
            path;
        if(identityType === 'addCourses') {
            tempObj = {
                'teachers_info_id': userInfo.userName,
                'teacherPsw': userInfo.password,
                'name': obj.name,
                'desc': obj.desc,
                'period': obj.period,
                'credit': obj.credit,
                'schoolTime': obj.schoolTime,
                'schoolAddress': obj.schoolAddress,
                'examTime': obj.examTime,
                'examAddress': obj.examAddress,
                'grade': obj.grade,
                'majorId': obj.majorId,
                'majorName': obj.majorName
            }
            path = 'addCourses';
        } else if(identityType === 'deleteCourses') {
            tempObj = {
                'teacherId': userInfo.userName,
                'teacherPsw': userInfo.password,
                'courseId': obj
            }
            path = 'deleteCourses';
        } else if(identityType === 'updateExamsInfo') {
            tempObj = {
                'teacherId': userInfo.userName,
                'teacherPsw': userInfo.password,
                'courseId': obj.id,
                'examTime': obj.examTime,
                'examAddress': obj.examAddress
            }
            path = 'updateExamsInfo';
        }

        $.ajax({
            url:`${SERVER_PATH}/${TEACHERS_INFO}/${path}`,
            type: 'post',
            data: tempObj,
            async: false,
            success: function (response) {
                let msg = response.msg;
                if(response.code === status.USER_NO_EXIST || response.code === status.RELEASE_COURSES_FAILE 
                    || response.code === status.DELETE_RELEASE_COURSES_FAILE || response.code === status.RELEASE_EXAM_INFO_FAILE) {
                    message.error(msg);
                } else if(response.code === status.RELEASE_COURSES_SUCC || response.code === status.DELETE_RELEASE_COURSES_SUCC
                    || response.code === status.RELEASE_EXAM_INFO_SUCC) {
                    message.success(msg); 
                    if(identityType === 'addCourses') {
                        dispatch(addCoursesSucc(response.data))
                    } else if(identityType === 'deleteCourses') {
                        dispatch(deleteCoursesSucc(obj))
                    } else if(identityType === 'updateExamsInfo') {
                        dispatch(updateExamsInfoSucc(obj.id))
                    }
                }
            }
        });
    }
}

export const teacherPostInfo = (identityType, obj) => {
    return (dispatch, getState) => {
        return dispatch(postTeacherPostInfo(identityType, obj))
    }
}

export const teacherEditExamInfo = (id) => {
    return {type: TEACHER_EDIT_EXAM_INFO, id}
}

export const teacherChangeExamInfo = (value, id, column) => {
    return {type: TEACHER_CHANGE_EXAM_INFO, value, id, column}
}
