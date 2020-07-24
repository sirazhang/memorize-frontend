import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';

const LOGIN_API = config.API_URL + '/api/auth/signin';
const GET_USER_CONTENT_API = config.API_URL + '/api/test/user';

const LoginStart = () => {
    return {
        type: ActionTypes.LOGIN_START,
        loginState: 0
    }
}

const LoginSuccess = (id, msg, token) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        id: id,
        token: token,
        msg: msg,
        loginState: 1
    }
}

const LoginFailed = (msg) => {
    return{
        type: ActionTypes.LOGIN_FAILED,
        msg: msg,
        loginState: -1
    }
}

const LogoutUser = () => {
    return{
        type: ActionTypes.LOGOUT
    }
}

const Login = (email, password) => {
    return (dispatch) => {
        dispatch(LoginStart());
        var request = {
            "email": email,
            "password": password
        }
        //dispatch(LoginSuccess(email, "msg", "token"));
        
        axios.post(LOGIN_API, request)
        .then(res => {
            if(res.data.auth === true){
                dispatch(LoginSuccess(res.data.id, "Success", res.data.accessToken));
            }else{
                dispatch(LoginFailed("Failed"));
            }
        })
        .catch(err => {
            //console.log(err);
            dispatch(LoginFailed("Failed"));
        })
    }
}

const Logout = () => {
    return (dispatch) => {
        dispatch(LogoutUser());
    }
}

const GetUserContentSuccess = (id) => {
    return {
        type: ActionTypes.GET_USER_CONTENT,
        id : id
    }
}

const GetUserContent = () => {
    return async (dispatch) =>{
        axios.get(GET_USER_CONTENT_API, {
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            dispatch(GetUserContentSuccess(res.data.data.username))
        })
    }
}

export default {
    Login,
    Logout,
    GetUserContent
}
