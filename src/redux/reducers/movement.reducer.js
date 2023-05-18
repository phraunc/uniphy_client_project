import { combineReducers } from 'redux';

const MovementReducer = (state = [], action) => {
    // console.log('get all movement action.payload:', action.payload)
 if (action.type === 'SET_MOVEMENT') {
    return [...action.payload];
 }
 return state;
  };
  
const MovementReducerSingle = (state = {}, action) => {
//    console.log('Movement item', action.payload)
   if (action.type === 'SET_MOVEMENT_ID') {
      return action.payload
   }
   return state;
};


const rootMovementReducer = combineReducers({
   MovementReducer,
   MovementReducerSingle
 });

  export default rootMovementReducer;