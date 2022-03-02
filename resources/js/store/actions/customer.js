import { ConsoleSqlOutlined } from '@ant-design/icons';
import axios from 'axios';
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
    LEAD_LIST_TYPE_LOADED,
    BILLING_CYCLE_LOADED,
    NOTIFICATION_TO_LEADS_LOADED,
    NOTIFICAITON_TO_LAWFIRMS_LOADED,
    PARTNER_LOADED,
    FIRM_INFORMATION_LOADED,
    ACCOUNT_INFORMATION_LOADED,
    ALL_CUSTOMERS_LOADING
} from './types';


// customers data (this function is not used i guess)
export const handleCustomerData = (customer) => (dispatch) =>{
    console.log('customers from actions', customer);
    try{
  dispatch({
      type: CUSTOMER_DATA_LOADED,
      payload: customer,
    });
  }catch(err){
      console.log(err);
  }
}

//this function gets the customer table data based on testmode and saved it in redux reducer
export const handlegetallcustomers= (testmode) => async (dispatch) =>{
  console.log('res handlegetallcustomers')
 
  try{
      const res = await axios.get(`${process.env.NX_HOST}/api/attorneys/getAllcustomers/getcustomer/${testmode}`);
      console.log('testmode in all cust ',testmode)
  dispatch({
      type: ALL_CUSTOMERS_LOADED,
      payload: res.data,
      });
      
}catch(err){
  //if the request fails it just dispatches the type to just indicate in redux devtool that the request has failed... similer approach is takes for most of the action function.
  dispatch({
      type: ALL_CUSTOMERS_FAILED_TO_LOAD,
    });
    console.log('err at handlegetallcustomers ',err, err.response.data);
}
}


// this function fetches the customers list for mobile view... 
export const handlegetallmobilecustomers = (arrayLength, testmode) => async (dispatch) =>{

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
          `${process.env.NX_HOST}/api/attorneys/getAllCustomersMobile/${testmode}`,
          body,
          config
          );
  
    dispatch({
        type: GET_ALL_MOBILE_CUSTOMERS,
        payload: res.data,
        });
  }catch(err){

    console.log(err);
    dispatch({
        type: GET_ALL_MOBILE_CUSTOMERS_FAILED_TO_LOAD,
      });
  }
}

//this function is used to fetch the customers details by the customers id..
export const handleGetCustomersDetailById = (id) => async (dispatch) =>{
  console.log('res handleGetCustomersDetailById')
  try{
    const res = await axios.get(`${process.env.NX_HOST}/api/attorneys/getattorneys/getattorneysdetails/attorneysdetails/${id}`);
    console.log('res customer details', res.data)
    dispatch({
        type: CUSTOMER_DETAILS_LOADED,
        payload: res.data,
        });
  }catch(err){
    dispatch({
      type: ALL_CUSTOMER_DETAILS_FAILED_TO_LOAD,
      });
      console.log('err at handleGetCustomersDetailById ',err); //err.response.data
  }
}

//this  funtion fetches the purchased leads for the selected attorneys in the customers detail and it get the data based on test mode
export const handleGetCustomersDetailPurchasedLeadsById = (id,testmode) => async (dispatch) =>{
  console.log('res handle Get Customers Detail Purchased Leads ById',id,testmode)
  try{
    const res = await axios.get(`${process.env.NX_HOST}/api/attorneys/getattorneysdetails/getpurchasedleadsbyattorneys/${id}/${testmode}`);
    console.log('purchased leads (actions):', res)
    dispatch({
        type: CUSTOMERS_PURCHSED_LEADS_LOADED,
        payload: res.data,
        });
  }catch(err){
    dispatch({
      type: CUSTOMERS_PURCHSED_LEADS_FAILED_TO_LOAD,
      });
      console.log('err at handleGetCustomersDetailPurchasedLeadsById ',err); //, err.response.data
  }
}

//this  funtion fetches the Eligible leads for the selected attorneys in the customers detail and it get the data based on test mode
export const handleGetCustomersDetailEligibleLeadsById = (id,testmode) => async (dispatch) =>{
  console.log('res handle Get Customers Detail Eligible Leads By Id',id,testmode)
  try{
    const res = await axios.get(`${process.env.NX_HOST}/api/attorneys/getattorneysdetails/geteligibleleadsbyattorneys/${id}/${testmode}`);
    console.log('res ', res.data)
    dispatch({
        type: CUSTOMERS_ELIGIBLE_LEADS_LOADED,
        payload: res.data,
        });
  }catch(err){
    dispatch({
      type: CUSTOMERS_ELIGIBLE_LEADS_FAILED_TO_LOAD,
      });
      console.log('err at handle GetCustomersDetailEligibleLeadsById ',err); //err.response.data
  }
}

