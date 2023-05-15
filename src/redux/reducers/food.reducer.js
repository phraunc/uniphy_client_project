const foodReducer = (state = [], action) => {
    console.log('action.payload:', action.payload)
 if (action.type === 'SET_FOOD') {
    return [...action.payload];
 }
 return state;
  };
  

  export default foodReducer;
  