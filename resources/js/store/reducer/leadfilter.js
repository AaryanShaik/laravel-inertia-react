import { SET_FILTER, FAILED_TO_SET_FILTER } from "../actions/types";
import moment from "moment";

const initialState = {
    loading: true,
    lead_filter:{
        channel: '',
        // Attorney: '',
        Attorney: {},
        CaseTypes: [],
        LeadName: '',
        LeadEmail: '',
        LeadContact: '',
        LeadLocation: '',
        fromdate: '',
        todate: '',
        // selectedchannel: [],
        // selectedAttorney: [],
        // selectedCaseTypes: [],
        // selectedLeadName: [],
        // selectedLeadEmail: [],
        // selectedLeadContact: [],
        // selectLeadLocation: [],
        // selectedfromdate: '',
        // selectedtodate: ''
    }, 
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
          case SET_FILTER:
            console.log(' payload.fromdate ', payload && payload.fromdate)
            return{
              ...state,
              loading:false,
              lead_filter:{
                channel: payload.channel,
                Attorney: payload.Attorney,
                CaseTypes: payload.CaseTypes,
                LeadName: payload.LeadName,
                LeadEmail: payload.LeadEmail,
                LeadContact: payload.LeadContact,
                LeadLocation: payload.LeadLocation,
                fromdate: payload.fromdate, //!=='' ? new Date(payload.fromdate).toLocaleDateString()+ ' 00:00:00' : payload.fromdate,
                todate: payload.todate //!=='' ? new Date(payload.todate).toLocaleDateString() + ' 23:59:59' : payload.todate
                // fromdate: payload.fromdate !=="" ? `${moment(payload.fromdate).tz("America/Los_Angeles").format('MM-DD-YYYY HH:mm:ss')}`: '', //payload.fromdate, //!=='' ? new Date(payload.fromdate).toLocaleDateString()+ ' 00:00:00' : payload.fromdate,
                // todate: payload.fromdate !=="" ? `${moment(payload.todate).tz("America/Los_Angeles").format('MM-DD-YYYY HH:mm:ss')}`: '' //payload.todate //!=='' ? new Date(payload.todate).toLocaleDateString() + ' 23:59:59' : payload.todate
                // fromdate: payload.fromdate !=="" ? `${moment(payload.fromdate).toString()}`: '', //payload.fromdate, //!=='' ? new Date(payload.fromdate).toLocaleDateString()+ ' 00:00:00' : payload.fromdate,
                // todate: payload.fromdate !=="" ? `${moment(payload.todate).toString()}`: '' //payload.todate //!=='' ? new Date(payload.todate).toLocaleDateString() + ' 23:59:59' : payload.todate
              }
            }
        
          case FAILED_TO_SET_FILTER:
            return{
              ...state,
            }

          default:
            return state;
        }
      }