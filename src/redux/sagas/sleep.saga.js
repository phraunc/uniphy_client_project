import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getSleepId(action) {
  console.log('here is our payload for getsleepID', action.payload)
  try{
    const foodID = yield axios.get(`./api/sleep/details/${action.payload}`);
    yield put({ type: 'SET_SLEEP_ID', payload: foodID.data})
  } catch (err) {
    console.log("error in get sleep id saga.", err)
  }
}

function* getSleep(action) {
  try {
    const foodPillar = yield axios.get("./api/sleep", action.payload);
    yield put({ type: "SET_SLEEP", payload: foodPillar.data });
    console.log('this is our sleep data', foodPillar.data)
  } catch (err) {
    console.log("error in Sleep GET_Saga", err);
  }
}

function* postSleep(action) {
  try {
    yield axios.post("./api/sleep", action.payload);
    yield put({ type: "GET_SLEEP" });
  } catch (err) {
    console.log("error in Sleep POST_Saga", err);
  }
}

function* putSleep(action) {
  console.log('here is our data to update:', action.payload)
  try {
    yield axios.put(`./api/sleep/${action.payload.id}`, action.payload);
    yield put({ type: "GET_SLEEP" });
  } catch (err) {
    console.log("error in Sleep PUT_Saga", err);
  }
}

function* deleteSleep(action) {
  try {
    yield axios.delete(`./api/sleep/${action.payload}`);
    yield put({ type: "GET_SLEEP" });
  } catch (err) {
    console.log("error in sleep delete_Saga", err);
  }
}

function* foodSaga() {
  yield takeEvery("GET_SLEEP", getSleep);
  yield takeEvery("POST_SLEEP", postSleep);
  yield takeEvery("UPDATE_SLEEP", putSleep);
  yield takeEvery("DELETE_SLEEP", deleteSleep);
  yield takeLatest("GET_SLEEP_ID", getSleepId)
}

export default foodSaga;