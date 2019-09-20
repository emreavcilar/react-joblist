import * as webService from "../services/webService"
import * as actionTypes from "../constants/actionTypes"

export const listDataResults = (payload) => ({
    type: actionTypes.GET_LIST_DATA,
    payload: payload
});

export const getListData = () => dispatch => {
    return webService.getListData();
};

export const detailDataResult = (payload) => ({
    type: actionTypes.GET_DETAIL_DATA,
    payload: payload
});

export const getDetailData = (jobId) => dispatch => {
    return webService.getDetailData(jobId)
};

export const resetDetailData = () => ({
    type:actionTypes.RESET_DETAIL_DATA
});