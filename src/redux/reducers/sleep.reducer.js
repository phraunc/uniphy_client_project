import { combineReducers } from 'redux';

const sleepReducer = (state = [], action) => {
    console.log('get all sleep action.payload:', action.payload)
 if (action.type === 'SET_SLEEP') {
    return [...action.payload];
 }
 return state;
  };
  
const sleepReducerSingle = (state = {}, action) => {
   console.log('this is our single Sleep item', action.payload)
   if (action.type === 'SET_SLEEP_ID') {
      return action.payload
   }
   return state;
};


const rootSleepReducer = combineReducers({
   sleepReducer,
   sleepReducerSingle
 });

  export default rootSleepReducer;