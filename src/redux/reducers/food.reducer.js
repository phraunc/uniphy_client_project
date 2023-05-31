import { combineReducers } from 'redux';

const foodReducer = (state = [], action) => {
   //  console.log('get all food action.payload:', action.payload)
   //console.log('get all food action.payload:', action.payload)
   if (action.type === 'SET_FOOD') {
      return [...action.payload];
   }
   return state;
};
const foodReducerSingle = (state = {}, action) => {
   // console.log('this is our single food item', action.payload)
   //console.log('this is our single food item', action.payload)
   if (action.type === 'SET_FOOD_ID') {
      return action.payload
   }
   return state;
};

const rootFoodReducer = combineReducers({
   foodReducer,
   foodReducerSingle
});

export default rootFoodReducer;
