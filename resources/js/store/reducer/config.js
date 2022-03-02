import {
    SET_CONFIG_USER_TYPE,
    FAILED_TO_SET_CONFIG_USER_TYPE,
    SET_CONFIG_TEST_MODE,
    FAILED_TO_SET_CONFIG_TEST_MODE
} from "../actions/types";

const initialState = {
    loading: true,
    config_user_type: null,
    config_test_mode: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CONFIG_USER_TYPE:
          return{
            ...state,
            loading: false,
            config_user_type: payload
          }

        case SET_CONFIG_TEST_MODE:
          return{
            ...state,
            loading: false,
            config_test_mode: payload
          }

        case FAILED_TO_SET_CONFIG_USER_TYPE:
        case FAILED_TO_SET_CONFIG_TEST_MODE:
            return{
                ...state
              }
        
          default:
            return state;
        }
      }