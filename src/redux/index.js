import { combineReducers } from 'redux';
import accountReducers from 'redux/account/account.reducer';
import projectReducers from 'redux/project/project.reducer';
const rootReducers = combineReducers({
    accountReducers,
    projectReducers
  });
  
  export default rootReducers;