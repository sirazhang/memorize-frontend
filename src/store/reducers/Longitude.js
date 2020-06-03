import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    longitudes: null,
    getState: -10
}

export default (state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.LONGITUDE_GET_START:
            return {longitudes: null, getState: 0};
        case ActionTypes.LONGITUDE_GET_SUCCESS:
            //console.log(action.longitudes)
            return {longitudes: action.longitudes, getState: 1}
        case ActionTypes.LONGITUDE_GET_FAILED:
            return{longitudes: null, getState: action.getState}
        default: 
            return state
    }
}
