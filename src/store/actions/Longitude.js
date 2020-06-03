import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';

const GETLONGITUD_API = config.API_URL + '/api/longitude/zoom';



const LongitudeGetStart = () => {
    return {
        type: ActionTypes.LONGITUDE_GET_START,
        getState: 0
    }
}

const LongitudeGetSuccess = (longitudes) => {
    return {
        type: ActionTypes.LONGITUDE_GET_SUCCESS,
        longitudes: longitudes,
        getState: 1
    }
}

const LongitudeGetFailed = (state) => {
    return{
        type: ActionTypes.LONGITUDE_GET_FAILED,
        longitudes: null,
        getState: state,
    }
}

const LongitudeGet = () => {
    return async(dispatch) => {
        dispatch(LongitudeGetStart());

        await axios.get(GETLONGITUD_API, {
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            dispatch(LongitudeGetSuccess(res.data.data));
        })
        .catch(err => {
            if(err.response.status === 403){
                dispatch(LongitudeGetFailed(-2)); // Auth Failed
            }else{
                dispatch(LongitudeGetFailed(-1)); //Network Connection and Sql error.
            }
        })
    }
}

export default {
    LongitudeGet
}
