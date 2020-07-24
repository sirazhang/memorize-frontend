import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    wordData: null,
    wordDataRnd: null,
    wordDataRndLat: null,
    wordDataRndLon: null,
    getState: -10
}

export default (state=initialState, action) => {
    const{type} = action;
    switch(type){
        case ActionTypes.WORDDATA_GET_INIT:
            return {...state, getState: -10};
        case ActionTypes.WORDDATA_GET_START:
            return {wordData: null, getState: 0};
        case ActionTypes.WORDDATA_GET_SUCCESS:
            //console.log(action.worddata, action.worddata_rnd, action.worddata_rnd_lat, action.worddata_rnd_lon)
            return {wordData: action.worddata, wordDataRnd: action.worddata_rnd, wordDataRndLat: action.worddata_rnd_lat, wordDataRndLon: action.worddata_rnd_lon, getState: 1}
        case ActionTypes.WORDDATA_GET_FAILED:
            return{wordData: null, getState: action.getState}
        default: 
            return state
    }
}
