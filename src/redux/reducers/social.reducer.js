import { combineReducers } from 'redux';

const socialReducer = (state = [], action) => {
   //  console.log('GET all Social action.payload:', action.payload)
   if (action.type === 'SET_SOCIAL') {
      return [...action.payload];
   }
   return state;
};

const socialReducerSingle = (state = {}, action) => {
   // console.log('this is our single Social item', action.payload)
   if (action.type === 'SET_SOCIAL_ID') {
      return action.payload
   }
   return state;
};

const rootSocialReducer = combineReducers({
   socialReducer,
   socialReducerSingle
});

export default rootSocialReducer;
