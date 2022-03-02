import {
    LEAD_DATA_LOADED
} from "../actions/types";

const initialState = {
    loading: true,
    leadData: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LEAD_DATA_LOADED:
          console.log('lead from reducer', payload);
          return{
            ...state,
            loading: false,
            leadData: payload
          }
        
          default:
            return state;
        }
      }