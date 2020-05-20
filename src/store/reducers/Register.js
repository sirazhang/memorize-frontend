import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    msg: '',
    registerState: -2
}

export default (state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.REGISTER_START:
            return {msg:"Started", registerState:0};

        case ActionTypes.REGISTER_SUCCESS:
            return {msg:"Success", registerState:1};

        case ActionTypes.REGISTER_FAILED:
            return {msg:"Failed", registerState:-1};
        
        default:
            return state;
    }
}
