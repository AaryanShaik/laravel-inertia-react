import { LOGIN_SUCCESS,LOGIN_FAILED } from "../actions/types";

const initialState = {
    loading: true,
    authenticated: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
        return{
          ...state,
          loading: false,
          authenticated: true
        }

        case LOGIN_FAILED:
        return{
          ...state,
          loading: false,
          authenticated: false
        }
      
        default:
          return state;
      }
    }