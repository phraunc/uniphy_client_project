import { combineReducers } from 'redux';

const occupationReducer = (state = [], action) => {
    // console.log('get all occupation action.payload:', action.payload)
    if (action.type === 'SET_OCCUPATION') {
        return [...action.payload];
    }
    return state;
};

const occupationReducerSingle = (state = {}, action) => {
    // console.log('this is our single occupation item', action.payload)
    if (action.type === 'SET_OCCUPATION_ID') {
        return action.payload
    }
    return state;
};


const rootOccupationReducer = combineReducers({
    occupationReducer,
    occupationReducerSingle
});

export default rootOccupationReducer;
