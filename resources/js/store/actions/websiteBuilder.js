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
} from './types';
import axios from 'axios';

// website builder data
export const handleWebsiteBuilderData = (website) => (dispatch) => {
  console.log('handleWebsiteBuilderData from actions', website);
  try {

    dispatch({
      type: WEBSITE_DATA_LOADED,
      payload: website,
    });

  } catch (err) {
    console.log(err);
  }
}

//this is a function that will be used to get the table data... the axios for this is not written as the php endpoint for this is not created as of yet...
// on the endpoint is created, please pass the data in place of *webtable* var in payload.. i just created that as a placeholder
export const handleallwebsitebuilderstabledata = (testmode) => async (dispatch) => {
  console.log('testmode in handleallwebsitebuilderstabledata', testmode);
  try {
    dispatch({
      type: WEBSITE_DATA_LOADING,
      payload: "",
    });
    const res = await axios.get(`${process.env.NX_HOST}/api/websitebuilder/prospects/getProspects/${testmode}`);
    console.log('all prospects in redux ', res.data.data);

    dispatch({
      type: WEBSITE_TABLE_DATA_LOADED,
      payload: res.data.data,
    });

    dispatch({
      type: WEBSITE_DETAIL_DATA_LOADED,
      payload: res.data.data[0],
    });

  } catch (err) {
    console.log('handleallwebsitebuilderstabledata err ', err);
    dispatch({
      type: WEBSITE_TABLE_DATA_FAILED_TO_LOAD
    });

  }
}

//this is a function that will be used to get the webbuilder details data... the axios for this is not written as the php endpoint for this is not created as of yet...
// on the endpoint is created, please pass the data in place of *webdetailid* var in payload.. i just created that as a placeholder
export const handleallwebsitebuildersdetailsdata = (wbdata) => async (dispatch) => {
  console.log('handleallwebsitebuildersdetailsdata from actions', wbdata);
  try {

    // const res = await axios.get(`${process.env.NX_HOST}/api/websitebuilder/prospects/getProspectDetails/${prospectId}`);
    // console.log(res);

    dispatch({
      type: WEBSITE_DETAIL_DATA_LOADED,
      payload: wbdata,
    });

  } catch (err) {
    console.log('handleallwebsitebuildersdetailsdata err ', err);
    dispatch({
      type: WEBSITE_DETAIL_DATA_FAILED_TO_LOAD
    });

  }
}

// create prospect 
export const createProspect = (data) => async (dispatch) => {
  let { lawfirm_name, email, phone, address, mark_as_test, testmode } = data;
  try {
    dispatch({
      type: WEBSITE_DATA_LOADING,
      payload: "",
    });

    const body = JSON.stringify({
      lawfirm_name,
      email,
      phone,
      address,
      mark_as_test,
      testmode
    })

    const config = {
      headers: {
        "content-type": "application/json"
      }
    }

    const res = await axios.post(`${process.env.NX_HOST}/api/websiteBuilder/prospects/createProspect`, body, config);
    console.log(res)
    // console.log(body);

  } catch (err) {
    console.log(err);
  }
}

export const updateReduxWebsiteData = (data) => async (dispatch) => {
  console.log('data in updateReduxWebsiteData', data);
  try {
    dispatch({
      type: WEBSITE_TABLE_DATA_LOADED,
      payload: data,
    });

    dispatch({
      type: WEBSITE_DETAIL_DATA_LOADED,
      payload: data[0],
    });

  } catch (err) {
    console.log('handleallwebsitebuilderstabledata err ', err);
    dispatch({
      type: WEBSITE_TABLE_DATA_FAILED_TO_LOAD
    });

  }
}

//update firm information
export const updateFirmInformation = (data) => async (dispatch) => {
  let { id, lawfirm_name, email, phone, address, mark_as_test } = data;

  try {
    dispatch({
      type: WEBSITE_DATA_LOADING,
      payload: "",
    });

    const body = JSON.stringify({
      id,
      lawfirm_name,
      email,
      phone,
      address,
      mark_as_test
    })

    const config = {
      headers: {
        "content-type": "application/json"
      }
    }

    const res = await axios.put(`${process.env.NX_HOST}/api/websiteBuilder/prospect/updateFirmInformation`, body, config);
    console.log(res)
    // console.log(body);

  } catch (err) {
    console.log(err);
  }
}