//this  funtion fetches the Reported leads for the selected attorneys in the customers detail and it get the data based on test mode
export const handleGetCustomersDetailReportedLeadsById = (id,testmode) => async (dispatch) =>{
  console.log('res handle Get Customers Detail Reported Leads By Id',id,testmode)
  try{ 
    const res = await axios.get(`${process.env.NX_HOST}/api/attorneys/getattorneysdetails/getreportedleadsbyattorneys/${id}/${testmode}`);
    console.log('res Reported ', res.data)
    dispatch({
        type: CUSTOMERS_REPORTED_LEADS_LOADED,
        payload: res.data,
        });
  }catch(err){
    dispatch({
      type: CUSTOMERS_REPORTED_LEADS_FAILED_TO_LOAD,
      });
      console.log('err at handleGetCustomersDetailReportedLeadsById ',err,err.response.data); //, err.response.data
  }
}

//this function gets the website About info based on customerid/attorneyid for customer details
export const handleGetCustomerWebsiteAbout = (attorneyId) => async (dispatch) => {
  try{
    console.log('inside try block website about')
    const res = await axios.get(`${process.env.NX_HOST}/api/attorneys/getWebsiteAbout/${attorneyId}`)
    console.log('website About',res.data)
    dispatch({
      type: CUSTOMERS_WEBSITE_ABOUT_LOADED,
      payload: res.data.about[0],
      });
  }catch(err){
    console.log('err at handleGetCustomerWebsiteAbout:',)
  }
}

//this function gets the website Testimonials info based on customerid/attorneyid for customer details
export const handleGetCustomerTestimonials = (attorneyId) => async (dispatch) => {
  try{
    console.log('inside try block website about')
    console.log('attorney id in redux',attorneyId)
    const res = await axios.get(`${process.env.NX_HOST}/api/attorneys/getTestimonials/${attorneyId}`)
    console.log('website Testimonials',res.data)
    dispatch({
      type: CUSTOMERS_TESTIMONIALS_LOADED,
      payload: res.data,
      });
  }catch(err){
    console.log('err at handleGetCustomerTestimonials:',)
  }
}

//this function gets the website Settlements info based on customerid/attorneyid for customer details
export const handleGetCustomerSettlements = (attorneyId) => async (dispatch) => {
  try{
    console.log('inside try block website about')
    const res = await axios.get(`${process.env.NX_HOST}/api/attorneys/getSettlements/${attorneyId}`)
    console.log('website Settlements',res.data)
    dispatch({
      type: CUSTOMERS_SETTLEMENTS_LOADED,
      payload: res.data,
      });
  }catch(err){
    console.log('err at handleGetCustomerSettlements:',)
  }
}

//this function gets the website Specializations info based on customerid/attorneyid for customer details
export const handleGetCustomerSpecializations = (attorneyId) => async (dispatch) => {
  try{
    console.log('inside try block website about')
    const res = await axios.get(`${process.env.NX_HOST}/api/attorneys/getSpecializations/${attorneyId}`)
    console.log('website Specializations',res.data)
    dispatch({
      type: CUSTOMERS_SPECIALIZATIONS_LOADED,
      payload: res.data.specializations
      });
  }catch(err){
    console.log('err at handleGetCustomerSpecializations:',)
  }
}

// update website about
export const updateWebsiteAbout =  ( about, attorneyId)  => async (dispatch) => {
  const body = JSON.stringify({
    about,
    attorneyId
  });

  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `${process.env.NX_HOST}/api/attorneys/website/updateWebsiteAbout`,
  body,
  config
)
console.log('website about update',res);
}catch(err){
  console.log(err);
}
}

// update website personal info
export const updateWebsiteAboutPersonalInformation =  ( pernsonalInformation, attorneyId)  => async (dispatch) => {
  const body = JSON.stringify({
    pernsonalInformation,
    attorneyId
  });

  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `${process.env.NX_HOST}/api/attorneys/website/updateWebsiteAboutPersonalInformation`,
  body,
  config
)
console.log(res);
}catch(err){
  console.log(err);
}
}

