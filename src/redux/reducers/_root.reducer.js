import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import rootFoodReducer from './food.reducer';
import rootOccupationReducer from './occupation.reducer';
import rootSocialReducer from './social.reducer'
import rootSleepReducer from './sleep.reducer';
import rootMovementReducer from './movement.reducer';

import rootWorkReducer from './work.reducer';

import balanceScoreReducer from './balance_score.reducer';
import dayReducer from './manage_day.reducer';
import averageBalanceScoreReducer from './scoreAverages.reducer';



// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  rootFoodReducer,
  rootOccupationReducer,
  rootSocialReducer,
  rootSleepReducer,
  rootMovementReducer,
  rootWorkReducer,
  balanceScoreReducer,
  dayReducer,
  averageBalanceScoreReducer,
});

export default rootReducer;
