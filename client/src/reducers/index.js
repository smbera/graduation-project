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
            message.success(action.msg);
            return { ...state, isLogined: true, identity: action.identity }
        case LOGIN_FAILE:
            message.error(action.msg);
            return { ...state, isLogined: false, identity: action.identity }
        default:
            return state
    }
}

// action creators
function loginSucc(identity, msg) {
    return { type: LOGIN_SUCC, identity, msg }
}

function loginFaile(identity, msg) {
    return { type: LOGIN_FAILE, identity, msg }
}

function postLoginInfo(identity, userName, password) {
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
                    dispatch(loginSucc(identity, msg))
                } else if(response.code === status.LOGIN_FAILE) {
                    dispatch(loginFaile(identity, msg))
                }
            }
        });
    }
}

export const login = (identity, userName, password) => {
    return (dispatch, getState) => {
        return dispatch(postLoginInfo(identity, userName, password))
    }
}
