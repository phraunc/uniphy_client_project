import { combineReducers } from 'redux';

const occupationReducer = (state = [], action) => {
    console.log('get all food action.payload:', action.payload)
    if (action.type === 'SET_FOOD') {
        return [...action.payload];
    }
    return state;
};

const occupationReducerSingle = (state = {}, action) => {
    console.log('this is our single food item', action.payload)
    if (action.type === 'SET_FOOD_ID') {
        return action.payload
    }
    return state;
};


const rootOccupationReducer = combineReducers({
    occupationReducer,
    occupationReducerSingle
});

export default rootOccupationReducer;
