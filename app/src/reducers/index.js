import { combineReducers } from 'redux';
import listReducer from './listReducer';
import detailReducer from './detailReducer';

const combineRed = combineReducers({
    listReducer,
    detailReducer
});

export default combineRed