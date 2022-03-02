import {
    LEAD_DATA_LOADED
} from './types';
import axios from 'axios';

// lead data *gautam please comment on this*
export const handleLeadData =  (lead) => async (dispatch) =>{
    console.log('lead from actions', lead);
    try{

      // const res = await axios.get(`http://localhost:5000/api/leads/getlead/mobile/${lead.lead_id}`);
      // console.lead('res.data ',res.data)
  dispatch({
      type: LEAD_DATA_LOADED,
      payload: lead,
    });
  }catch(err){
      console.log(err);
  }
}