// update website lawfirmThankyouPage
export const updateWebsiteAboutLawFirmThankYouPage =  ( lawfirmThankyouPage, attorneyId)  => async (dispatch) => {
  const body = JSON.stringify({
    lawfirmThankyouPage,
    attorneyId
  });

  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `${process.env.NX_HOST}/api/attorneys/website/updateWebsiteAboutLawFirmThankYouPage`,
  body,
  config
)
console.log(res);
}catch(err){
  console.log(err);
}
}

//update website About redux
export const updateReduxWebsiteAbout = (m) => async (dispatch) => {
  console.log("updateReduxWebsiteAbout",m);
  try{
    dispatch({
      type: CUSTOMERS_WEBSITE_ABOUT_LOADED,
      payload: m
      });
  }catch(err){
    console.log(err)
  }
}

// create testimonial
export const createTestimonial =  (attorneyId,testimonialName ) => async(dispatch)=>{

  console.log('att id',attorneyId);
  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      testimonialName,
      attorneyId
    });

    const res = await axios.post(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/createTestimonial/create`,body,
    config);

    console.log(res);

  }catch(err){
    console.log(err)
  }
}

//update testimonial
export const updateTestimonial =  (id, testimonialName, date, description, attorneyId) => async (dispatch)  => {
 
  try{
  
    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      id,
      testimonialName,
      date,
      description,
      attorneyId
    });

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/updateTestimonial/update`, body, config)
    console.log(res);
  }catch(err){
    console.log(err)
  }
}

//update show testimonials
export const updateShowTestimonials =  (showTestimonials, attorneyId) => async (dispatch)  => {
 
  try{
  
    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      showTestimonials,
      attorneyId
    });

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/updateShowTestimonial/update`, body, config)
    console.log(res);
  }catch(err){
    console.log(err)
  }
}

//update show image 
export const updateShowImageTestimonial =  (showImage, attorneyId) => async (dispatch)  => {
 
  try{
  
    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      showImage,
      attorneyId
    });

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/updateShowImage/update`, body, config)
    console.log(res);
  }catch(err){
    console.log(err)
  }
}

//delete testimonial
export const deleteTestimonial = (testimonialId, attorneyId) => async (dispatch) => { 

  try{
  
    const res = await axios.delete(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/deleteTestimonial/delete/${testimonialId}/${attorneyId}`);
console.log(res);
  }catch(err){
    console.log(err)
  }
}

//update redux
export const updateReduxTestimonial = (m) => async (dispatch) => {
  console.log("update redux testimonial",m);
  try{
    dispatch({
      type: CUSTOMERS_TESTIMONIALS_LOADED,
      payload: m
      });
  }catch(err){
    console.log(err);
  }
}

//create settlement
export const createSettlement = (settlementName, attorneyId) => async (dispatch)  => {
  console.log('createSettlement',settlementName, attorneyId)
  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      settlementName,
      attorneyId
    });

    const res = await axios.post(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/createSettlement/create`,body, config);
console.log(res)
  }catch(err){
    console.log(err)
  }
}

//update settlement
export const updateSettlement = (id, settlementName, amount, description, attorneyId) => async (dispatch) => {
 
  try{
  
    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      id,
      name:settlementName,
      amount,
      description,
      attorneyId
    });
    console.log('id in settlement update',id);

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/updateSettlement/update`,body,
    config);

    console.log(res);

  }catch(err){
    console.log(err)
  }
}

//show settlement
export const updateShowSettlement = (showSettlement, attorneyId) => async (dispatch) => {

  try{


    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      showSettlement,
      attorneyId
    });

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/updateShowSettlement/update`,body,
    config);

    console.log(res);

  }catch(err){
    console.log(err);
  }
} 

//delete settlement
export const deleteSettlement = (settlementId,attorneyId) => async (dispatch) => {

  try{
    // const body = JSON.stringify({
    //   settlementId,
    //   attorneyId
    // });
  
    // console.log('body delelte settlement', body)
    // const config = {
    //   headers:{
    //     "content-type":"application/json"
    //   }
    // }
    console.log('settlement id in settelment',settlementId);

    const res = await axios.delete(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/deleteSettlement/delete/${settlementId}/${attorneyId}`);

    console.log(res);
  }catch(err){
    console.log(err)
  }
}

//update redux
export const updateReduxSettlement = (m) => async (dispatch) => {
  console.log("in redux of settlement",m);
  try{
    dispatch({
      type: CUSTOMERS_SETTLEMENTS_LOADED,
      payload: m
      });
  }catch(err){
    console.log(err);
  }
}

//create specialization
export const createSpecialization = (specializationSubHeading, attorneyId) => async (dispatch)  => {

  try{
  
    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      specializationSubHeading,
      attorneyId
    });

    const res = await axios.post(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/createSpecialization/create`,body, config);
console.log(res);
  }catch(err){
    console.log(err)
  }
}

