import { GET_ALL_LEADS_LOADED, GET_ALL_LEADS_FAILED_TO_LOAD, UPDATE_ALL_LEADS_LOADED, UPDATE_ALL_LEADS_FAILED_TO_LOAD, GET_LEAD_DETAILS_LOADE,GET_LEAD_DETAILS_FAILED_TO_LOAD, SET_LEAD_TYPE, SET_FILTER, FAILED_TO_SET_FILTER, GET_ALL_MOBILE_LEADS_FAILED_TO_LOAD, GET_ALL_MOBILE_LEADS_LOADED, 
        ATTORNEYS_LOADED, ELIGIBLE_ATTORNEYS_LOADED, ASSIGNED_ATTORNEYS_LOADED, ALL_ATTORNEYS_LOADED, ALL_ATTORNEYS_FAILED_TO_LOAD, ASSIGN_LEAD_IN_LEAD_DETAILS, FAILED_TO_ASSIGN_LEAD_IN_LEAD_DETAILS,LEAD_ANALYTICS_DATA,USER_SEL_COLS_LEAD,LEADS_LOADING } from './types';
import axios from 'axios';

// lead data

//these var are definded to hold the cancel request data if needed
let cancelToken;
let cancelLeadsToken;


// this fucntion was used to fetch leads table data irrespectfull of their test mode... currently its ***NOT BEING USED****
export const handlegetallleads = () => async (dispatch) =>{
    console.log('res handlegetallleads')
   
   if (typeof cancelLeadsToken != typeof undefined) {
    cancelLeadsToken.cancel("Operation canceled due to new request.")
  }

  cancelLeadsToken = axios.CancelToken.source()

    try{
        const res = await axios.get(`${process.env.NX_HOST}/api/leads/getleads/getallleads`,
        { cancelToken: cancelLeadsToken.token });
        // console.log('res ',res)
    dispatch({
        type: GET_ALL_LEADS_LOADED,
        payload: res.data,
        });
        
  }catch(err){
    dispatch({
        type: GET_ALL_LEADS_FAILED_TO_LOAD,
      });
      console.log('err ',err);
  }
}

//this fuction is used to fetch the leads table data based on test mode and is currently being used.
export const handlegetallleadsbytestmode = (testmode) => async (dispatch) =>{
  console.log('res handlegetallleads')
 
  if (typeof cancelLeadsToken != typeof undefined) {
    cancelLeadsToken.cancel("Operation canceled due to new request.")
  }

  cancelLeadsToken = axios.CancelToken.source() 

  try{
      const res = await axios.get(`${process.env.NX_HOST}/api/leads/getleads/getallleads/${testmode}`, //${process.env.REACT_APP_HOST}
      { cancelToken: cancelLeadsToken.token });
      console.log('res in all leads by testmode',res.data.leads)

      if(res.data != undefined){
  dispatch({
      type: GET_ALL_LEADS_LOADED,
      payload: res.data,
      });
    }
}catch(err){
  // disatch action to indicate the reqeust has failed on the server side.
  dispatch({
      type: GET_ALL_LEADS_FAILED_TO_LOAD,
    });
    
    console.log('err ',err);
}
}

// this fucntion is to fetch invite list for the mobile vew
export const handlegetallmobileleads = (arrayLength, testMode) => async (dispatch) =>{
console.log('get mobile leads', arrayLength);
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  const body = JSON.stringify({
    arrayLength: arrayLength,
  });
 
  try{
      const res = await axios.post(
        `${process.env.NX_HOST}/api/leads/getleads/mobile/getallleads/${testMode}`,
        body,
        config
        );

        console.log('body mobileLeads', body);
        console.log('res mobileLeads:',res);

        dispatch({
            type: GET_ALL_MOBILE_LEADS_LOADED,
            payload: res.data,
            });

    }catch(err){
      console.log(err);
      dispatch({
          type: GET_ALL_MOBILE_LEADS_FAILED_TO_LOAD,
        });
        
  }
}

// this method is used by mode view i guess... *gautam please write ur comment here*
export const handletosetleadtype = (value) => async (dispatch) =>{
  console.log('res handletosetleadtype')
  try{
    dispatch({
        type: SET_LEAD_TYPE,
        payload: value,
        });
  }catch(err){
      console.log('err ',err);
  }
}

//get lead analytics data
export const getLeadAnalyticsData = (id) => async (dispatch) =>{
  console.log('res getLeadAnalyticsData',id)
  try{
    const res = await axios.get(`${process.env.NX_HOST}/api/leads/getanalyticsdetails/${id}`);
    console.log('res in analytics data',res.data.data);
    // console.log('checking if true ',res.data.data.length == 0);
    if(res.data.data.length == 0){
      dispatch({
        type: LEAD_ANALYTICS_DATA,
        payload: "No Analytics Data",
        });
    }else{
      dispatch({
          type: LEAD_ANALYTICS_DATA,
          payload: res.data.data,
          });
    }
  }catch(err){
      console.log('err in getLeadAnalyticsData',err);
  }
}

