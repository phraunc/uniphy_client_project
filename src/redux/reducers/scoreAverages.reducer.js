const averageBalanceScoreReducer = (state = {}, action) => {
    //  console.log('get all balance_score action.payload:', action.payload);
    if (action.type === 'SET_AVERAGE_BALANCE_SCORE') {
        if (Array.isArray(action.payload) && action.payload.length > 0) {
            console.log('our average scores: ', action.payload[0])
            return action.payload[0];
        }
    }
    return state;
};

export default averageBalanceScoreReducer;