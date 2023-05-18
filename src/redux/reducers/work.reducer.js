import { combineReducers } from 'redux';

const workReducer = (state = [], action) => {
    console.log('get all work action.payload:', action.payload)
    if (action.type === 'SET_WORK') {
        return [...action.payload];
    }
    return state;
};

const workReducerSingle = (state = {}, action) => {
    console.log('this is our single work item', action.payload)
    if (action.type === 'SET_WORK_ID') {
        return action.payload
    }
    return state;
};


const rootWorkReducer = combineReducers({
    workReducer,
    workReducerSingle
});

export default rootWorkReducer;
