import {
    SEARCHED_BOUNDS_LOADED,SEARCHED_BOUNDS_LOADING
} from '../actions/types';

const initialState = {
    loading: false,
    temp_map_bounds: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SEARCHED_BOUNDS_LOADED:
            return{
                ...state,
                loading:false,
                temp_map_bounds:payload
            }

            case SEARCHED_BOUNDS_LOADING:
                return{
                    ...state,
                    loading:true
                }

            default:
                return state;
            }
          }