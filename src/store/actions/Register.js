import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';
var validator = require('email-validator');

const REGISTER_API = config.API_URL + '/api/auth/signup';

const registerInit = () => {
    return{
        type: ActionTypes.REGISTER_INIT,
        registerState: -10
    }
}

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

/* Failed Code: 
     0 : validation success
    -1 : email invalid or already exists
    -2 : username invalid or already exists
    -3 : password invalid
*/

const RegisterFormValidate = (username, email, password) => {
    //console.log("Register Form Validate", email, username, password)
    if(username === "" || username === null) return -2;
    if(email === "" || email === null || !validator.validate(email)) return -1;
    if(password === null || password === "") return -3;
    //if(password.length < 6) return-3;
    return 0;
}

const RegisterFailed = (failedCode) => {
    return{
        type: ActionTypes.REGISTER_FAILED,
        registerState: failedCode
    }
}

const RegisterInit = () => {
    return (dispatch) =>{
        dispatch(registerInit());
    }
}

const Register = (name, username, password, email) => {
    return (dispatch) => {
        dispatch(RegisterStart());

        var failedCode = RegisterFormValidate(username, email, password);
        if(failedCode === 0){
            var request = {
                "name": name,
                "username": username,
                "password": password,
                "email": email,
                "roles": ["USER"]
            }
            //dispatch(RegisterSuccess(email, "msg", "token"));
            
            axios.post(REGISTER_API, request)
            .then(res => {
                if(res.data.code === 200){
                    dispatch(RegisterSuccess());
                }else{
                    dispatch(RegisterFailed());
                }
            })
            .catch(err => {
                //console.log(err.response.data)
                if(err.response.data === "Fail -> Email is already in use!")
                    dispatch(RegisterFailed(-1))
                else if(err.response.data === "Fail -> Username is already taken!")
                    dispatch(RegisterFailed(-2))
                else
                    dispatch(RegisterFailed(-4))
            })    
        }else{
            dispatch(RegisterFailed(failedCode))
        }
    }
}

export default {
    Register,
    RegisterInit
}