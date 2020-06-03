import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';

const GETWORDDATA_API = config.API_URL + '/api/worddata/selectlist_zoom';

const WordDataGetStart = () => {
    return {
        type: ActionTypes.WORDDATA_GET_START,
        getState: 0
    }
}

const WordDataGetSuccess = (worddata, worddata_rnd, worddata_rnd_lat, worddata_rnd_lon) => {
    return {
        type: ActionTypes.WORDDATA_GET_SUCCESS,
        worddata: worddata,
        worddata_rnd: worddata_rnd,
        worddata_rnd_lat: worddata_rnd_lat,
        worddata_rnd_lon: worddata_rnd_lon,
        getState: 1
    }
}

const WordDataGetFailed = (state) => {
    return{
        type: ActionTypes.WORDDATA_GET_FAILED,
        worddata: null,
        getState: state,
    }
}

const WordDataGet = (lat_min, lat_max, lon_min, lon_max) => {
    return async(dispatch) => {
        dispatch(WordDataGetStart());
        var request = {
            lat_min: lat_min,
            lat_max: lat_max,
            lon_min: lon_min,
            lon_max: lon_max
        }
        
        await axios.post(GETWORDDATA_API, request, {
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            //console.log(res.data.data.records);
            dispatch(WordDataGetSuccess(res.data.data.records, res.data.data.records_rnd, res.data.data.records_rnd_lat, res.data.data.records_rnd_lon));
        })
        .catch(err => {
            //console.log(err);
            if(err.response.status === 403){
                dispatch(WordDataGetFailed(-2)); // Auth Failed
            }else{
                dispatch(WordDataGetFailed(-1)); //Network Connection and Sql error.
            }
        })
    }
}

export default {
    WordDataGet
}
