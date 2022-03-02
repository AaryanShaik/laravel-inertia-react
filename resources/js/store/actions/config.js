import {
    SET_CONFIG_USER_TYPE,
    FAILED_TO_SET_CONFIG_USER_TYPE,
    SET_CONFIG_TEST_MODE,
    FAILED_TO_SET_CONFIG_TEST_MODE
} from './types';

// usertype data
export const handlesetUserType = (item) => (dispatch) =>{
 
    try{
    dispatch({
        type: SET_CONFIG_USER_TYPE,
        payload: item,
        });
  }catch(err){
      console.log(err);
      dispatch({
        type: FAILED_TO_SET_CONFIG_USER_TYPE,
        payload: item,
      });
  }
}

// test mode data (bool) :- global in order to fetch data by testmode. the trigger is the switch on nav bar
export const handlesetTestMode = (item) => (dispatch) =>{
 
    try{
    dispatch({
        type: SET_CONFIG_TEST_MODE,
        payload: item,
        });
  }catch(err){
      console.log(err);
      dispatch({
        type: FAILED_TO_SET_CONFIG_TEST_MODE,
        payload: item,
      });
  }
}