import {
    GET_DETAIL_DATA,
    RESET_DETAIL_DATA
} from '../constants/actionTypes'

const initialState = {
};

const appReducer = (state = initialState,action) => {
    switch (action.type){
        case GET_DETAIL_DATA:
            return {
                ...state,
                data:{...action.payload}
            };
        case RESET_DETAIL_DATA:
            return {
                ...state,
                data:{}
            };
        default:
            return state;
    }
};

export default appReducer;