import $ from 'jquery';
import { message } from 'antd'
import status from '../statusCode/index'
const SERVER_PROTOCAL = 'http';
const SERVER_HOST = 'localhost';
const SERVER_PORT = '3001';
const SERVER_PATH =  `${SERVER_PROTOCAL}://${SERVER_HOST}:${SERVER_PORT}`;

// action types
const LOGIN_SUCC = 'LOGIN_SUCC';
const LOGIN_FAILE = 'LOGIN_FAILE';

// reducer
export default function (state, action) {
    if (!state) {
        return {
            isLogined: false,
            identity: '1', // 学生为1，教师为2
        }
    }
    switch (action.type) {
        case LOGIN_SUCC:
            return { ...state, isLogined: true, identity: action.identity }
        case LOGIN_FAILE:
            return { ...state, isLogined: false, identity: action.identity }
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
        return $.ajax({
            url:`${SERVER_PATH}/login`,
            type: 'post',
            data: { 
                'identity': identity,
                'userName': userName,
                'password': password,
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
}

export const login = (identity, userName, password, isLoginWithCookie) => {
    return (dispatch, getState) => {
        return dispatch(postLoginInfo(identity, userName, password, isLoginWithCookie))
    }
}
