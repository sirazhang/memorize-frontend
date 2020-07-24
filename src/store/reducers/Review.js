import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    wordDataByPage: null,
    totalRowCount: null,
    status: -10,
}

export default (state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.REVIEW_GET_WORDPAGE:
            //console.log("Review / get wordpage...", action)
            return {
                wordDataByPage: action.wordDataByPage,
                totalRowCount: action.totalRowCount,
                status: action.status
            }
        default:
            return state;
    }
}
