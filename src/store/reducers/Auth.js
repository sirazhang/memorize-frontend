import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    id: '',
    token: '',
    msg: '',
    loginState: -10
}

export default (state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.LOGIN_START:
            return {id:'', token:'', msg:'Login Started', loginState: 0};

        case ActionTypes.LOGIN_SUCCESS:
            localStorage.setItem("user-memorize-token", action.token);
            return {id: action.id, token:action.token, msg: action.msg, loginState: 1};

        case ActionTypes.LOGIN_FAILED:
            return {id:'', token:'', msg:'Login Started', loginState: -1};
        
        default:
            return state;
    }
}
