import { combineReducers } from 'redux';
import leads from './lead';
import leadfilter from './leadfilter';
import leadDetails from './leadDetails';
import auth from './auth';
import invite from './invite';
import websiteBuilder from './websiteBuilder';
import customer from './customer';
import affiliates from './affiliates';
import config from './config';
import map from './map';

export default combineReducers({
    leads,
    leadfilter,
    auth,
    leadDetails,
    invite,
    websiteBuilder,
    customer,
    config,
    affiliates,
    map
});  