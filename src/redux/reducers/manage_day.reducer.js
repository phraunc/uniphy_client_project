const startDayState = { day: false, showPillar: false };

const dayReducer = (state = startDayState, action) => {
  // console.log('inside dayReducer', action)
    switch (action.type) {
      case 'START_DAY':
        return { ...state, day: true, showPillar: true };
      case 'END_DAY':
        return startDayState;
        // return { ...state, day: false, showPillar: false };
      default:
        return state;
    }
  };
  export default dayReducer;