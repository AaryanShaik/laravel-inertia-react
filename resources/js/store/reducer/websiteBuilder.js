import {
  WEBSITE_DATA_LOADED,
  WEBSITE_TABLE_DATA_LOADED,
  WEBSITE_TABLE_DATA_FAILED_TO_LOAD,
  WEBSITE_DETAIL_DATA_LOADED,
  WEBSITE_DETAIL_DATA_FAILED_TO_LOAD,
  WEBSITE_DATA_LOADING,
  FILTER_WEB_FIRM_NAME,
  FILTER_WEB_EMAIL,
  FILTER_WEB_MOB
} from "../actions/types";

const initialState = {
  loading: true,
  websiteData: null,
  websitebuildertable: [],
  websitebuilderdetails: null,
  filter_firmname: [],
  filter_email: "",
  filter_mob: ""
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case WEBSITE_DATA_LOADED:
      return {
        ...state,
        loading: false,
        websiteData: payload
      }

    case FILTER_WEB_FIRM_NAME:
      return {
        ...state,
        filter_firmname: payload
      }

    case FILTER_WEB_EMAIL:
      return {
        ...state,
        filter_email: payload
      }

    case FILTER_WEB_MOB:
      return {
        ...state,
        filter_mob: payload
      }

    case WEBSITE_TABLE_DATA_LOADED:
      return {
        ...state,
        loading: false,
        websitebuildertable: payload
      }

    case WEBSITE_DETAIL_DATA_LOADED:
      return {
        ...state,
        loading: false,
        websitebuilderdetails: payload
      }

    case WEBSITE_DATA_LOADING:
      return {
        ...state,
        loading: true,
      }

    case WEBSITE_TABLE_DATA_FAILED_TO_LOAD:
    case WEBSITE_DETAIL_DATA_FAILED_TO_LOAD:
      return {
        ...state
      }

    case WEBSITE_DETAIL_DATA_LOADED:
      return {
        ...state,
        websitebuilderdetails: payload
      }

    default:
      return state;
  }
}