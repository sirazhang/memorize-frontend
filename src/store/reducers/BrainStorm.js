import * as ActionTypes from '../actions/ActionTypes'

const initialState = {
    synWorddata: null,
    synWordStatus: -10,
    bStatus: -10,
    bcredit: 0,
}

export default(state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.BRAINSTORM_GET_SYNONYMWORDS:
            //console.log(action.synWorddata)
            return {...state, synWorddata: action.synWorddata, synWordStatus: action.synWordStatus};
        case ActionTypes.BRAINSTORM_UPDATE_BCREDIT:
            //console.log("Reducer/Brainstorm/UpdateBCredit", action.status)
            return {...state, bStatus: action.status, bcredit: action.bcredit}
        case ActionTypes.BRAINSTORM_GET_BCREDIT:
            //console.log("Reducer/Brainstorm/GetBCredit", action.bcredit)
            return {...state, bcredit: action.bcredit}
        default:
            return state;
    }
}
