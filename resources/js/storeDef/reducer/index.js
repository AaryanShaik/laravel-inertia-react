import { combineReducers } from 'redux';
import auth from './auth';
import affiliates from './affiliates';

export default combineReducers({
    auth,
    affiliates,
});  