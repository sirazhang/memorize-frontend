import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';
var validator = require('email-validator');

const SENDEMAILRESET_API = config.API_URL + '/api/auth/reset-password-mail';

const sendEmailResetInit = () => {
    return{
        type: ActionTypes.SENDEMAILRESET_INIT,
        sendEmailResetState: -10
    }
}

const SendEmailResetStart = () => {
    return {
        type: ActionTypes.SENDEMAILRESET_START,
        sendEmailResetState: 0
    }
}

const SendEmailResetSuccess = () => {
    return {
        type: ActionTypes.SENDEMAILRESET_SUCCESS,
        sendEmailResetState: 1
    }
}

/* Failed Code: 
     0 : validation success
    -1 : email invalid or already exists
    -3 : password invalid
*/

const FormValidate = (email) => {
    //console.log("Send Email Form Validate", email)
    if(email === "" || email === null || !validator.validate(email)) return -1;
    return 0;
}

const SendEmailResetFailed = (failedCode) => {
    return{
        type: ActionTypes.SENDEMAILRESET_FAILED,
        sendEmailResetState: failedCode
    }
}

const SendEmailResetInit = () => {
    return (dispatch) =>{
        dispatch(sendEmailResetInit());
    }
}

const SendEmailReset = (email) => {
    return (dispatch) => {
        dispatch(SendEmailResetStart());

        var failedCode = FormValidate(email);
        if(failedCode === 0){
            var request = {
                "email": email,
            }
            
            axios.post(SENDEMAILRESET_API, request)
            .then(res => {
                if(res.data.code === 0){
                    dispatch(SendEmailResetSuccess());
                }else{
                    dispatch(SendEmailResetFailed(-1));
                }
            })
            .catch(err => {
                //console.log(err.response.data)
                dispatch(SendEmailResetFailed(-1))
            })
        }else{
            //console.log("Form Validation Failed")
            dispatch(SendEmailResetFailed(failedCode))
        }
    }
}

export default {
    SendEmailReset,
    SendEmailResetInit,
}

