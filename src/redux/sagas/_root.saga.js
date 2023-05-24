import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import foodSaga from './food.saga';
import OccupationSaga from './occupation.saga';
import socialSaga from './social.saga';
import sleepSaga from './sleep.saga';
import MovementSaga from './movement.saga';

import WorkSaga from './work.saga';

import balanceScoreSaga from './balance_score.saga';
import is_started from './is_started.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    foodSaga(),
    OccupationSaga(),
    socialSaga(),
    sleepSaga(),
    MovementSaga(),
    WorkSaga(),
    balanceScoreSaga(),
    is_started(),
  ]);
}
