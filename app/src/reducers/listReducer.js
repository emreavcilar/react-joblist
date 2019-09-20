import {
    GET_LIST_DATA
} from '../constants/actionTypes'

const initialState = {
};

const appReducer = (state = initialState,action) => {
    switch (action.type){
        case GET_LIST_DATA:
            return {
                ...state,
                data:[...action.payload]
            };
        default:
            return state;
    }
};

export default appReducer;