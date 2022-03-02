import {
  AFFILIATE_DATA_LOADED,
  GET_AFFILIATE_LEAD_DATA,
  FAILED_TO_GET_AFFILIATE_LEAD_DATA,
  TEMP_AFFILIATE_DATA,
  FILTER_AFFILIATE_NAME,
  FILTER_AFFILIATE_LOCATION,
  FILTER_AFFILIATE_CASETYPE,
  FILTER_AFFILIATE_TYPE
} from "../actions/types";

const initialState = {
  loading: true,
  affiliatesData: null,
  affiliates_leads: [],
  temp_data: [],
  filter_name: "",
  filter_location: "",
  filter_casetype: [],
  filter_type:""
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AFFILIATE_DATA_LOADED:
      return {
        ...state,
        loading: false,
        affiliatesData: payload
      }

    case GET_AFFILIATE_LEAD_DATA:
      return {
        ...state,
        loading: false,
        affiliates_leads: payload
      }

    case FAILED_TO_GET_AFFILIATE_LEAD_DATA:
      return {
        ...state
      }

    case TEMP_AFFILIATE_DATA:
      return {
        ...state,
        loading: false,
        temp_data: payload
      }

    case FILTER_AFFILIATE_NAME:
      return {
        ...state,
        loading: false,
        filter_name: payload
      }

    case FILTER_AFFILIATE_LOCATION:
      return {
        ...state,
        loading: false,
        filter_location: payload
      }

    case FILTER_AFFILIATE_CASETYPE:
      return {
        ...state,
        loading: false,
        filter_casetype: payload
      }

      case FILTER_AFFILIATE_TYPE:
        return {
          ...state,
          loading: false,
          filter_type: payload
        }

    default:
      return state;
  }
}