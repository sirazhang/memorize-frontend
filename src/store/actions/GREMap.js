import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';

const GRE_GET_WORDDATA_API = config.API_URL + '/api/worddata/selectlist_gre';
const GRE_GET_LATITUDE_API = config.API_URL + '/api/worddata/latitude_gre';
const GRE_GET_LONGITUDE_API = config.API_URL + '/api/worddata/longitude_gre';

const WordDataGetSuccess = (wordData, status) => {
    return {
        type: ActionTypes.GRE_GET_WORDDATA,
        greWordData: wordData,
        greWordStatus: status
    }
}

const GREWordDataGet = (i_Nth) => {
    return async(dispatch) => {
        await axios.post(GRE_GET_WORDDATA_API, {
            i_Nth: i_Nth,
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            //console.log(res.data.data.records)
            dispatch(WordDataGetSuccess(res.data.data.records, 0));
        })
        .catch(err =>{
            //console.log(err);
            if(err.response.status === 403){
                dispatch(WordDataGetSuccess(null, -2))
            }else{
                dispatch(WordDataGetSuccess(null, -1))
            }
        })
    }
}

const LatitudeGetSuccess = (latitude, status) => {
    return {
        type: ActionTypes.GRE_GET_LATITUDE,
        greLatitude: latitude,
        greLatStatus: status
    }
}

const GRELatitudeGet = (i_Nth) =>{
    return async(dispatch) => {
        await axios.post(GRE_GET_LATITUDE_API, {
            i_Nth: i_Nth,
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            //console.log(res.data.data)
            dispatch(LatitudeGetSuccess(res.data.data, 0));
        })
        .catch(err =>{
            //console.log(err);
            if(err.response.status === 403){
                dispatch(LatitudeGetSuccess(null, -2))
            }else{
                dispatch(LatitudeGetSuccess(null, -1))
            }
        })
    }
}

const LongitudeGetSuccess = (longitude, status) => {
    return {
        type: ActionTypes.GER_GET_LONGITUDE,
        greLongitude: longitude,
        greLonStatus: status
    }
}

const GRELongitudeGet = (i_Nth) =>{
    return async(dispatch) => {
        await axios.post(GRE_GET_LONGITUDE_API, {
            i_Nth: i_Nth,
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            //console.log(res.data.data)
            dispatch(LongitudeGetSuccess(res.data.data, 0));
        })
        .catch(err =>{
            //console.log(err);
            if(err.response.status === 403){
                dispatch(LongitudeGetSuccess(null, -2))
            }else{
                dispatch(LongitudeGetSuccess(null, -1))
            }
        })
    }
}

export default {
    GREWordDataGet,
    GRELatitudeGet,
    GRELongitudeGet
}