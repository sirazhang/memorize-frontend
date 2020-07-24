import * as ActionTypes from './ActionTypes'

const GuideScreenShowSuccess = () => {
    return {
        type: ActionTypes.GUIDE_SHOW,
        guideShow: true,
    }
}

const GuideScreenHideSuccess = () => {
    return{
        type: ActionTypes.GUIDE_HIDE,
        guideShow: false,
    }
}

const GuideScreenShow = () => {
    return (dispatch) => {
        //console.log("Actions/ Guide Screen Show")
        dispatch(GuideScreenShowSuccess());
    }
}

const GuideScreenHide = () => {
    return (dispatch) => {
        //console.log("Actions/ Guide Screen Hide")
        dispatch(GuideScreenHideSuccess());
    }
}

export default{
    GuideScreenShow,
    GuideScreenHide
}