import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    data: null,
    status: -10,
}

export default (state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.REVIEW_SAVE_WORD_STUDYSTATUS:
            //console.log("UserStudy / Save...", action)
            return {...state, action}
        case ActionTypes.REVIEW_SELECTLIST_USERSTUDY:
            //console.log("UserStudy / Selectlist ... ", action)
            return {data:action.data, status: action.status}
        default:
            return state;
    }
}
