import * as ActionTypes from '../actions/ActionTypes'

const initialState = {
    greLatitude: null,
    greLongitude: null,
    greWordData: null,
    greWordStatus: -10,
    greLatStatus: -10,
    greLonStatus: -10,
}

export default(state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.GRE_GET_WORDDATA:
            return {...state, greWordData:action.greWordData, greWordStatus: action.greWordStatus}
        case ActionTypes.GRE_GET_LATITUDE:
            return {...state, greLatitude:action.greLatitude, greLatStatus: action.greLatStatus}
        case ActionTypes.GER_GET_LONGITUDE:
            return {...state, greLongitude: action.greLongitude, greLonStatus: action.greLonStatus}
        default:
            return state
    }
}

