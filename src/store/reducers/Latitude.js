import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    latitudes: null,
    getState: -10
}

export default (state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.LATITUDE_GET_START:
            return {latitudes: null, getState: 0};
        case ActionTypes.LATITUDE_GET_SUCCESS:
            //console.log(action.latitudes);
            return {latitudes: action.latitudes, getState: 1}
        case ActionTypes.LATITUDE_GET_FAILED:
            return{latitudes: null, getState: action.getState}
        default: 
            return state
    }
}