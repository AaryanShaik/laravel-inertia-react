import {
  AFFILIATE_DATA_LOADED,
  GET_AFFILIATE_LEAD_DATA,
  FAILED_TO_GET_AFFILIATE_LEAD_DATA,
  TEMP_AFFILIATE_DATA,
  FILTER_AFFILIATE_NAME,
  FILTER_AFFILIATE_LOCATION,
  FILTER_AFFILIATE_CASETYPE,
  FILTER_AFFILIATE_TYPE
} from './types';
import axios from 'axios';
// import { config } from '@ionic/core';

// affiliates data (Dummy function i think)
export const handleAffiliatesData = (affiliates) => async (dispatch) => {
  console.log('affiliates from actions', affiliates);
  try {

    dispatch({
      type: AFFILIATE_DATA_LOADED,
      payload: affiliates,
    });

  } catch (err) {
    console.log(err);
  }
}



//affiliates details get leads:- only the fucntion is created and in the backend mack endpoint. 
//but the php endpoint wasnt complete as per the requirement to it wasnt added to the code
export const handleAffiliatesDetailsGetLeadsbynumber = (attorneyid, testmode, num) => async (dispatch) => {
  console.log('handle Affiliates Details Get Leads by number from actions', num);
  try {

    const body = JSON.stringify({
      attorneyid, testmode, num
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const res = await axios.post(`${process.env.NX_HOST}/api/affiliate/getaffilatedetailleads/getleads/byattorneyid/bynumandtestmode`, body, config);

    dispatch({
      type: GET_AFFILIATE_LEAD_DATA,
      // payload: res.data,
    });
  } catch (err) {
    console.log('handleAffiliatesDetailsGetLeadsbynumber err ', err);

    dispatch({
      type: FAILED_TO_GET_AFFILIATE_LEAD_DATA
    });
  }
}

// to fetch affiliate account information
export const getAccountInformation = (affiliateId) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.NX_HOST}/affiliates/api/account/getAccountInformation/${affiliateId}`);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

// to update affiliates account information
export const updateAccountInformation = (affiliateId, firstName, lastName, email, phone, timezone, ein, reportSheetLive, reportSheetTest, leadProvider) => async (dispatch) => {

  const body = JSON.stringify({
    affiliateId,
    firstName,
    lastName,
    email,
    phone,
    timezone,
    ein,
    reportSheetLive,
    reportSheetTest,
    leadProvider
  })

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/affiliates/api/account/updateAccountInformation`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

// update/change affiliates account password
export const changePassword = (affiliateId, currentPassword, newPassword) => async (dispatch) => {
  const body = JSON.stringify({
    affiliateId,
    currentPassword,
    newPassword
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/affiliates/api/account/changePassword`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

// fetch affiliate account billing information
export const getBillingInformation = (affiliateId) => async (dispatch) => {

  try {
    const res = await axios.get(`${process.env.NX_HOST}/affiliates/api/account/getBillingInformation/${affiliateId}`);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

//update billing information 
export const updateBillingInformation = (name, email, phone, affiliateId) => async (dispatch) => {
  const body = JSON.stringify({
    name,
    email,
    phone,
    affiliateId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/affiliates/api/account/updateBillingInformation`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//create partner
export const addPartner = (firstName, lastName, email, phone, affiliateId) => async (dispatch) => {
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    phone,
    affiliateId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${process.env.NX_HOST}/affiliates/api/account/billingInformation/addPartner`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//update partner 
export const updatePartner = (id, firstName, lastName, email, phone, affiliateId) => async (dispatch) => {
  const body = JSON.stringify({
    id,
    firstName,
    lastName,
    email,
    phone,
    affiliateId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/affiliates/api/account/billingInformation/updatePartner`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//delete partner
export const deletePartner = (partnerId, affiliateId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${process.env.NX_HOST}/affiliates/api/account/billingInformation/deletePartner/${affiliateId}/${partnerId}`);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

// update email notifications to partners
export const updateEmailNotifications = (partnerId, emailNotification, attorneyid) => async (dispatch) => {
  const body = JSON.stringify({
    partnerId,
    emailNotification,
    affiliateId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/affiliates/api/account/notifications/updateEmailNotification`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//API
export const getAPI = (affiliateId) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.NX_HOST}/affiliates/api/account/api/${affiliateId}`);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

// landing page
export const createLandingPage = (affiliateId) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.NX_HOST}/affiliates/api/account/createLandingPage/${affiliateId}`);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

// get automatic emails data
/*
  {
    dealtype:[
      {
        dealId: Id,
        dealName: String,
        attachLeads: Boolean,
        attachDetailsLeads: Boolean
      }
    ]

  }
*/
export const getAutomaticEmailData = (affiliateId) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.NX_HOST}/affiliates/api/automaticEmail/getAutomaticEmailData/${affiliateId}`);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//preview automatic email data
export const previewAutomaticEmail = (dealId, startDate, endDate, affiliateId) => async (dispatch) => {

  const body = JSON.stringify({
    dealId,
    startDate,
    endDate,
    affiliateId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  }

  try {
    const res = await axios.post(`${process.env.NX_HOST}/affilaites/api/automaticEmail/previewAutomaticEmail`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

//update attachments for automatic emails
export const updatedAttachementsForAutomaticEmails = (dealId, attachLeads, attachLeadDetails, affiliateId) => async (dispatch) => {
  const body = JSON.stringify({
    dealId,
    attachLeads,
    attachLeadDetails,
    affiliateId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  }

  try {
    const res = await axios.put(`${process.env.NX_HOST}/affiliates/api/automaticEmail/updateAttachments`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

// actions for the temporary data.
export const handleAffiliatesTempData = (temp_data) => async (dispatch) => {
  try {
    dispatch({
      type: TEMP_AFFILIATE_DATA,
      payload: temp_data,
    });
  } catch (err) {
    console.log('handleAffiliatesDetailsGetLeadsbynumber err ', err);
  }
}

// update affiliates filter
export const updateAffiliatesFilter = (filters) => async (dispatch) => {
  try {
    if (filters.type == "name") {
      dispatch({
        type: FILTER_AFFILIATE_NAME,
        payload: filters.value
      })
    } else if (filters.type == "location") {
      dispatch({
        type: FILTER_AFFILIATE_LOCATION,
        payload: filters.value
      })
    } else if (filters.type == "casetype") {
      dispatch({
        type: FILTER_AFFILIATE_CASETYPE,
        payload: filters.value
      })
    }else if (filters.type == "type") {
      dispatch({
        type: FILTER_AFFILIATE_TYPE,
        payload: filters.value
      })
    }

  } catch (err) {
    console.log(err)
  }
}