//this method is used to get the lead details. it takes in the lead id and passes it to the backend
export const handletosetleadDetails = (id) => async (dispatch) =>{
  console.log('res handletosetleadDetails', process.env.NX_HOST)
  
  try{
    
    const res = await axios.get(`${process.env.NX_HOST}/api/leads/getleadbyid/getleadsdetails/${id}`);
    console.log('res in set lead details', res.data)
    dispatch({
        type: GET_LEAD_DETAILS_LOADE,
        payload: res.data[0],
        });
        
  }catch(err){
    dispatch({
      type: GET_LEAD_DETAILS_FAILED_TO_LOAD,
      });
      console.log('err ',err);
  }
}

//this method is used to set the lead filter with the leads redux state var so that we can filter the leads table data.
export const handleleadfilterdata = (channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate) => async (dispatch) =>{
  console.log('res handleleadfilterdata')

  let filter = {channel, Attorney, CaseTypes, LeadName, LeadEmail, LeadContact, LeadLocation, fromdate, todate};
  console.log('handleleadfilterdata filter', filter)
  try{
    dispatch({
        type: SET_FILTER,
        payload: filter,
        });
  }catch(err){
    dispatch({
      type: FAILED_TO_SET_FILTER,
      });
      console.log('err ',err);
  }
}

//this fucntion is used to fetch attorney in mobile view i guess ***gautam please verify this***
export const getAllAttorneys = () => async (dispatch) => {
  try{
    const res = await axios.get(`${process.env.NX_HOST}/api/leads/getAllAttorneys`);
    console.log('action get all attorneys:',res);
    dispatch({
      type: ATTORNEYS_LOADED,
      payload: res.data,
      });
    }catch(err){
    // dispatch({
    //   type: ATTORNEYS_FAILED_TO_LOAD,
    //   });
      console.log('err ',err);
    }
}

//this fucntion is used to display the eligible Attorneys in the leads details based on lead id
export const getEligibleAttorney = (leadid) => async (dispatch) => {
  try{
    const res = await axios.get(`${process.env.NX_HOST}/api/leads/eligibleAttorneys/${leadid}`);
    dispatch({
      type: ELIGIBLE_ATTORNEYS_LOADED,
      payload: res.data,
      });

  }catch(err){
    console.log(err)
  }
}

//this method is used to get the assigned attorney for the lead details
export const getAssignedAttorney = (leadid) => async (dispatch) => {
  try{
    const res = await axios.get(`${process.env.NX_HOST}/api/leads/assignedAttorney/${leadid}`);
    dispatch({
      type: ASSIGNED_ATTORNEYS_LOADED,
      payload: res.data,
      });
  }catch(err){
    console.log(err)
  }
}

//this function is used to get all attorneys and display it in the attorneys filter open in the leads filter section view.
export const getAllAttorneysforfilter = () => async (dispatch) => {
  try{
    const res = await axios.get(`${process.env.NX_HOST}/api/leads/getallleadAttorneys/getAttorneys`);
    dispatch({
      type: ALL_ATTORNEYS_LOADED,
      payload: res.data,
      });
  }catch(err){
    console.log(err)
    dispatch({
      type: ALL_ATTORNEYS_FAILED_TO_LOAD,
      });
  }
}


export const handleAssignLeadToAttorney = (lead_cost, lead_id, admin_id, attorney_id) => async (dispatch) => {
  console.log('redux lead cost',lead_cost);
  console.log('redux lead id',lead_id);
  console.log('redux admin id',admin_id);
  console.log('redux attorney id',attorney_id);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({lead_cost, lead_id, admin_id, attorney_id});

    const res = await axios.post(`${process.env.NX_HOST}/api/leads/getleaddetails/leaddetails/assignleadtoattorney/assignlead`,body,config);

    console.log('handleAssignAttorneyToLeadDeatils ', res.data);
  
}

//update leads redux
export const updateReduxLeads = (m) => async (dispatch) => {
  console.log("updateReduxLeads",m);
  try{
    dispatch({
      type: GET_ALL_LEADS_LOADED,
      payload: m
      });
  }catch(err){
    console.log(err)
  }
}

//this function is used to mark lead details as test
export const handleMarkAsTestLeadDeatils = (value, lead_id) => async (dispatch) => {
  try{

    console.log('handleMarkAsTestLeadDeatils fn');
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({value, lead_id});

    const res = await axios.put(`${process.env.NX_HOST}/api/leads/getleaddetails/leaddetails/markactions/markastest`,body,config);

    console.log('handleMarkAsTestLeadDeatils ', res);
    // the response is handled by socket. so the action for this in definded somewhere below.
   
  }catch(err){
    console.log(err)
   
  }
}

