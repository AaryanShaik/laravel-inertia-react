import { TEMP_DATA } from "./types";

// dummy function for testing
export const handleTempData = (affiliates) => async (dispatch) => {
    console.log('affiliates from actions', affiliates);
    try {
  
      dispatch({
        type: TEMP_DATA,
        payload: affiliates,
      });
  
    } catch (err) {
      console.log(err);
    }
  }