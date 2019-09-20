import axios from 'axios';
import {
    DATA
} from '../constants';

export const getListData = () => {
    return axios.get(DATA+"/list.json");
};

export const getDetailData = (jobId) => {
    return axios.get(DATA+"/"+jobId+".json");
};