import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';

const GETLATITUDE_API = config.API_URL + '/api/latitude/zoom';

const LatitudeGetStart = () => {
    return {
        type: ActionTypes.LATITUDE_GET_START,
        getState: 0
    }
}

const LatitudeGetSuccess = (latitudes) => {
    return {
        type: ActionTypes.LATITUDE_GET_SUCCESS,
        latitudes: latitudes,
        getState: 1
    }
}

const LatitudeGetFailed = (state) => {
    return{
        type: ActionTypes.LATITUDE_GET_FAILED,
        latitudes: null,
        getState: state,
    }
}

const LatitudeGet =  () => {
    return async (dispatch) => {
        dispatch(LatitudeGetStart());

        await axios.get(GETLATITUDE_API, {
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            dispatch(LatitudeGetSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 403){
                dispatch(LatitudeGetFailed(-2)); // Auth Failed
            }else{
                dispatch(LatitudeGetFailed(-1)); //Network Connection and Sql error.
            }
        })
    }
}

export default {
    LatitudeGet
}
