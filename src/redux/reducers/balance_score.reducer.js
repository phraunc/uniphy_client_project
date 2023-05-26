const balanceScoreReducer = (state = {}, action) => {
  // console.log('get all balance_score action.payload:', action.payload);
  if (action.type === 'SET_BALANCE_SCORE') {
    if (Array.isArray(action.payload) && action.payload.length > 0) {
      let DateParts = action.payload[0].date.split('T');
      let Dateyear = DateParts[0];
      let checkDate = `${Dateyear}`;
      // console.log('this is our new date from DB ', checkDate);
      return {...action.payload[0], checkDate};
    }
  }
  return state;
};

export default balanceScoreReducer;
