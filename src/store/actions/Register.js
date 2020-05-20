import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';

const REGISTER_API = config.API_URL + '/api/auth/signup';

const RegisterStart = () => {
    return {
        type: ActionTypes.REGISTER_START,
        registerState: 0
    }
}

const RegisterSuccess = () => {
    return {
        type: ActionTypes.REGISTER_SUCCESS,
        registerState: 1
    }
}

const RegisterFailed = () => {
    return{
        type: ActionTypes.REGISTER_FAILED,
        registerState: -1
    }
}

const Register = (name, username, email, password, roles) => {
    return (dispatch) => {
        dispatch(RegisterStart());
        var request = {
            "name": name,
            "username": username,
            "password": password,
            "email": email,
            "roles": roles
        }
        //dispatch(RegisterSuccess(email, "msg", "token"));
        
        axios.post(REGISTER_API, request)
        .then(res => {
            if(res.data.auth === true){
                dispatch(RegisterSuccess());
            }else{
                dispatch(RegisterFailed());
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export default {
    Register
}