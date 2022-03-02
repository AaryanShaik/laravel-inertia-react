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
    INVITE_FILTER,
    FILTER_INVITE_FIRM_NAME,
    FILTER_INVITE_MOB,
    FILTER_INVITE_EMAIL,
    FILTER_INVITE_NAME
} from './types';
import axios from 'axios';

//the two var to cancel a request if needed
let cancelToken;
let cancelLeadsToken;

// invite data
export const handleCreateInviteData = (invite) => (dispatch) =>{
    console.log('invite from actions', invite);
    try{
  dispatch({
      type: INVITE_DATA_LOADED,
      payload: invite,
    });
  }catch(err){
      console.log(err);
  }
}

//this function gets the invite table data
export const handleallinvitesdata = (testmode) => async (dispatch) =>{
  console.log('handleallinvitesdata from actions');

  if (typeof cancelLeadsToken != typeof undefined) { // if another request is made before this request is completed the the previous request will be cancelled
    cancelLeadsToken.cancel("Operation handleallinvitesdata canceled due to new request.")
  }

  cancelLeadsToken = axios.CancelToken.source()

    try{
          const res = await axios.get(`${process.env.NX_HOST}/api/invites/getinvitestable/getinvitestabledata/${testmode}`,
          { cancelToken: cancelLeadsToken.token });
          // console.log('res ',res)
    
    dispatch({
        type: ALL_INVITES_LOADED,
        payload: res.data,
      });

  }catch(err){
    //if the request failed, then a redux reduer message will pop up in redux dev tool 
      console.log('handleallinvitesdata err ', err);
      dispatch({
        type: ALL_INVITES_FAILED_TO_LOAD,
      });
  }
}

// this function gets the invite details by invite id
export const handlegetinviteDetailbyinviteId = (inviteid) => async (dispatch) =>{
    console.log('handlegetinviteDetailbyinviteId from actions', inviteid);

    if (typeof cancelLeadsToken != typeof undefined) { // cancel operated for the old request is a new request is made before the old request is completed
      cancelLeadsToken.cancel("Operation handlegetinviteDetailbyinviteId canceled due to new request.")
    }
    cancelLeadsToken = axios.CancelToken.source();

    try{

      const res = await axios.get(`${process.env.NX_HOST}/api/invites/getinvites/getinvitesdetails/${inviteid}`,
          { cancelToken: cancelLeadsToken.token });
          console.log('res handlegetinviteDetailbyinviteId ',res)
      dispatch({
          type: INVITE_DETAILS_LOADED,
          payload: res.data,
        });
    }catch(err){
      console.log('handlegetinviteDetailbyinviteId err ', err);
      dispatch({
        type: INVITE_DETAILS_FAILED_TO_LOAD,
      })
    }
}

//this function is used to detch the prospect options based on test mode for the prospect tab in invite details
export const handlegetattorneyprospectsbytestmode = (testmode) => async (dispatch) =>{
  console.log('handlegetattorneyprospectsbytestmode from actions', testmode);

  try{
    
    const res = await axios.get(`${process.env.NX_HOST}/api/invites/getinnvitedetails/attorneyprospects/${testmode}`,
        { cancelToken: cancelLeadsToken.token });
        console.log('res handlegetattorneyprospectsbytestmode ',res)

    dispatch({
        type: GET_ATTORNEY_PROSPECTS,
        payload: res.data,
      });

  }catch(err){
    console.log('handlegetattorneyprospectsbytestmode err ', err);
    dispatch({
      type: ATTORNEY_PROSPECTS_FAILED_TO_LOAD,
    })
  }
}

export const createInviteToggle = (createInviteToggled) => async(dispatch) => {
  try{
    dispatch({
      type:SET_CREATE_INVITE_TOGGLE,
      payload:createInviteToggled
    })
  }catch(err){
    console.log(err)
  }
}

//this function is used to create a new invite
export const createInvite = ( firmName, firmEmail, firmPhone, firmAddress, sal, firstName, lastName, email, phone, timezone, ccEmail, customer, prospect, plan, location) => async (dispatch) => {

  console.log(firmName, firmEmail, firmPhone, firmAddress, sal, firstName, lastName, email, phone, timezone, ccEmail, customer, prospect, plan, location)
  try{

    // the input params are segregated and grouped in the following objects
   let personalInformation = {
      sal,
      firstName,
      lastName,
      email,
      phone,
      timezone
    };

    let firmInformation = {
      firmName,
      firmEmail,
      firmPhone,
      firmAddress
    };
   
    let additionalSettings = {
      ccEmail,
      customer
    }
  

  const body = JSON.stringify({
    personalInformation,
    firmInformation,
    prospect,
    plan,       // the plan object is not created as of yet since we have in input to display in the invite details as a refrence
    location,   // same goes for location, we dont have the location details in the current invite details. so we dont have a refrence for the same
    additionalSettings
  });


  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  // console.log('from create invite actions:',body)

  const res = await axios.post(`${process.env.NX_HOST}/api/invites/invitecreate/createinvite/create`,body,config);
  console.log('create invite',res.data);
  // the response is handled by socket. so the action for this in definded somewhere below.

  }catch(err){
    console.log('create invite err ',err)
  }
}

