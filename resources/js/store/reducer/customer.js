import {
    CUSTOMER_DATA_LOADED,
    ALL_CUSTOMERS_LOADED,
    ALL_CUSTOMERS_FAILED_TO_LOAD,
    GET_ALL_MOBILE_CUSTOMERS,
    GET_ALL_MOBILE_CUSTOMERS_FAILED_TO_LOAD,
    CUSTOMER_DETAILS_LOADED,
    ALL_CUSTOMER_DETAILS_FAILED_TO_LOAD,
    CUSTOMERS_PURCHSED_LEADS_LOADED,
    CUSTOMERS_PURCHSED_LEADS_FAILED_TO_LOAD,
    CUSTOMERS_ELIGIBLE_LEADS_LOADED,
    CUSTOMERS_ELIGIBLE_LEADS_FAILED_TO_LOAD,
    CUSTOMERS_REPORTED_LEADS_LOADED,
    CUSTOMERS_REPORTED_LEADS_FAILED_TO_LOAD,
    CUSTOMERS_WEBSITE_ABOUT_LOADED,
    CUSTOMERS_SPECIALIZATIONS_LOADED,
    CUSTOMERS_SETTLEMENTS_LOADED,
    CUSTOMERS_TESTIMONIALS_LOADED,
    ACCOUNT_INFORMATION_LOADED,
    ALL_CUSTOMERS_LOADING
} from "../actions/types";

const initialState = {
    loading: true,
    customerData: null,
    allcustomers: [],
    mobileCustomers:[],
    customerdetails:null,
    purchasedleads:[],
    eligibleleads:[],
    reportedleads:[],
    websiteAbout:null,
    settlements:null,
    testimonials:null,
    specializations:null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CUSTOMER_DATA_LOADED:
          return{
            ...state,
            loading: false,
            customerData: payload
          }

        case ALL_CUSTOMERS_LOADED:
          return{
            ...state,
            loading: false,
            allcustomers: payload
          }
        
        case CUSTOMER_DETAILS_LOADED:
          return{
            ...state,
            loading: false,
            customerdetails: payload
          }

        case CUSTOMERS_PURCHSED_LEADS_LOADED:
          return{
            ...state,
            loading: false,
            purchasedleads: payload
          }

        case CUSTOMERS_ELIGIBLE_LEADS_LOADED:
          return{
            ...state,
            loading: false,
            eligibleleads: payload
          }

        case CUSTOMERS_REPORTED_LEADS_LOADED:
          return{
            ...state,
            loading: false,
            reportedleads: payload
          }

        case CUSTOMERS_WEBSITE_ABOUT_LOADED:
          return{
            ...state,
            loading:false,
            websiteAbout:payload
          }

        case CUSTOMERS_SPECIALIZATIONS_LOADED:
          console.log('redux specialization', payload)
          return{
            ...state,
            loading:false,
            specializations:payload
          }

        case CUSTOMERS_SETTLEMENTS_LOADED:
          return{
            ...state,
            loading:false,
            settlements:payload
          }

        case CUSTOMERS_TESTIMONIALS_LOADED:
          return{
            ...state,
            loading:false,
            testimonials:payload
          }

        case ALL_CUSTOMERS_FAILED_TO_LOAD:
        case GET_ALL_MOBILE_CUSTOMERS_FAILED_TO_LOAD:
        case ALL_CUSTOMER_DETAILS_FAILED_TO_LOAD:
        case CUSTOMERS_PURCHSED_LEADS_FAILED_TO_LOAD:
        case CUSTOMERS_ELIGIBLE_LEADS_FAILED_TO_LOAD:
        case CUSTOMERS_REPORTED_LEADS_FAILED_TO_LOAD:
          return{
            ...state,
          }
        
        case GET_ALL_MOBILE_CUSTOMERS:
          return{
            ...state,
            loading: false,
            hasmoredata:true,
            mobileCustomers: payload
          }

          case ACCOUNT_INFORMATION_LOADED:
          return{
            ...state,
            loading: false,
            customerdetails: payload
          }

          case ALL_CUSTOMERS_LOADING:
            return{
              ...state,
              loading: true
            }

          default:
            return state;
        }
      }