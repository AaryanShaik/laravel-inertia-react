import {
    INVITE_DATA_LOADED,
    ALL_INVITES_LOADED,
    ALL_INVITES_FAILED_TO_LOAD,
    INVITE_DETAILS_LOADED,
    INVITE_DETAILS_FAILED_TO_LOAD,
    GET_ATTORNEY_PROSPECTS,
    ATTORNEY_PROSPECTS_FAILED_TO_LOAD,
    SET_CREATE_INVITE_TOGGLE,
    UPDATE_ALL_INVITE_LOADED,
    UPDATE_ALL_INVITE_FAILED_TO_LOAD,
    GET_INVITE_DETAILS_LOADE,
    GET_INVITE_DETAILS_FAILED_TO_LOAD,
    FILTER_INVITE_NAME,
    FILTER_INVITE_FIRM_NAME,
    FILTER_INVITE_EMAIL,
    FILTER_INVITE_MOB
} from "../actions/types";

const initialState = {
    loading: true,
    inviteData: null,
    allinvites:[],
    invitedetails:null,
    attorneyprospects:[],
    createInviteToggled:false,
    filter_invite_email:"",
    filter_invite_name:"",
    filter_invite_firm_name:"",
    filter_invite_mob:"",
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case INVITE_DATA_LOADED:
          return{
            ...state,
            loading: false,
            inviteData: payload
          }
        
        case ALL_INVITES_LOADED:
        case UPDATE_ALL_INVITE_LOADED:
          return{
            ...state,
            loading: false,
            allinvites: payload
          }

        case INVITE_DETAILS_LOADED:
        case GET_INVITE_DETAILS_LOADE:
          return{
            ...state,
            loading: false,
            invitedetails: payload
          }
        
        case GET_ATTORNEY_PROSPECTS:
          return{
            ...state,
            loading: false,
            attorneyprospects: payload
          }

        case SET_CREATE_INVITE_TOGGLE:
          return{
            ...state,
            createInviteToggled:payload
          }

          case FILTER_INVITE_NAME:
          return{
            ...state,
            filter_invite_name:payload
          }
          
          case FILTER_INVITE_EMAIL:
          return{
            ...state,
            filter_invite_email:payload
          }

          case FILTER_INVITE_FIRM_NAME:
          return{
            ...state,
            filter_invite_firm_name:payload
          }

          case FILTER_INVITE_MOB:
          return{
            ...state,
            filter_invite_mob:payload
          }

        case ALL_INVITES_FAILED_TO_LOAD:
        case INVITE_DETAILS_FAILED_TO_LOAD:
        case ATTORNEY_PROSPECTS_FAILED_TO_LOAD:
        case UPDATE_ALL_INVITE_FAILED_TO_LOAD:
        case GET_INVITE_DETAILS_FAILED_TO_LOAD:
          return{
            ...state,
          }

          default:
            return state;
        }
      }