// this function is used to edit the existing invite details
export const handleEditInvite = ( inviteid ,firmName, firmEmail, firmPhone, firmAddress, sal, firstName, lastName, email, phone, timezone, ccEmail, customer, prospect, plan, location) => async (dispatch) => {

  console.log(inviteid, firmName, firmEmail, firmPhone, firmAddress, sal, firstName, lastName, email, phone, timezone, ccEmail, customer, prospect, plan, location)
  
  try{
      // the input params are segregated and grouped in the following objects
   let personalInformation = {
      sal,
      firstName,
      lastName,
      email,
      phone,
      timezone
    };

    let firmInformation = {
      firmName,
      firmEmail,
      firmPhone,
      firmAddress
    };
   
    let additionalSettings = {
      ccEmail,
      customer
    }
  
    // and also the invite id is passed along
  const body = JSON.stringify({
    inviteid,
    personalInformation,
    firmInformation,
    prospect,
    plan,       // the plan object is not created as of yet since we have in input to display in the invite details as a refrence. currently its just a dumy string
    location,   // same goes for location, we dont have the location details in the current invite details. so we dont have a refrence for the same. curretly, its just a dummy string
    additionalSettings
  });
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  // console.log('from update invite actions:',body)

  const res = await axios.put(`${process.env.NX_HOST}/api/invites/invitedetails/updateinvite/update`,body,config);
  console.log('update invite',res.data);
    // the response is handled by socket. so the action for this in definded somewhere below.

  }catch(err){
    console.log('update invite err ',err)
  }
}


// this function is used to mark the invite as test and vise-versa. it takes in the invite id and the value(bool) and passes it to the backend.
export const handlemarkastestInvitedetails = (inviteid, value) => async (dispatch) => {

  try{
    console.log(inviteid, value);

    const body = JSON.stringify({
      inviteid, value
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

  const res = await axios.put(`${process.env.NX_HOST}/api/invites/invitedetails/markaction/markastest/test`,body,config);
  console.log('update invite',res.data);
    // the response is handled by socket. so the action for this in definded somewhere below.

  }catch(err){
    console.log('handlemarkastestInvitedetails invite err ',err)
  }
}

//this function is used to renew the invite details valid till i guess. 
//it just takes in the invite id and passed it to the backend and the invite is renewed based on the period that was decided.
export const handleRenewInvitedetails = (inviteid) => async (dispatch) => {

  try{
    console.log('inviteid',inviteid);

    const body = JSON.stringify({
      inviteid
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    console.log('here',inviteid);

  const res = await axios.put(`${process.env.NX_HOST}/api/invites/invitedetails/reneweinvite/renew`,body,config);
  console.log('update invite',res);
    // the response is handled by socket. so the action for this in definded somewhere below.

  }catch(err){
    console.log('handleRenewInvitedetails invite err ',err)
  }
}

// this fucntion is used to delete an invite details. it takes in the invite id and passes it to the backend
export const handleDeletetInvitedetails = (inviteid) => async (dispatch) => {

  try{
    console.log('inviteid',inviteid);

    const body = JSON.stringify({
      inviteid
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    console.log('here',inviteid);
  const res = await axios.delete(`${process.env.NX_HOST}/api/invites/invitedetails/deleteinvite/delete/${inviteid}`);
  console.log('update invite',res);
    // the response is handled by socket. so the action for this in definded somewhere below.

  }catch(err){
    console.log('handleDeletetInvitedetails invite err ',err)
  }
}

//update invite table from socket response
export const updateallinvitesfromsockets = (allinvites) => async (dispatch) => {
  try{
    // console.log('res updateallinvitesfromsockets',allinvites)
    dispatch({
      type: UPDATE_ALL_INVITE_LOADED,
      payload: allinvites,
      });
  }catch(err){
    console.log('updateallinvitesfromsockets err ',err);
    dispatch({
      type: UPDATE_ALL_INVITE_FAILED_TO_LOAD,
      });
  }
}

//update invite deails from socket response. this function will only run if it is the invite details id form socket the invite id of our current opened invite details matches
export const updateInviteDetailsFromSockets = (invite) => async (dispatch) =>{
  console.log('res updateInviteDetailsFromSockets',invite)
  try{
    dispatch({
        type: GET_INVITE_DETAILS_LOADE,
        payload: invite[0],
        });
  }catch(err){
    dispatch({
      type: GET_INVITE_DETAILS_FAILED_TO_LOAD,
      });
      console.log('updateInviteDetailsFromSockets err ',err);
  }
}

// update invite filter
export const updateInviteFilter = (filters) => async(dispatch) => {
  try{
    if(filters.type=="firmname"){
      dispatch({
        type:FILTER_INVITE_FIRM_NAME,
        payload:filters.value
      })
    }else if(filters.type=="name"){
      dispatch({
        type:FILTER_INVITE_NAME,
        payload:filters.value
      })
    }else if(filters.type=="mob"){
      dispatch({
        type:FILTER_INVITE_MOB,
        payload:filters.value
      })
    }else if(filters.type=="email"){
      dispatch({
        type:FILTER_INVITE_EMAIL,
        payload:filters.value
      })
    }
    
  }catch(err){
    console.log(err)
  }
}