//update specialization
export const updateSpecialization = (id, specializationSubHeading, practiceArea, percentage, attorneyId) => async (dispatch) => {
  const body = JSON.stringify({
    id,
    specializationSubHeading,
    practiceArea,
    percentage,
    attorneyId
  });

  const config = {
    headers:{
      "content-type":"application/json"
    }
  }
  console.log('id in specialization',id);
  try{
    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/updateSpecialization/update`,body, config);
console.log(res);
  }catch(err){
    console.log(err)
  }
}

//update show specialization
export const updateShowSpecialization = (showSpecializations, attorneyId) => async(dispatch) => {
  const body = JSON.stringify({
    showSpecializations,
    attorneyId
  });

  const config = {
    headers:{
      "content-type":"application/json"
    }
  }

  try{
    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/updateShowSpecialization/update`,body, config);
console.log(res);
  }catch(err){
    console.log(err);
  }
}

//delete specialization
export const deleteSpecialization = (specializationId,attorneyId) => async (dispatch)  => {

  try{  
    // const config = {
    //   headers:{
    //     "content-type":"application/json"
    //   }
    // }

    // const body = JSON.stringify({
    //   specializationId,
    //   attorneyId
    // });
    const res = await axios.delete(`${process.env.NX_HOST}/api/attorneys/attorneydetails/website/deleteSpecialization/delete/${specializationId}/${attorneyId}`);
    console.log(res);
  }catch(err){
    console.log(err);
  }
}

//update redux
export const updateReduxSpecialization = (m) => async (dispatch) => {
  console.log("update redux in specialization",m);
  try{
    dispatch({
      type: CUSTOMERS_SPECIALIZATIONS_LOADED,
      payload: m
      });
  }catch(err){
    console.log(err);
  }
}

//update account information
export const updateAccountInformation = (firstName, lastName, mobile, email, timezone, attorneyId,testmode) => async (dispatch)  => {
  console.log('test mode in acc info',testmode);
  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }
    
    const body = JSON.stringify({
      firstName, 
      lastName, 
      mobile, 
      email,
      timezone,
      attorneyId,
      testmode
    });  

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/account/accountinfo/updateAccountInformation/update`,body, config);

  }catch(err){
    console.log(err)
  }
}

//update redux
export const updateReduxAccountInformation = (m) => async (dispatch) => {
  console.log("last redux update",m);
  try{
    dispatch({
      type: ACCOUNT_INFORMATION_LOADED,
      payload: m
      });
  }catch(err){
    console.log(err);
  }
}

// update all customers redux
export const updateReduxAllCustomers = (m) => async (dispatch) => {
  console.log("all customers redux update",m);
  try{
    dispatch({
      type: ALL_CUSTOMERS_LOADED,
      payload: m
      });
  }catch(err){
    console.log(err);
  }
}

//change password
export const changePassword = (currentPassword, newPassword, attorneyId) => async (dispatch)  => {
 
  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      currentPassword, 
      newPassword,
      attorneyId
    });

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/account/accountinfo/changePassword/update`,body, config);

  }catch(err){
    console.log(err)
  }
}

//update firm information
export const updateFirmInformation = (firmName, firmEmail, firmAddress, firmMobile,firmWebsite, attorneyId,lastName) => async (dispatch)  => {

  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }
  
    const body = JSON.stringify({
      firmName, 
      firmEmail, 
      firmAddress, 
      firmMobile,
      firmWebsite,
      attorneyId,
      lastName
    });

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/account/firminfo/updateFirmInformation/update`,body, config);

  }catch(err){
    console.log(err)
  }
}

//update redux
export const updateReduxFirmInformation = (m) => async (dispatch) => {
  console.log("update redux lawfirm information",m);
  try{
    dispatch({
      type: ACCOUNT_INFORMATION_LOADED,
      payload: m,
      });
  }catch(err){
    console.log(err);
  }
}

//add partner
export const addPartner = (name, email, phone, attorneyId) => async (dispatch)  => {

  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }
    
    const body = JSON.stringify({
      name, 
      email, 
      phone,
      attorneyId
    });

    const res = await axios.post(`${process.env.NX_HOST}/api/attorneys/attorneydetails/account/firminfo/addPartner/create`,body, config);

  }catch(err){
    console.log(err)
  }
}

//update redux
export const updateReduxAddPartner = (m) => async (dispatch) => {
  console.log("",m);
  try{
    dispatch({
      type: PARTNER_LOADED,
      // payload: 
      });
  }catch(err){
    console.log(err);
  }
}

//edit partner
export const editPartner = (id, name, email, phone, attorneyId) => async (dispatch)  => {

  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      id,
      name,
      email, 
      phone,
      attorneyId
    });

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/account/firminfo/editPartner/update`,body, config);

  }catch(err){
    console.log(err)
  }
}

