import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';

const LOGIN_API = config.API_URL + '/api/auth/signin';

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
                dispatch(LoginSuccess(request.email, "Success", res.data.accessToken));
            }else{
                dispatch(LoginFailed("Failed"));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(LoginFailed("Failed"));
        })
    }
}

export default {
    Login
}
