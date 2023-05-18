import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects';

function* is_startedNow(action) {
    // console.log('action', action)
    try {
        yield axios.put(`/api/user/toggle`, action.payload);
        yield put({ type: 'FETCH_USER' });
    } catch (err) {
        console.log('inside PUT saga is-started', err)
}
}

function* is_started() {
    yield takeEvery('IS_STARTED', is_startedNow)
}

export default is_started;