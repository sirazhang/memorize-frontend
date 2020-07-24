import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    msg: '',
    sendEmailResetState: -10
}

export default (state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.SENDEMAILRESET_START:
            //console.log("SENDEMAILRESET_START")
            return {msg:"Started", sendEmailResetState:0};

        case ActionTypes.SENDEMAILRESET_SUCCESS:
            //console.log("SENDEMAILRESET_SUCCESS", {msg:"Success", sendEmailResetState:1})
            return {msg:"Success", sendEmailResetState:1};

        case ActionTypes.SENDEMAILRESET_FAILED:
            //console.log("SENDEMAILRESET_FAILED", {msg:"Failed", sendEmailResetState: action.sendEmailResetState})
            return {msg:"Failed", sendEmailResetState: action.sendEmailResetState};
        case ActionTypes.SENDEMAILRESET_INIT:
            //console.log("SENDEMAILRESET_INIT", {msg: "Failed", sendEmailResetState: action.sendEmailResetState})
            return {msg:"Init", sendEmailResetState: action.sendEmailResetState};
        default:
            return state;
    }
}
