import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';
var validator = require('email-validator');

const RESET_API = config.API_URL + '/api/auth/update-password';

const resetInit = () => {
    return{
        type: ActionTypes.RESET_INIT,
        resetState: -10
    }
}

const ResetStart = () => {
    return {
        type: ActionTypes.RESET_START,
        resetState: 0
    }
}

const ResetSuccess = () => {
    return {
        type: ActionTypes.RESET_SUCCESS,
        resetState: 1
    }
}

/* Failed Code: 
     0 : validation success
    -1 : email invalid or already exists
    -3 : password invalid
*/

const ResetFormValidate = (email, password) => {
    console.log("Reset Form Validate", email, password)
    if(email === "" || email === null || !validator.validate(email)) return -1;
    if(password === null || password === "") return -1;
    //if(password.length < 6) return-3;
    return 0;
}

const ResetFailed = (failedCode) => {
    return{
        type: ActionTypes.RESET_FAILED,
        resetState: failedCode
    }
}

const ResetInit = () => {
    return (dispatch) =>{
        dispatch(resetInit());
    }
}

const Reset = (email, password) => {
    return (dispatch) => {
        dispatch(ResetStart());

        var failedCode = ResetFormValidate(email, password);
        if(failedCode === 0){
            var request = {
                "password": password,
                "email": email,
            }
            //dispatch(ResetSuccess(email, "msg", "token"));
            
            axios.post(RESET_API, request)
            .then(res => {
                if(res.data.code === 0){
                    dispatch(ResetSuccess());
                }else{
                    dispatch(ResetFailed(-1));
                }
            })
            .catch(err => {
                console.log(err.response.data)
                dispatch(ResetFailed(-1))
            })
        }else{
            console.log("Form Validation Failed")
            dispatch(ResetFailed(failedCode))
        }
    }
}

export default {
    Reset,
    ResetInit
}

