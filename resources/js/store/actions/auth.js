import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_FAILED
} from './types';

export const handleLogin = (values) => (dispatch) =>{
    try{
        dispatch({
            type: LOGIN_SUCCESS,
          });
        }catch(err){
            console.log(err);
        }
}

export const handleLogout = () => (dispatch) =>{
    console.log('acctions logout')
    try{
        dispatch({
            type: LOGOUT_SUCCESS,
          });
        }catch(err){
            console.log(err);
        }
}