//delete prospect
export const deleteProspect = (id, testmode) => async (dispatch) => {
  try {
    dispatch({
      type: WEBSITE_DATA_LOADING,
      payload: "",
    });
    const res = await axios.delete(`${process.env.NX_HOST}/api/websiteBuilder/prospect/deleteProspect/${id}/${testmode}`)
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

// mark prospect as test
export const updateMarkAsTest = (id, markAction) => async (dispatch) => {
  try {
    dispatch({
      type: WEBSITE_DATA_LOADING,
      payload: "",
    });
    const body = JSON.stringify({
      id,
      markAction
    })

    const config = {
      headers: {
        "content-type": "application/json"
      }
    }

    const res = await axios.put(`${process.env.NX_HOST}/api/websitebuilder/prospect/updateMarkAsTestAction`, body, config);
    console.log(res);
    // console.log(body);
  } catch (err) {
    console.log(err)
  }
}

// update website about
export const updateWebsiteAbout = (prospectId, about) => async (dispatch) => {
  const body = JSON.stringify({
    prospectId,
    about
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/about/updateAbout`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//update contact information
export const udpdateContactInformation = (firmName, firmEmail, firmPhone, firmAddress, prospectId) => async (dispatch) => {
  const body = JSON.stringify({
    firmName,
    firmEmail,
    firmPhone,
    firmAddress,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/contactInformation/updateContactInformation`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//get testimonials
export const getTestimonials = (prospectId) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/testimonial/getTestimonials/${prospectId}`);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//create testimonial
export const createTestimonial = (testimonialName, prospectId) => async (dispatch) => {
  const body = JSON.stringify({
    testimonialName,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/testimonial/createTestimonial`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//update testimonial
export const updateTestimonials = (testimonialId, testimonialName, month, description, prospectId) => async (dispatch) => {
  const body = JSON.stringify({
    testimonialId,
    testimonialName,
    month,
    description,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/testimonial/updateTestimonial`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//show testimonial
export const updateShowTestimonial = (showTestimonial, prospectId) => async (dispatch) => {
  const body = JSON.stringify({
    showTestimonial,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/testimonial/showTestimonial`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//show avatar
export const updateShowAvatar = (showAvatar, prospectId) => async (dispatch) => {
  const body = JSON.stringify({
    showAvatar,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/testimonial/showAvatar`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//delete testimonial
export const deleteTestimonial = (testimonialId, prospectId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/testimonial/deleteTestimonial/${testimonialId}/${prospectId}`);
  } catch (err) {
    console.log(err)
  }
}

//get verdicts
export const getVerdicts = (prospectId) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/verdicts/getVerdicts/${prospectId}`);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//create verdict
export const createVerdict = (verdictName, prospectId) => async (dispatch) => {
  const body = JSON.stringify({
    verdictName,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/verdict/createVerdict`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//update verdict
export const updateVerdict = (verdictName, verdictId, percentage, prospectId) => async (dispatch) => {
  const body = JSON.stringify({
    verdictId,
    verdictName,
    percentage,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/verdict/updateVerdict`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//show verdicts
export const updateShowVerdict = (prospectId, showVerdict) => async (dispatch) => {
  const body = JSON.stringify({
    showVerdict,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/verdict/showVerdict`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//delete verdict
export const deleteVerdict = (verdictId, prospectId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/verdict/deleteVerdict/${verdictId}/${prospectId}`);
  } catch (err) {
    console.log(err)
  }
}

//get settlements
export const getSettlements = (prospectId) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/settlement/getSettlement/${prospectId}`);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//create settlement
export const createSettlement = (settlementName, prospectId) => async (dispatch) => {
  const body = JSON.stringify({
    settlementName,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/settlement/createSettlement`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}


//update settlement
export const updateSettlement = (settlementName, settlementId, amount, prospectId) => async (dispatch) => {
  const body = JSON.stringify({
    settlementId,
    settlementName,
    amount,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/settlement/updateSettlement`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//show settlement
export const updateShowSettlement = (prospectId, showSettlement) => async (dispatch) => {
  const body = JSON.stringify({
    showSettlement,
    prospectId
  });

  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.put(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/settlement/showSettlement`, body, config);
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}

//delete settlement
export const deleteSettlement = (settlementId, prospectId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${process.env.NX_HOST}/api/websiteubilder/websiteInformation/settlement/deleteSettlement/${settlementId}/${prospectId}`);
  } catch (err) {
    console.log(err)
  }
}

// update redux filter
export const updateReduxFilter = (filters) => async (dispatch) => {
  try {
    if (filters.type == "firmname") {
      dispatch({
        type: FILTER_WEB_FIRM_NAME,
        payload: filters.value
      })
    } else if (filters.type == "mob") {
      dispatch({
        type: FILTER_WEB_MOB,
        payload: filters.value
      })
    } else if (filters.type == "email") {
      dispatch({
        type: FILTER_WEB_EMAIL,
        payload: filters.value
      })
    }
  } catch (err) {
    console.log(err)
  }
}