//delete partner
export const deletePartner = (partnerId,attorneyId) => async (dispatch)  => {
  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      partnerId,
      attorneyId
    });

    const res = await axios.delete(`${process.env.NX_HOST}/api/attorneys/attorneydetails/account/firminfo/deletePartner/delete`,body, config);

  }catch(err){
    console.log(err);
  }
}

//update redux
export const updateReduxEditPartner = (m) => async (dispatch) => {
  console.log("",m);
  try{
    dispatch({
      type: PARTNER_LOADED,
      // payload: 
      });
  }catch(err){
    console.log(err);
  }
}

//update notification to law firms
export const updateNotificationToLawfirms = (id, emailNotification, smsNotification, attorneyId) => async (dispatch)  => {

  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      id, 
      emailNotification, 
      smsNotification,
      attorneyId
    });

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/account/notification/updateNotificationToLawfirms/update`,body, config);

  }catch(err){
    console.log(err)
  }
}

//update redux
export const udpateReduxNotificaitonToLawFirms = (m) => async (dispatch) => {
  console.log("",m);
  try{
    dispatch({
      type: NOTIFICAITON_TO_LAWFIRMS_LOADED,
      // payload: 
      });
  }catch(err){
    console.log(err);
  }
}

//update notification to leads
export const updateNotificationToLeads = (id, notificationType, includeFirmEmail, includeFirmPhone, attorneyId) => async (dispatch)  => {

  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      id, 
      notificationType, 
      includeFirmEmail, 
      includeFirmPhone,
      attorneyId
    });

    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/attorneydetails/account/notification/updateNotificationToLeads/update`,body, config);

  }catch(err){
    console.log(err)
  }
}

//update redux
export const updateReduxNotificationToLeads = (m) => async (dispatch) => {
  console.log("",m);
  try{
    dispatch({
      type: NOTIFICATION_TO_LEADS_LOADED,
      // payload: 
      });
  }catch(err){
    console.log(err);
  }
}

//update billing cycle and billing date (might require 2 apis) ??????????????????????????????????? incomplete?
export const updateBillingCycle= (attorneyId) => async (dispatch)  => {
  const body = JSON.stringify({ attorneyId });

  const config = {
    headers:{
      "content-type":"application/json"
    }
  }

  try{
    const res = await axios.put(`${process.env.NX_HOST}/api/attorneys/updateBillingCycle/${attorneyId}`,body,
    config)
  }catch(err){
    console.log(err)
  }
}

//update redux
export const updateReduxBillingCycle = (m) => async (dispatch) => {
  console.log("",m);
  try{
    dispatch({
      type: BILLING_CYCLE_LOADED,
      // payload: 
      });
  }catch(err){
    console.log(err);
  }
}

//update lead list type
export const updateLeadListType = (listByDate, attorneyId) => async (dispatch)  => {

  try{

    const config = {
      headers:{
        "content-type":"application/json"
      }
    }

    const body = JSON.stringify({
      listByDate,
      attorneyId
    });

    const res = await axios.post(`${process.env.NX_HOST}/api/attorneys/attorneydetails/account/notification/updateLeadListType/update`,body, config);

  }catch(err){
    console.log(err)
  }
}

//update redux
export const updateReduxLeadListType = (m) => async (dispatch) => {
  console.log("updateReduxLeadListType",m);
  try{
    dispatch({
      type: LEAD_LIST_TYPE_LOADED,
      // payload: 
      });
  }catch(err){
    console.log(err);
  }
}

// start loading
export const startLoading = () => async (dispatch) => {
  try{
    dispatch({
      type: ALL_CUSTOMERS_LOADING,
      payload:"test" 
      });
  }catch(err){
    console.log(err);
  }
}