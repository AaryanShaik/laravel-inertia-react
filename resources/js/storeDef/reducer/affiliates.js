import { TEMP_DATA } from "../actions/types";

const initialState = {
    loading: true,
    temp_data: ""
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEMP_DATA:
            return {
                ...state,
                loading: false,
                temp_data: payload
            }

        default:
            return state;
    }
}