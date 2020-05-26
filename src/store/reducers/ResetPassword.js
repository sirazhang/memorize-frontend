import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    msg: '',
    resetState: -10
}

export default (state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.RESET_START:
            console.log("RESET_STARTED")
            return {msg:"Started", resetState:0};

        case ActionTypes.RESET_SUCCESS:
            console.log("RESET_SUCCESS", {msg:"Success", resetState:1})
            return {msg:"Success", resetState:1};

        case ActionTypes.RESET_FAILED:
            console.log("RESET_FAILED", {msg:"Failed", resetState: action.resetState})
            return {msg:"Failed", resetState: action.resetState};
        case ActionTypes.RESET_INIT:
            console.log("RESET_INIT", {msg: "Failed", resetState: action.resetState})
            return {msg:"Init", resetState: action.resetState};
        default:
            return state;
    }
}
