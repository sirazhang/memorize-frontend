import * as ActionTypes from '../actions/ActionTypes'

const initialState = {
    guideShow: true,
}

export default(state=initialState, action) => {
    const {type} = action;
    switch(type){
        case ActionTypes.GUIDE_SHOW:
            //console.log("Reducer / Guide Screen Show")
            return {...state, guideShow: true}
        case ActionTypes.GUIDE_HIDE:
            return {...state, guideShow: false}
        default:
            return state
    }
}
