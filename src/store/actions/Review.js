import * as ActionTypes from './ActionTypes'
import axios from 'axios';
import * as config from '../../config';

const REVIEW_GET_WORDDATA_API = config.API_URL + '/api/worddata/selectlist';
const REVIEW_USERSTUDY_SAVE_API = config.API_URL + '/api/userstudy/save';
const REVIEW_SELECTLIST_USERSTUDY_API = config.API_URL + '/api/userstudy/selectlist';

const Get_WordData_Success = (records, totalRowCount, status) => {
    return{
        type: ActionTypes.REVIEW_GET_WORDPAGE,
        wordDataByPage: records,
        totalRowCount: totalRowCount,
        status: status,
    }
}

const Get_WordData_ByPage = (pageNumber, pageSize, searchValue) => {
    return async (dispatch) => {
        await axios.post(REVIEW_GET_WORDDATA_API, {
            PageNo: pageNumber,
            PageSize: pageSize,
            SearchValue: searchValue,
        }, {
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            dispatch(Get_WordData_Success(res.data.data.records, res.data.data.totalRowCount[0][0]["@o_TotalRowCount"], 0))
        })
        .catch(err => {
            //console.log(err);
        })
    }
}

const Save_UserStudy_Success = (status) => {
    return{
        type: ActionTypes.REVIEW_SAVE_WORD_STUDYSTATUS,
        status: status,
    }
}

const Save_UserStudy = (wordId, studyStatus, pageNumber, pageSize, searchValue) => {
    return async(dispatch) => {
        await axios.post(REVIEW_USERSTUDY_SAVE_API, {
            StudyStatus: studyStatus,
            WordId: wordId,
        },{
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            dispatch(Save_UserStudy_Success(0))
            dispatch(Get_WordData_ByPage(pageNumber, pageSize, searchValue))
            dispatch(SelectList_UserStudy(1))
        })
        .catch(err => {
            if(err.response.status === 403){
                dispatch(Save_UserStudy_Success(-2))
            }else{
                dispatch(Save_UserStudy_Success(-1))
            }
        })
    }
}

const SelectList_UserStudy_Success = (data, status) => {
    return {
        type: ActionTypes.REVIEW_SELECTLIST_USERSTUDY,
        data: data,
        status: status
    }
}

const SelectList_UserStudy = (reviewed) => {
    return async(dispatch) => {
        //console.log(reviewed);
        await axios.post(REVIEW_SELECTLIST_USERSTUDY_API, {
            reviewed: reviewed
        }, {
            headers: {
                "x-access-token": localStorage.getItem("user-memorize-token")
            }
        })
        .then(res => {
            dispatch(SelectList_UserStudy_Success(res.data.data, 0))
        })
        .catch(err => {
            if(err.response.status === 403){
                dispatch(SelectList_UserStudy_Success(null, -2))
            }else{
                dispatch(SelectList_UserStudy_Success(null, -1))
            }
        })
    }
}

export default {
    Get_WordData_ByPage,
    Save_UserStudy,
    SelectList_UserStudy
}

