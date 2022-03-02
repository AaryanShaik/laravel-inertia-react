import {
  GET_ALL_LEADS_LOADED, GET_ALL_LEADS_FAILED_TO_LOAD, UPDATE_ALL_LEADS_LOADED, UPDATE_ALL_LEADS_FAILED_TO_LOAD, GET_LEAD_DETAILS_LOADE, GET_LEAD_DETAILS_FAILED_TO_LOAD, SET_LEAD_TYPE, SET_FILTER, FAILED_TO_SET_FILTER, GET_ALL_MOBILE_LEADS_FAILED_TO_LOAD, GET_ALL_MOBILE_LEADS_LOADED, ELIGIBLE_ATTORNEYS_LOADED,
  ASSIGNED_ATTORNEYS_LOADED, ATTORNEYS_LOADED, ALL_ATTORNEYS_LOADED, ALL_ATTORNEYS_FAILED_TO_LOAD, ASSIGN_LEAD_IN_LEAD_DETAILS, FAILED_TO_ASSIGN_LEAD_IN_LEAD_DETAILS, LEAD_ANALYTICS_DATA, USER_SEL_COLS_LEAD, LEADS_LOADING
} from "../actions/types";

const initialState = {
  loading: true,
  allleads: null,
  lead_details: null,
  Assigned: null,
  New: null,   //unsold or NEW lead
  Purchased: null,
  Disputed: null,
  Refunded: null,
  Archived: null,
  selected_lead_type: "",
  mobileLeads: [],
  hasmoredata: false,
  attorneys: null,
  eligibleAttorneys: null,
  assignedAttorney: null,
  allattorneys: [],  //all attorneys for filter
  // lead_filter:{
  //   channel: '',
  //   Attorney: '',
  //   CaseTypes: [],
  //   LeadName: '',
  //   LeadEmail: '',
  //   LeadContact: '',
  //   LeadLocation: '',
  //   fromdate: '',
  //   todate: '',
  //   // selectedchannel: [],
  //   // selectedAttorney: [],
  //   // selectedCaseTypes: [],
  //   // selectedLeadName: [],
  //   // selectedLeadEmail: [],
  //   // selectedLeadContact: [],
  //   // selectLeadLocation: [],
  //   // selectedfromdate: '',
  //   // selectedtodate: ''
  // },
  // Assigned: null,
  // New: null,   //unsold or NEW lead
  // Purchased: null,
  // Disputed: null,
  // Refunded: null,
  // Archived: null,
  selected_lead_type: "",
  lead_analytics_data: null,
  user_sel_cols_lead: ['Status', 'Case Type', 'Location', 'Phone']

};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_LEADS_LOADED:
      return {
        ...state,
        loading: false,
        allleads: payload.leads,
        // Assigned: payload.Assigned,
        // New: payload.New,
        // Purchased: payload.Purchased,
        // Disputed: payload.Disputed,
        // Refunded: payload.Refunded,
        // Archived: payload.Archived
      }

    case UPDATE_ALL_LEADS_LOADED:
      return {
        ...state,
        loading: false,
        allleads: payload,
      }


    case GET_ALL_MOBILE_LEADS_LOADED:
      console.log('payload mobileLeads:', payload);
      // let leads =  mobileLeads;
      if (payload.slicedLeads.length > 0) {
        return {
          ...state,
          loading: false,
          hasmoredata: true,
          mobileLeads: payload.slicedLeads
        }
      } else {
        return {
          ...state,
          loading: false,
          hasmoredata: false
        }
      }
    case GET_ALL_MOBILE_LEADS_FAILED_TO_LOAD:
      return {
        ...state,
        loading: false
      }
    case SET_LEAD_TYPE:
      return {
        ...state,
        selected_lead_type: payload
      }

    case GET_LEAD_DETAILS_LOADE:
      return {
        ...state,
        lead_details: payload
      }

    case ATTORNEYS_LOADED:
      return {
        ...state,
        loading: false,
        attorneys: payload
      }

    case LEADS_LOADING:
      return {
        ...state,
        loading: true
      }

    case ELIGIBLE_ATTORNEYS_LOADED:
      return {
        ...state,
        loading: false,
        eligibleAttorneys: payload
      }

    case ASSIGNED_ATTORNEYS_LOADED:
    case ASSIGN_LEAD_IN_LEAD_DETAILS:
      return {
        ...state,
        loading: false,
        assignedAttorney: payload
      }

    case ALL_ATTORNEYS_LOADED:
      return {
        ...state,
        loading: false,
        allattorneys: payload
      }
    // case SET_FILTER:
    //   return{
    //     ...state,
    //     lead_filter:{
    //       channel: payload.channel,
    //       Attorney: payload.Attorney,
    //       CaseTypes: payload.CaseTypes,
    //       LeadName: payload.LeadName,
    //       LeadEmail: payload.LeadEmail,
    //       LeadContact: payload.LeadContact,
    //       LeadLocation: payload.LeadLocation,
    //       fromdate: payload.fromdate,
    //       todate: payload.todate
    //     }
    //   }

    case GET_ALL_LEADS_FAILED_TO_LOAD:
    case GET_LEAD_DETAILS_FAILED_TO_LOAD:
    case ALL_ATTORNEYS_FAILED_TO_LOAD:
    case FAILED_TO_ASSIGN_LEAD_IN_LEAD_DETAILS:
    case UPDATE_ALL_LEADS_FAILED_TO_LOAD:
      // case FAILED_TO_SET_FILTER:
      return {
        ...state,
      }

    case LEAD_ANALYTICS_DATA:
      return {
        ...state,
        loading: false,
        lead_analytics_data: payload
      }

    case USER_SEL_COLS_LEAD:
      return {
        ...state,
        loading: false,
        user_sel_cols_lead: payload
      }

    default:
      return state;
  }
}