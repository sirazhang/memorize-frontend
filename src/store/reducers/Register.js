import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    msg: '',
    registerState: -10
}

export default (state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.REGISTER_START:
            //console.log("REGISTER_STARTED")
            return {msg:"Started", registerState:0};

        case ActionTypes.REGISTER_SUCCESS:
            //console.log("REGISTER_SUCCESS", {msg:"Success", registerState:1})
            return {msg:"Success", registerState:1};

        case ActionTypes.REGISTER_FAILED:
            //console.log("REGISTER_FAILED", {msg:"Failed", registerState: action.registerState})
            return {msg:"Failed", registerState: action.registerState};
        case ActionTypes.REGISTER_INIT:
            //console.log("REGISTER_INIT", {msg: "Failed", registerState: action.registerState})
            return {msg:"Init", registerState: action.registerState};
        default:
            return state;
    }
}
