import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getWorkId(action) {
  // console.log('here is our payload for getWorkID', action.payload)
  try {
    const workID = yield axios.get(`./api/work/details/${action.payload}`);
    yield put({ type: 'SET_WORK_ID', payload: workID.data })
  } catch (err) {
    console.log("error in get Work ID saga.", err)
  }
}

function* getWork(action) {
  try {
    const workPillar = yield axios.get("./api/work", action.payload);
    yield put({ type: "SET_WORK", payload: workPillar.data });
    // console.log('this is our work data', workPillar.data)
  } catch (err) {
    console.log("error in Work GET_Saga", err);
  }
}

function* postWork(action) {
  try {
    yield axios.post("./api/work", action.payload);
    yield put({ type: "GET_WORK" });
  } catch (err) {
    console.log("error in Work POST_Saga", err);
  }
}

function* putWork(action) {
  // console.log('here is our Work data to update:', action.payload)
  try {
    yield axios.put(`./api/work/${action.payload.id}`, action.payload);
    yield put({ type: "GET_WORK" });
  } catch (err) {
    console.log("error in Work PUT_Saga", err);
  }
}

function* deleteWork(action) {
  try {
    yield axios.delete(`./api/work/${action.payload}`);
    yield put({ type: "GET_WORK" });
  } catch (err) {
    console.log("error in Work delete_Saga", err);
  }
}

function* WorkSaga() {
  yield takeEvery("GET_WORK", getWork);
  yield takeEvery("POST_WORK", postWork);
  yield takeEvery("UPDATE_WORK", putWork);
  yield takeEvery("DELETE_WORK", deleteWork);
  yield takeLatest("GET_WORK_ID", getWorkId)
}

export default WorkSaga;
