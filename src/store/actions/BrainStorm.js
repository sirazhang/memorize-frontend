import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';

const BRAINSTORM_GET_SYNONYMWORDS_API = config.API_URL+'/api/brainstorm/synonymwords'
const BRAINSTORM_UPDATE_BCREDIT_API = config.API_URL+'/api/brainstorm/updatebcredit'
const BRAINSTORM_GET_BCREDIT_API = config.API_URL+'/api/brainstorm/getbcredit'

const GetSynonymWordsSuccess = (wordData, status) => {
    return {
        type: ActionTypes.BRAINSTORM_GET_SYNONYMWORDS,
        synWorddata: wordData,
        synWordStatus: status
    }
}

const GetSynonymWords = (i_Nth) => {
    return async(dispatch) => {
        //console.log(i_Nth);
        await axios.post(BRAINSTORM_GET_SYNONYMWORDS_API, {
            i_Nth: i_Nth
        },{
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            dispatch(GetSynonymWordsSuccess(res.data.data, 0));
        })
        .catch(err =>{
            //console.log(err);
            if(err.response.status === 403){
                dispatch(GetSynonymWordsSuccess(null, -2))
            }else{
                dispatch(GetSynonymWordsSuccess(null, -1))
            }
        })
    }
}

const UpdateBCreditSuccess = (status, bcredit) => {
    return{
        type:ActionTypes.BRAINSTORM_UPDATE_BCREDIT,
        status: status,
        bcredit: bcredit
    }
}
const UpdateBCredit = (bcredit) => {
    return async(dispatch) => {
        await axios.post(BRAINSTORM_UPDATE_BCREDIT_API, {
            bcredit: bcredit
        },{
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            dispatch(UpdateBCreditSuccess(0, res.data.data));
        })
        .catch(err =>{
            //console.log(err);
            if(err.response.status === 403){
                dispatch(UpdateBCreditSuccess(-2, null))
            }else{
                dispatch(UpdateBCreditSuccess(-1, null))
            }
        })
    }
}

const GetBCreditSuccess = (bcredit) => {
    return{
        type: ActionTypes.BRAINSTORM_GET_BCREDIT,
        bcredit: bcredit
    }
}

const GetBCredit = () => {
    return async(dispatch) => {
        await axios.get(BRAINSTORM_GET_BCREDIT_API,
            {
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            dispatch(GetBCreditSuccess(res.data.data));
        })
        .catch(err =>{
            //console.log(err);
            if(err.response.status === 403){
                dispatch(GetBCreditSuccess(null))
            }else{
                dispatch(GetBCreditSuccess(null))
            }
        })
    }
}

export default{
    GetSynonymWords,
    UpdateBCredit,
    GetBCredit,
}