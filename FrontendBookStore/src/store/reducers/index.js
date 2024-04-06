import { combineReducers } from 'redux';

import logIn from './logIn';
import appStatus from './appStatus';
import userInfo from './userInfo';
import cart from './cart';

const reducers = combineReducers({  logIn, appStatus, userInfo, cart });

export default reducers;