//this function is used to mark lead details as duplicate
export const handleMarkAsDuplicateLeadDeatils = (value, lead_id) => async (dispatch) => {
  try{

    console.log('handleMarkAsDuplicateLeadDeatils fn');
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({value, lead_id});

    const res = await axios.put(`${process.env.NX_HOST}/api/leads/getleaddetails/leaddetails/markactions/markasduplicate`,body,config);

    console.log('handleMarkAsDuplicateLeadDeatils ', res);
    // the response is handled by socket. so the action for this in definded somewhere below.
   
  }catch(err){
    console.log(err)
   
  }
}

//this function is used to mark lead details as starred
export const handleMarkAsStarredLeadDeatils = (value, lead_id) => async (dispatch) => {
  try{

    console.log('handleMarkAsStarredLeadDeatils fn');
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({value, lead_id});

    const res = await axios.put(`${process.env.NX_HOST}/api/leads/getleaddetails/leaddetails/markactions/markasstarred`,body,config);

    console.log('handleMarkAsStarredLeadDeatils ', res);
    // the response is handled by socket. so the action for this in definded somewhere below.
   
  }catch(err){
    console.log(err)
   
  }
}

//this function is used to mark lead details as fake
export const handleMarkAsFakeLeadDeatils = (value, lead_id) => async (dispatch) => {
  try{

    console.log('handleMarkAsFakeLeadDeatils fn');
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({value, lead_id});

    const res = await axios.put(`${process.env.NX_HOST}/api/leads/getleaddetails/leaddetails/markactions/markasfake`,body,config);

    console.log('handleMarkAsFakeLeadDeatils ', res);
    // the response is handled by socket. so the action for this in definded somewhere below.
   
  }catch(err){
    console.log(err)
   
  }
}

//this function is used to mark lead details as low quality
export const handleMarkAsLowQualityLeadDeatils = (value, lead_id) => async (dispatch) => {
  try{

    console.log('handleMarkAsLowQualityLeadDeatils fn');
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({value, lead_id});

    const res = await axios.put(`${process.env.NX_HOST}/api/leads/getleaddetails/leaddetails/markactions/markaslowquality`,body,config);

    console.log('handleMarkAsLowQualityLeadDeatils ', res);
    // the response is handled by socket. so the action for this in definded somewhere below.
   
  }catch(err){
    console.log(err)
   
  }
}

//this function is used to mark lead details as wrong casetype
export const handleMarkAsWrongCaseTypeLeadDeatils = (value, lead_id) => async (dispatch) => {
  try{

    console.log('handleMarkAsWrongCaseTypeLeadDeatils fn');
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({value, lead_id});

    const res = await axios.put(`${process.env.NX_HOST}/api/leads/getleaddetails/leaddetails/markactions/markaswrongcasetype`,body,config);

    console.log('handleMarkAsWrongCaseTypeLeadDeatils ', res);
    // the response is handled by socket. so the action for this in definded somewhere below.
   
  }catch(err){
    console.log(err)
   
  }
}


//this function is used to mark lead details as wrong location
export const handleMarkAsWrongLocationLeadDeatils = (value, lead_id) => async (dispatch) => {
  try{

    console.log('handleMarkAsWrongLocationLeadDeatils fn');
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const body = JSON.stringify({value, lead_id});

    const res = await axios.put(`${process.env.NX_HOST}/api/leads/getleaddetails/leaddetails/markactions/markaswronglocation`,body,config);

    console.log('handleMarkAsWrongLocationLeadDeatils ', res);
    // the response is handled by socket. so the action for this in definded somewhere below.
   
  }catch(err){
    console.log(err)
   
  }
}


//update all leads from socket
export const updateallleadsfromsockets = (allleads) => async (dispatch) => {
  try{
    // console.log('res updateallleadsfromsockets',allleads)
    dispatch({
      type: UPDATE_ALL_LEADS_LOADED,
      payload: allleads,
      });
  }catch(err){
    console.log(err)
    dispatch({
      type: UPDATE_ALL_LEADS_FAILED_TO_LOAD,
      });
  }
}

//update lead deails from socket
export const updateLeadDetailsFromSockets = (leads) => async (dispatch) =>{
  console.log('res updateLeadDetailsFromSockets',leads)
  try{
    dispatch({
        type: GET_LEAD_DETAILS_LOADE,
        payload: leads[0],
        });
  }catch(err){
    dispatch({
      type: GET_LEAD_DETAILS_FAILED_TO_LOAD,
      });
      console.log('err ',err);
  }
}

// update user preferences for table columns
export const updateUserPreference = (cols) => async (dispatch) =>{
  console.log('res updateUserPreference',cols)
  try{
    dispatch({
        type: USER_SEL_COLS_LEAD,
        payload: cols,
        });
  }catch(err){
      console.log('err ',err);
  }
}

export const startLoading = () => async (dispatch) =>{
  try{
    dispatch({
        type: LEADS_LOADING,
        payload: "test",
        });
  }catch(err){
      console.log('err ',err);
  }
}