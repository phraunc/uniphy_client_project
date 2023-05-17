const balanceScoreReducer = (state = [], action) => {
    console.log('get all balance_score action.payload:', action.payload)
 if (action.type === 'SET_BALANCE_SCORE') {
    return [...action.payload];
 }
 return state;
  };

export default balanceScoreReducer;
